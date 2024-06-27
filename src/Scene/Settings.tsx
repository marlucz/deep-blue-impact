import { Environment, ScreenQuad, useTexture } from "@react-three/drei";
import {
  Autofocus,
  Bloom,
  BrightnessContrast,
  EffectComposer,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { PerspectiveCamera, editable as e } from "@theatre/r3f";
import { Mesh, ShaderMaterial, Vector3 } from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import GodraysMaterialImpl from "../Components/GodRays";

export const Settings = ({ isAnimating }: { isAnimating: boolean }) => {
  const { x, y, z, zoom } = useControls("Camera", {
    x: { min: -20, max: 20, value: 1.18, step: 0.01, label: "x" },
    y: { min: -20, max: 20, value: 4.46, step: 0.01, label: "y" },
    z: { min: -20, max: 20, value: -4.55, step: 0.01, label: "z" },
    zoom: { min: 0, max: 5, value: 1, step: 0.01, label: "zoom" },
    fov: { min: 0, max: 180, value: 45, step: 1, label: "fov" },
  });

  const { intensity, angle } = useControls("Lighting", {
    intensity: { min: 0, max: 100, value: 20, step: 0.01, label: "intensity" },
    angle: { min: 0, max: 1, value: 1, step: 0.01, label: "angle" },
  });

  const size = useThree((state) => state.size);
  const cameraTargetRef = useRef<Mesh>(null);
  const focusTargetVisualizerRef = useRef<Mesh>(null);
  const focusTargetRef = useRef(new Vector3(0, 0, 0));

  const cameraFilterTexture = useTexture("/camerafilter.jpg");
  const godRay1 = useRef<Mesh>(null);
  const godRay2 = useRef<Mesh>(null);
  const godRayShaderRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock, size }) => {
    if (focusTargetVisualizerRef.current) {
      focusTargetRef.current.copy(focusTargetVisualizerRef.current.position);
    }

    if (godRay1.current && godRay2.current) {
      godRay1.current.scale.y += Math.sin(clock.elapsedTime) * 0.0001;
    }

    if (godRayShaderRef.current) {
      godRayShaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
      godRayShaderRef.current.uniforms.uResolution.value = [
        size.width,
        size.height,
      ];
    }
  });

  return (
    <>
      <color attach="background" args={[0x74ccf4]} />
      <Environment files={"./env_map.hdr"}>
        <color attach="background" args={[0x74ccf4]} />
      </Environment>
      <hemisphereLight args={[0x74ccf4, "#c1e2f1", 5]} />;
      <hemisphereLight args={[0x74ccf4, 0, 1]} />;
      <directionalLight position={[5, 1, 0]} castShadow />
      <spotLight
        position={[0, 10, 0]}
        intensity={intensity}
        color={0x74ccf4}
        castShadow
        angle={angle}
        penumbra={1}
        decay={0}
      />
      <fog attach="fog" args={["#74ccf4", 5, 10]} />
      <ScreenQuad>
        <GodraysMaterialImpl />
      </ScreenQuad>
      <PerspectiveCamera
        makeDefault
        position={[x, y, z]}
        fov={45}
        zoom={zoom}
        far={20}
        theatreKey={"Camera"}
        lookAt={cameraTargetRef}
      >
        <mesh position={[0, 0, -0.1]} ref={godRay1}>
          <planeGeometry args={[2, 1]} />
          {/* @ts-expect-error exists */}
          <godRaysShader
            uTime={0}
            uResolution={[size.width, size.height]}
            ref={godRayShaderRef}
            transparent
            opacity={0.5}
            depthWrite={false}
            blending={4}
          />
        </mesh>
        {/* <mesh position={[0, 0.02, -0.1]} ref={godRay2}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial
            color={0xe5faff}
            map={cameraFilterTexture}
            transparent
            opacity={0.1}
          />
        </mesh>
        <mesh position={[0, 0.04, -0.1]} ref={godRay2}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial
            color={0xe5faff}
            map={cameraFilterTexture}
            transparent
            opacity={0.3}
          />
        </mesh> */}
      </PerspectiveCamera>
      <e.mesh
        theatreKey="Camera Target"
        visible="editor"
        ref={cameraTargetRef}
        position={[0.91, 4.5, -2.5]}
      >
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial roughness={1} color="yellow" />
      </e.mesh>
      <e.mesh
        theatreKey="Focus Target"
        visible="editor"
        ref={focusTargetVisualizerRef}
        position={[0.91, 4.5, -2.5]}
      >
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial roughness={1} color="yellow" />
      </e.mesh>
      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
        <Noise opacity={0.05} />
        <BrightnessContrast brightness={-0.03} contrast={-0.05} />
        <ToneMapping averageLuminance={0.5} middleGrey={3} />
        <Bloom
          intensity={2}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.1}
          mipmapBlur
        />

        <Autofocus
          target={focusTargetRef.current}
          smoothTime={0.1}
          focusRange={4}
          bokehScale={10}
        />
      </EffectComposer>
    </>
  );
};
