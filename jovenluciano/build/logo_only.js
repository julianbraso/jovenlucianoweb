// Initialize scene, camera, and renderer
const logo_scene = new THREE.Scene();

const logoContainer = document.getElementById('logoContainer');
const logo_camera = new THREE.PerspectiveCamera(75, logoContainer.clientWidth / logoContainer.clientHeight, 0.1, 1000);
const logo_renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

logo_renderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
logoContainer.appendChild(logo_renderer.domElement);
logo_renderer.setClearColor(0x000000, 0); // Sets the background color to transparent

// Define a clock for the animation
const logo_clock = new THREE.Clock();

// Setup the logo_light
const logo_light = new THREE.PointLight(0xffffff, 1, 100);
logo_light.position.set(0, 1, 2);
logo_scene.add(logo_light);

const inflationMaterial = new THREE.ShaderMaterial({
    vertexShader: `
    uniform float time;
    uniform float minInflation;
    uniform float maxInflation;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vInflation; // Varying to pass to the fragment shader

    void main() {
        vNormal = normalize(normalMatrix * normal);
        vInflation = mix(minInflation, maxInflation, sin(time) * 0.5 + 0.5); // Calculate inflation value
        vec3 inflatedPosition = position + normal * vInflation;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(inflatedPosition, 1.0);
    }
    `,
    fragmentShader: `
    precision mediump float;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 logo_lightPosition;
    uniform float logo_lightIntensity;
    uniform float metalness;
    uniform float roughness;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vInflation; // Received from the vertex shader

    void main() {
        vec3 norm = normalize(vNormal);
        vec3 logo_lightDir = normalize(logo_lightPosition - vPosition);
        vec3 viewDir = normalize(-vPosition);
        vec3 reflectDir = reflect(-logo_lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), (1.0 - roughness) * 32.0);
        vec3 specular = vec3(1.0) * spec * metalness;
        float diff = max(dot(norm, logo_lightDir), 0.0);

        // Amplify the effect of inflation on color transition
        float colorInflationEffect = clamp(vInflation * 8.0, 0.0, 1.0); // Double the effect, clamped between 0 and 1
        vec3 mixedColor = mix(color1, color2, colorInflationEffect); // Use the amplified effect for color mix

        vec3 diffuse = mixedColor * diff;
        vec3 ambient = mixedColor * 0.1;
        gl_FragColor = vec4(diffuse + ambient + specular, 1.0);
    }
    `,
    uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x8400ff) },
        color2: { value: new THREE.Color(0x2AFF00) },  
        logo_lightPosition: { value: logo_light.position },
        logo_lightIntensity: { value: logo_light.intensity },
        minInflation: { value: 0 },
        maxInflation: { value: 0.06 },
        normalMatrix: {
            type: 'mat3',
            value: new THREE.Matrix3()
        }
    }
});

// Load the 3D model
let model;
const loader = new THREE.GLTFLoader();
loader.load('../assets/JOVEN_LUCIANO_Junto2.glb', function(gltf) {
    model = gltf.scene;
    model.scale.set(4, 4, 4); // Fixed scale
    model.traverse(function(child) {
        if (child.isMesh) {
            child.material = inflationMaterial;
        }
    });

    // Center the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center); // Center the model

    // Calculate the model size and adjust the camera position
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = logo_camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    //cameraZ *= 1; // Add some space
    logo_camera.position.set(0, 0, cameraZ);
    logo_camera.near = maxDim / 100;
    logo_camera.far = maxDim * 100;
    logo_camera.updateProjectionMatrix();

    logo_scene.add(model);
}, undefined, function(error) {
    console.error('An error happened:', error);
});

// Adjust renderer size and camera aspect ratio
function resizeRendererToDisplaySize() {
    const width = logoContainer.clientWidth;
    const height = logoContainer.clientHeight;
    const canvas = logo_renderer.domElement;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        logo_renderer.setSize(width, height, false);
        logo_camera.aspect = width / height;
        logo_camera.updateProjectionMatrix();

        // Recalculate cameraZ to fit the model tightly inside the container
        if (model) {
            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = logo_camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5; // Add some space
            logo_camera.position.set(0, 0, cameraZ);
            logo_camera.updateProjectionMatrix();
        }
    }
}

// Animation loop
function animateLogo() {
    requestAnimationFrame(animateLogo);

    resizeRendererToDisplaySize();

    if (model) {
        inflationMaterial.uniforms.time.value = logo_clock.getElapsedTime();
    }

    logo_renderer.render(logo_scene, logo_camera);
}

// Start the animation loop
animateLogo();
