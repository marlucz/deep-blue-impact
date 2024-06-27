import { shaderMaterial, useTexture, useVideoTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Define the GodraysMaterial shader
const GodraysMaterial = shaderMaterial(
  {
    u_map: null,
    u_resolution: [0, 0],
    u_time: 0,
  },
  /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.);
  }
`,
  /* glsl */ `
    uniform sampler2D u_map;
    uniform vec2 u_resolution;
    uniform float u_time;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      vec3 col = texture2D(u_map, uv).rgb;

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ GodraysMaterial });

export default function GodraysMaterialImpl() {
  const videoTexture = useVideoTexture("/godrays.mp4");

  const { size } = useThree();

  const mat = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    // Access the video element and set playbackRate
    if (videoTexture?.image) {
      const video = videoTexture.image as HTMLVideoElement;
      video.playbackRate = 0.4;
      video.loop = true;
    }
  }, [videoTexture]);

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    // @ts-expect-error exists
    <godraysMaterial
      ref={mat}
      depthWrite={false}
      transparent
      u_resolution={[size.width, size.height]}
      u_map={videoTexture}
      blending={2}
    />
  );
}
