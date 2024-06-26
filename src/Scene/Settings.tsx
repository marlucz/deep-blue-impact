import { Environment } from "@react-three/drei";
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
import { Mesh, Vector3 } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import GodraysMaterialImpl from "../Components/GodRays";
export const Settings = ({ isEffects }: { isEffects: boolean }) => {
  const { x, y, z, zoom } = useControls("Camera", {
    x: { min: -20, max: 20, value: 1.18, step: 0.01, label: "x" },
    y: { min: -20, max: 20, value: 4.46, step: 0.01, label: "y" },
    z: { min: -20, max: 20, value: -4.55, step: 0.01, label: "z" },
    zoom: { min: 0, max: 5, value: 1, step: 0.01, label: "zoom" },
    fov: { min: 0, max: 180, value: 45, step: 1, label: "fov" },
  });

  const { intensity, angle } = useControls("Lighting", {
    intensity: {
      min: 0,
      max: 100,
      value: isEffects ? 30 : 5,
      step: 0.01,
      label: "intensity",
    },
    angle: { min: 0, max: 1, value: 0.6, step: 0.01, label: "angle" },
  });

  const cameraTargetRef = useRef<Mesh>(null);
  const focusTargetVisualizerRef = useRef<Mesh>(null);
  const focusTargetRef = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    if (focusTargetVisualizerRef.current) {
      focusTargetRef.current.copy(focusTargetVisualizerRef.current.position);
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
      <e.spotLight
        position={[0, 10, 0]}
        intensity={intensity}
        color={0x74ccf4}
        castShadow
        angle={angle}
        penumbra={1}
        decay={0}
        theatreKey="Lighting"
      />
      <fog attach="fog" args={["#74ccf4", 5, 10]} />
      <PerspectiveCamera
        makeDefault
        position={[x, y, z]}
        fov={45}
        zoom={zoom}
        far={20}
        theatreKey={"Camera"}
        lookAt={cameraTargetRef}
      >
        {isEffects && <GodraysMaterialImpl />}
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
        {isEffects && (
          <>
            <Vignette eskil={false} offset={0.1} darkness={0.7} />
            <Noise opacity={0.05} />
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
          </>
        )}

        <ToneMapping averageLuminance={0.5} middleGrey={3} />
        <BrightnessContrast brightness={-0.03} contrast={-0.05} />
      </EffectComposer>
    </>
  );
};
