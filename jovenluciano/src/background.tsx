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
        precision highp float;

        uniform float iTime;
        uniform vec2 iResolution;

        #define STARDISTANCE 150.0
        #define STARBRIGHTNESS 0.5
        #define STARDENSITY 0.05

        float hash13(vec3 p3)
        {
            p3 = fract(p3 * vec3(.1031, .11369, .13787));
            p3 += dot(p3, p3.yzx + 19.19);
            return fract((p3.x + p3.y) * p3.z);
        }

        float stars(vec3 ray)
        {
            vec3 p = ray * STARDISTANCE;
            float h = hash13(p);
            float flicker = cos(iTime * 1.0 + hash13(abs(p) * 0.01) * 13.0) * 0.5 + 0.5;
            float brigtness = smoothstep(1.0 - STARDENSITY, 1.0, hash13(floor(p)));
            return smoothstep(STARBRIGHTNESS, 0.0, length(fract(p) - 0.5)) * brigtness * flicker;
        }

        vec3 camera(vec2 fragCoord)
        {
            vec3 ray = normalize(vec3(fragCoord.xy - iResolution.xy * 0.5, iResolution.x));
            vec2 angle = vec2(3.0 + iTime * -0.01, 10.0 + iTime * 0.10);
            vec4 cs = vec4(cos(angle.x), sin(-angle.x), cos(angle.y), sin(angle.y));
            ray.yz *= mat2(cs.xy, -cs.y, cs.x); 
            ray.xz *= mat2(cs.zw, -cs.w, cs.z); 
            return ray;
        }

        void main()
        {
            vec2 fragCoord = gl_FragCoord.xy;
            vec3 ray = camera(fragCoord);
            float s = stars(ray);
            gl_FragColor = vec4(s, s, s, 1.0);
        }
      `,
      uniforms: {
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      },
      transparent: true,
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

      if (camera) camera.aspect = container.clientWidth / container.clientHeight;
      camera?.updateProjectionMatrix();
      renderer?.setSize(container.clientWidth, container.clientHeight);
      shaderMaterial?.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
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
      shaderMaterial.uniforms.iTime.value = elapsedTime;
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
