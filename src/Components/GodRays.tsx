import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { ShaderMaterial } from "three";
import { GodRaysShader } from "../Shaders/GodRaysShader";
import { GodRaysShader2 } from "../Shaders/GodRaysShader2";

extend({ GodRaysShader });
extend({ GodRaysShader2 });

export default function GodRaysImpl() {
  const { size } = useThree();

  const mat = useRef<ShaderMaterial>(null);
  const mat2 = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = clock.getElapsedTime() * 1.5;
    }
    if (mat2.current) {
      mat2.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 1]} />
        {/* @ts-expect-error exists */}
        <godRaysShader
          uTime={0}
          uResolution={[size.width, size.height]}
          ref={mat}
          transparent
          depthWrite={false}
          blending={4}
        />
      </mesh>
      {/* <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 1]} />

        <godRaysShader2
          uTime={0}
          uResolution={[size.width, size.height]}
          ref={mat2}
          transparent
          depthWrite={false}
          blending={4}
        />
      </mesh> */}
    </>
  );
}
