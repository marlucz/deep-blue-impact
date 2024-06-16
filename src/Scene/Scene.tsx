import { Suspense } from "react";

import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Leva } from "leva";

import { Settings } from "./Settings";
import { Reef } from "../Components/Reef";
import { SeaTurtle } from "../Components/SeaTurtle";
import { Square } from "../Components/Square";
import { ACESFilmicToneMapping } from "three";

const Scene = () => {
  return (
    <>
      <Leva collapsed />
      <Canvas
        gl={{
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 0.5,
          preserveDrawingBuffer: true,
        }}
        shadows
        dpr={[1, 1.5]}
      >
        <Settings />
        <Suspense fallback={null}>
          <Reef />
          <SeaTurtle />
          <Square />
          {/* <Ocean /> */}
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default Scene;
