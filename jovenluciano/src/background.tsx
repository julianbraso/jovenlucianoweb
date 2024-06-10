import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const shaderMaterial = new THREE.ShaderMaterial({
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
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      },
      transparent: true,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(container.clientWidth, container.clientHeight);
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(plane);

    camera.position.z = 5;

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    clockRef.current = clock;
    shaderMaterialRef.current = shaderMaterial;

    animate();

    const resizeHandler = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      const shaderMaterial = shaderMaterialRef.current;

      if(camera) camera.aspect = container.clientWidth / container.clientHeight;
      camera?.updateProjectionMatrix();
      renderer?.setSize(container.clientWidth, container.clientHeight);
      shaderMaterial?.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cleanup();
    };
  }, []);

  const animate = () => {
    requestAnimationFrame(animate);

    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const clock = clockRef.current;
    const shaderMaterial = shaderMaterialRef.current;

    if (renderer && scene && camera && clock && shaderMaterial) {
      const elapsedTime = clock.getElapsedTime();
      shaderMaterial.uniforms.uTime.value = elapsedTime * 0.05;
      renderer.render(scene, camera);
    }
  };

  const cleanup = () => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    if (container && renderer) {
      container.removeChild(renderer.domElement);
    }
  };

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'fixed' }} />;
};

export default Background;
