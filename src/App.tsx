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
import { useProgress } from "@react-three/drei";

import SoundIcon from "./assets/sound.svg?react";
import NoSoundIcon from "./assets/no-sound.svg?react";

import projectState from "./assets/theatre-project-state.json";

import { BubbleLoader } from "./Components/BubbleLoader";
import { useSound } from "./useSound";

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

const project = getProject("SaveTheDeep", { state: projectState });
const mainSheet = project.sheet("Main");

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<TransitionNames>(
    TransitionNames.Intro
  );
  const [targetScreen, setTargetScreen] = useState<TransitionNames>(
    TransitionNames.Home
  );
  const { loaded } = useProgress();
  const isSetup = useRef(false);

  useEffect(() => {
    if (loaded) {
      console.log("loaded");
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
  }, [targetScreen, loaded]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isEffects, setIsEffects] = useState(true);
  useSound({ play: isPlaying });

  return (
    <>
      <BubbleLoader />
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
        dpr={[0.5, 1]}
      >
        <SheetProvider sheet={mainSheet}>
          <Scene
            isAnimating={currentScreen !== targetScreen}
            currentScreen={currentScreen}
            targetScreen={targetScreen}
            isEffects={isEffects}
          />
        </SheetProvider>
      </Canvas>
      <div className="absolute bottom-5 right-5 z-50 flex flex-col gap-2 text-xs lg:text-base">
        <div className="flex gap-1 items-center">
          Sound:
          <button
            className="cursor-pointer scale-75 lg:scale-100"
            onClick={() => setIsPlaying((val) => !val)}
          >
            {isPlaying ? <SoundIcon /> : <NoSoundIcon />}
          </button>
        </div>
        <div className="flex gap-1">
          Effects:
          <button onClick={() => setIsEffects((val) => !val)}>
            {isEffects ? "on" : "off"}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
