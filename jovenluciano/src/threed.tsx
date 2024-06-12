import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface vector {
  x: number;
  y: number;
  z: number;
}

interface ThreeDModelProps {
  fixed: boolean;
  filePath: string;
  camZ?: number;
  fov?: number;
  lightPos?: THREE.Vector3;
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({ fixed, lightPos = new THREE.Vector3(0, 1, 2), fov = 75, filePath, camZ = 1.5 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const logo_scene = new THREE.Scene();
    const logo_camera = new THREE.PerspectiveCamera(
      fov,
      containerRef.current!.clientWidth / containerRef.current!.clientHeight,
      0.1,
      1000
    );
    const logo_renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    logo_renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
    containerRef.current!.appendChild(logo_renderer.domElement);
    logo_renderer.setClearColor(0x000000, 0); // Sets the background color to transparent

    // Define a clock for the animation
    const logo_clock = new THREE.Clock();

    // Setup the logo_light
    const logo_light = new THREE.PointLight(0xffffff, 1, 100);
    logo_light.position.set(lightPos.x, lightPos.y, lightPos.z);
    logo_scene.add(logo_light);

    const inflationMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float time;
        uniform float minInflation;
        uniform float maxInflation;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vInflation;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vInflation = mix(minInflation, maxInflation, sin(time) * 0.5 + 0.5);
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
        varying float vInflation;

        void main() {
          vec3 norm = normalize(vNormal);
          vec3 logo_lightDir = normalize(logo_lightPosition - vPosition);
          vec3 viewDir = normalize(-vPosition);
          vec3 reflectDir = reflect(-logo_lightDir, norm);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), (1.0 - roughness) * 32.0);
          vec3 specular = vec3(1.0) * spec * metalness;
          float diff = max(dot(norm, logo_lightDir), 0.0);

          float colorInflationEffect = clamp(vInflation * 8.0, 0.0, 1.0);
          vec3 mixedColor = mix(color1, color2, colorInflationEffect);

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
          value: new THREE.Matrix3() as any
        }
      }
    });
    const file = 'assets/JOVEN_LUCIANO_Junto2.glb';
    let path = filePath;
    if (process.env.NODE_ENV == "development") path = "jovenlucianoweb/" + filePath

    // Load the 3D model
    let model: THREE.Group | undefined;
    const loader = new GLTFLoader();
    loader.load(
      path,
      function (gltf) {
        model = gltf.scene;
        model.scale.set(3, 3, 3); // Fixed scale
        model.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = inflationMaterial;
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
        cameraZ *= camZ; // Add some space

        logo_camera.position.set(0, 0, cameraZ);
        logo_camera.near = maxDim / 100;
        logo_camera.far = maxDim * 100;
        logo_camera.updateProjectionMatrix();

        logo_scene.add(model);
      },
      undefined,
      function (error) {
        console.error('An error happened:', error);
      }
    );

    // Resize handler to ensure the shader is responsive
    function onWindowResize() {
      if (fixed) return;
      // Update camera aspect ratio and projection matrix
      logo_camera.aspect = containerRef.current!.clientWidth / containerRef.current!.clientHeight;
      logo_camera.updateProjectionMatrix();

      // Set the size of the renderer to fill the container
      if (!fixed) {
        logo_renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      }

      // Apply scaling if the model is present
      if (model) {
        let uniformScale;

        if (window.innerWidth < 1000) {
          // Calculate the scaling factor based on window width
          const scalingFactor = window.innerWidth / 1000;
          uniformScale = 3 * scalingFactor;
        } else {
          uniformScale = 3;
        }

        model.scale.set(uniformScale, uniformScale, uniformScale);
      }
    }

    // Listen for resize events from the window
    window.addEventListener('resize', onWindowResize, false);

    // Set initial size and start the animation loop
    onWindowResize();

    // Animation loop
    function animateLogo() {
      requestAnimationFrame(animateLogo);

      if (model) {
        inflationMaterial.uniforms.time.value = logo_clock.getElapsedTime();
      }

      logo_renderer.render(logo_scene, logo_camera);
    }

    // Start the animation loop
    animateLogo();

    // Cleanup on component unmount
    return () => {
      while (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, [fixed]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
};

export default ThreeDModel;
