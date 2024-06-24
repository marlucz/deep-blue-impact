import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

export const FrameShader = shaderMaterial(
  {
    uColor: new Color("#ffce00"),
    uResolution: [window.innerWidth, window.innerHeight],
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;
  uniform vec2 uResolution;

  void main() {
    float aspect = uResolution.y / uResolution.x;

    float thickness = 0.04;
    float xThickness = thickness / aspect;
    float yThickness = thickness;

    float edgeX = step(vUv.x, xThickness) + step(1.0 - xThickness, vUv.x);
    float edgeY = step(vUv.y, yThickness) + step(1.0 - yThickness, vUv.y);
    float frame = max(edgeX, edgeY);

    vec3 vibrantColor = uColor * 3.5;

    gl_FragColor = vec4(vibrantColor, frame);
  }
  `
);
