import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import {
  BrightnessContrast,
  EffectComposer,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export const Settings = () => {
  const { x, y, z, zoom } = useControls("Camera", {
    x: { min: -20, max: 20, value: 1.18, step: 0.01, label: "x" },
    y: { min: -20, max: 20, value: 4.46, step: 0.01, label: "y" },
    z: { min: -20, max: 20, value: -4.55, step: 0.01, label: "z" },
    zoom: { min: 0, max: 5, value: 1, step: 0.01, label: "zoom" },
    fov: { min: 0, max: 180, value: 45, step: 1, label: "fov" },
  });

  const { intensity, angle } = useControls("Lighting", {
    intensity: { min: 0, max: 100, value: 1, step: 0.01, label: "intensity" },
    angle: { min: 0, max: 1, value: 0.1, step: 0.01, label: "angle" },
  });

  return (
    <>
      {/* ENV  */}
      <color attach="background" args={[0x74ccf4]} />
      <Environment files={"./env_map.hdr"}>
        <color attach="background" args={[0x74ccf4]} />
      </Environment>
      <hemisphereLight args={[0x74ccf4, "#c1e2f1", 5]} />;
      <hemisphereLight args={[0x74ccf4, 0, 1]} />;
      <directionalLight position={[5, 1, 0]} />
      <spotLight
        position={[0, 5, 0]}
        intensity={intensity}
        color={0x74ccf4}
        castShadow
        angle={angle}
        penumbra={1}
        decay={0}
      />
      <fog attach="fog" args={["#74ccf4", 5, 12]} />
      {/* CONTROLS */}
      <PerspectiveCamera
        makeDefault
        position={[x, y, z]}
        fov={45}
        zoom={zoom}
        far={20}
      />
      <OrbitControls target={[0.91, 4.5, -2.5]} makeDefault />
      {/* EFFECTS */}
      <Sparkles
        count={100}
        scale={[10, 6, 10]}
        size={6}
        speed={1}
        color={0xffffff}
      />
      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
        <Noise opacity={0.05} />
        <BrightnessContrast brightness={-0.03} contrast={-0.05} />
        <ToneMapping averageLuminance={0.5} middleGrey={3} />
      </EffectComposer>
    </>
  );
};
