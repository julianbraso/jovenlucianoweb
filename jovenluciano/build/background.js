// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('logoContainer').appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0); // Sets the background color to transparent

// Initialize scene, camera, and renderer
const bgscene = new THREE.Scene();
const bgcamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const bgrenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
bgrenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('backgroundContainer').appendChild(bgrenderer.domElement);
bgrenderer.setClearColor(0x000000, 0); // Sets the background color to transparent

// Define a clock for the animation
const clock = new THREE.Clock();

// Setup the light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 1, 2);
scene.add(light);

// Starry Shader Material
const starryShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
    precision mediump float;

    uniform float uTime;
    uniform vec2 uResolution;

    void main() {
        vec2 p = (gl_FragCoord.xy / uResolution) - 0.5;
        p.y *= uResolution.y / uResolution.x;

        float angle = atan(p.x, p.y);
        float b = ceil(angle * 600.0);
        float h = cos(b);
        float z = h / dot(p, p);
        float pattern = exp(fract(z + h * b + mod(uTime, 1.0) * 4.0) * -100.0) / z;

        gl_FragColor = vec4(vec3(pattern), 1.0);
    }
    `,
    uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    transparent: true,
    depthWrite: false,
});




// Create and add the spiral plane to the scene
const spiralPlaneGeometry = new THREE.PlaneBufferGeometry(2, 2);
const spiralPlane = new THREE.Mesh(spiralPlaneGeometry, starryShaderMaterial);
spiralPlane.position.z = -500;
bgscene.add(spiralPlane);
spiralPlane.material = starryShaderMaterial;
// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update shader time uniform for the spiral effect
    starryShaderMaterial.uniforms.uTime.value = clock.getElapsedTime() * 0.05;

    // Update the resolution uniform on every frame
    starryShaderMaterial.uniforms.uResolution.value.set(bgrenderer.domElement.width, bgrenderer.domElement.height);

    renderer.render(scene, camera);
    bgrenderer.render(bgscene, bgcamera);
}

// Resize handler to ensure the shader is responsive
function onWindowResize() {
    // Update camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    bgcamera.aspect = window.innerWidth / window.innerHeight;
    bgcamera.updateProjectionMatrix();

    // Set the size of the renderer to fill the window
    renderer.setSize(window.innerWidth, window.innerHeight);

    bgrenderer.setSize(window.innerWidth, window.innerHeight);

    // Ensure full-screen canvas by setting the style width and height
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';

    bgrenderer.domElement.style.width = '100vw';
    bgrenderer.domElement.style.height = '100vh';

    let uniformScale;

if(window.innerWidth < 1000){
     // Calculate the scaling factor based on window width
    const scalingFactor = window.innerWidth / 1000;
    uniformScale = 3 * scalingFactor;
}
else {
    uniformScale = 3 ;
}

    // Update any uniforms related to screen size if necessary
    if (starryShaderMaterial && starryShaderMaterial.uniforms.uResolution) {
        starryShaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }

    // Correct spiralPlane scaling when the window is resized
    spiralPlane.scale.set(window.innerWidth, window.innerHeight, 1);
    console.log('windowsresize');
}

// Listen for resize events from the window
window.addEventListener('resize', onWindowResize, false);

// Set initial size and start the animation loop
onWindowResize();
animate();



