import { shaderMaterial } from "@react-three/drei";

export const GodRaysShader = shaderMaterial(
  {
    uTime: 0,
    uResolution: [window.innerWidth, window.innerHeight],
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  /* glsl */ `
  #define TAU 6.28318530718
  #define MAX_ITER 5

  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float causticX(float x, float power, float gtime) {
    float p = mod(x * TAU, TAU) - 250.0;
    float time = gtime * .25 + 23.0; // Slow down the animation

    float i = p;
    float c = 1.0;
    float inten = .005;

    for (int n = 0; n < MAX_ITER / 2; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + cos(t - i) + sin(t + i);
      c += 1.0 / length(p / (sin(i + t) / inten));
    }
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, power);

    return c;
  }

  float GodRays(vec2 uv) {
    vec2 center = vec2(0.5, 1.0); // Top center of the screen
    vec2 pos = uv - center;
    float angle = atan(pos.y, pos.x) + uTime * 0.1;
    float dist = length(pos);

    float light = 0.0;

    light += pow(causticX((uv.x + 0.08 * uv.y) / 1.7 + 0.5, 2.2, uTime * 0.325), 12.0) * 0.05; // Increase power for sharper rays
    light -= pow((1.0 - uv.y) * 0.3, 3.0) * 0.2; // Increase power for sharper cutoff
    light += pow(causticX(sin(uv.x), 0.5, uTime * 0.35), 11.0) * 0.4; // Increase power for sharper rays
    light += pow(causticX(cos(uv.x * 2.3), 0.5, uTime * 0.65), 6.0) * 0.1; // Increase power for sharper rays

    // light -= pow((1.0 - uv.y) * 0.3, 4.0); // Increase power for sharper cutoff
    light = clamp(light, 0.0, 1.0);

    return light;
  }

  void main() {
    vec3 skyColor = vec3(0.3, 1.0, 1.0);
    vec2 p = (-uResolution.xy + 2.0 * gl_FragCoord.xy) / uResolution.y;

    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float light = GodRays(uv);
    vec3 color = light * mix(vec3(0.5, 1.0, 0.8), vec3(0.70, 0.70, 0.95) * 0.95, vUv.y);

    gl_FragColor = vec4(color * 3.0, 1);
  }
  `
);
