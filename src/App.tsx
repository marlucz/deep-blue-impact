import { SheetProvider } from "@theatre/r3f";
import "./App.css";

import Scene from "./Scene/Scene";
import { getProject, val } from "@theatre/core";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { UI } from "./UI/UI";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { Leva, useControls } from "leva";
import {
  Loader,
  Scroll,
  ScrollControls,
  useProgress,
  useScroll,
} from "@react-three/drei";
import { FrameShader } from "./Shaders/FrameShader";
import projectState from "./assets/theatre-project-state.json";

extend({ FrameShader });

export type Transitions = Record<string, [from: number, to: number]>;
export enum TransitionNames {
  Intro = "Intro",
  Home = "Home",
  Bleaching = "Bleaching",
  Pollution = "Pollution",
  Overfishing = "Overfishing",
  Habitat = "Habitat",
  Choice = "Choice",
}
export const transitions: Transitions = {
  [TransitionNames.Home]: [0, 3],
  [TransitionNames.Bleaching]: [3, 6],
  [TransitionNames.Pollution]: [6, 11],
  [TransitionNames.Overfishing]: [11, 14],
  [TransitionNames.Habitat]: [14, 17],
  [TransitionNames.Choice]: [17, 20],
};

export const isProd = import.meta.env.MODE === "production";

if (!isProd) {
  studio.extend(extension);
  studio.initialize();
}

const project = getProject(
  "SaveTheDeep",
  isProd ? { state: projectState } : undefined
);
const mainSheet = project.sheet("Main");

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<TransitionNames>(
    TransitionNames.Intro
  );
  const [targetScreen, setTargetScreen] = useState<TransitionNames>(
    TransitionNames.Home
  );
  const { progress } = useProgress();
  const isSetup = useRef(false);

  useEffect(() => {
    if (progress === 100) {
      project.ready.then(() => {
        if (currentScreen === targetScreen) {
          return;
        }
        if (isSetup.current && currentScreen === TransitionNames.Intro) {
          // Strict mode in development will trigger the useEffect twice, so we need to check if it's already setup
          return;
        }
        isSetup.current = true;

        const transition = transitions[targetScreen];
        if (!transition) {
          return;
        }

        mainSheet.sequence
          .play({
            range: transition,
            direction: "normal",
            rate: 1,
          })
          .then(() => {
            setCurrentScreen(targetScreen);
          });
      });
    }
  }, [targetScreen, progress]);

  return (
    <>
      <Loader />

      <Leva collapsed />

      <UI
        currentScreen={currentScreen}
        targetScreen={targetScreen}
        onScreenChange={setTargetScreen}
        isAnimating={currentScreen !== targetScreen}
      />
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
          <Scene
            isAnimating={currentScreen !== targetScreen}
            currentScreen={currentScreen}
          />
        </SheetProvider>
      </Canvas>
    </>
  );
};

export default App;
