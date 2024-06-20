import { SheetProvider } from "@theatre/r3f";
import "./App.css";

import Scene from "./Scene/Scene";
import { getProject } from "@theatre/core";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { UI } from "./UI/UI";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { Leva } from "leva";
// import { Loader } from "@react-three/drei";

studio.initialize();
studio.extend(extension);

const project = getProject("SaveTheDeep");
const mainSheet = project.sheet("Main");

type Transitions = Record<string, [from: number, to: number]>;

const transitions: Transitions = {
  Bleaching: [0, 5],
  Pollution: [6, 12 + 22 / 30],
  Overfishing: [13 + 2 / 30, 17 + 23 / 30],
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("Intro");
  const [targetScreen, setTargetScreen] = useState("Bleaching");
  const isSetup = useRef(false);

  useEffect(() => {
    project.ready.then(() => {
      if (currentScreen === targetScreen) {
        return;
      }
      if (isSetup.current && currentScreen === "Intro") {
        // Strict mode in development will trigger the useEffect twice, so we need to check if it's already setup
        return;
      }
      isSetup.current = true;
      const reverse = targetScreen === "Bleaching" && currentScreen !== "Intro";
      const transition = transitions[reverse ? currentScreen : targetScreen];
      if (!transition) {
        return;
      }

      mainSheet.sequence
        .play({
          range: transition,
          direction: reverse ? "reverse" : "normal",
          rate: reverse ? 2 : 1,
        })
        .then(() => {
          setCurrentScreen(targetScreen);
        });
    });
  }, [targetScreen]);

  return (
    <>
      <UI
        currentScreen={currentScreen}
        onScreenChange={setTargetScreen}
        isAnimating={currentScreen !== targetScreen}
      />
      <Leva collapsed />
      {/* <Loader /> */}

      <Canvas
        gl={{
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 0.5,
          preserveDrawingBuffer: true,
        }}
        shadows
        dpr={[1, 1.5]}
      >
        <SheetProvider sheet={mainSheet}>
          <Scene />
        </SheetProvider>
      </Canvas>
    </>
  );
};

export default App;
