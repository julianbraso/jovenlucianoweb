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
        #define hue(v) ( .6 + .6 * cos( 2.*PI*(v) + vec3(0,-2.*PI/3.,2.*PI/3.) ) )
        #define PI 3.14159265359

        // Settings
        #define LAYER_COUNT 5.
        #define ABERRATION 0.25
        #define ABERRATION_SIZE 0.3
        #define DOT_SIZE 0.05

        float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        vec3 dotLayer(vec2 uv, vec2 uvNorm, float uvLength, float fade, float layerID) {
          vec2 gv = fract(uv) - 0.5;
          vec2 ID = floor(uv);
          vec3 col = vec3(0);
          for (int x = -1; x <= 1; x++)
            for (int y = -1; y <= 1; y++) {
              vec2 offs = vec2(x, y);
              float rnID = hash12(ID + offs + layerID);
              float variantID = 123.123 * rnID;
              vec2 rndOffs = vec2(sin(variantID), cos(variantID));
              vec2 pos = gv - offs + rndOffs;

              float starScale = 0.5 + (0.5 * rnID);
              float dotScale = DOT_SIZE * starScale * fade;
              float abbrsize = 0.01 + (ABERRATION_SIZE * uvLength) * fade * starScale;
              float p = smoothstep(dotScale, dotScale * .5, length(pos));
              col += p;

              float aberr = ABERRATION * starScale * fade;
              float fC = 0.;
              for (int i = 0; i < 3; i++) {
                fC += 0.33333;
                float cDist = (fC * uvLength * aberr);

                col[i] += pow(smoothstep(abbrsize, 0., length(pos + (uvNorm * cDist))), 2.);
              }
            }
          return col * fade;
        }

        mat2 Rot(float a) {
          float s = sin(a), c = cos(a);
          return mat2(c, -s, s, c);
        }

        uniform float iTime;
        uniform vec2 iResolution;

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 uv = (fragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
          uv.x *= iResolution.x / iResolution.y; // Adjust for aspect ratio
          float uvLength = length(uv);
          uv *= Rot(iTime * 0.1);
          vec2 uvNorm = normalize(uv);

          vec3 col = vec3(0);

          float speed = iTime * 0.2;
          for (float i = 0.; i < 1.; i += 1. / LAYER_COUNT) {
            float depth = fract(speed + i);
            col += dotLayer(uv * (20. - (19. * depth)), uvNorm, uvLength, smoothstep(1., 0.8, depth), i) * depth;
          }

          vec3 bgCol = abs(dot(uvNorm.x * uvLength, uvNorm.y)) * (hue(uvLength + (iTime * 0.2)) * 0.1);
          col += bgCol;

          fragColor = vec4(col, 1.0);
        }

        varying vec2 vUv;
        void main() {
          mainImage(gl_FragColor, vUv * iResolution.xy);
        }
      `,
      uniforms: {
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      },
      transparent: true,
      depthWrite: false,
    });

    const aspectRatio = container.clientWidth / container.clientHeight;
    const geometry = new THREE.PlaneGeometry(2 * aspectRatio, 2); // Adjusted for aspect ratio
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(plane);

    camera.position.z = 1;

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

      const aspectRatio = container.clientWidth / container.clientHeight;
      const geometry = new THREE.PlaneGeometry(2 * aspectRatio, 2); // Adjust plane geometry
      plane.geometry.dispose();
      plane.geometry = geometry;
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
