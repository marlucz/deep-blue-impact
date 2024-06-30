import { Suspense } from "react";

import { Settings } from "./Settings";
import { SeaTurtle } from "../Components/SeaTurtle";
import { Portal } from "../Components/Portal";
import { TransitionNames } from "../App";
import { Fishes } from "../Components/Fishes";
import { ReefHealthy, ReefInstances } from "../Components/Reef/ReefHealthy";

const Scene = ({
  isAnimating,
  currentScreen,
  targetScreen,
}: {
  isAnimating: boolean;
  currentScreen: TransitionNames;
  targetScreen: TransitionNames;
}) => {
  return (
    <>
      <Settings />
      <Suspense fallback={null}>
        <ReefInstances>
          <ReefHealthy />
        </ReefInstances>
        {(currentScreen === TransitionNames.Intro ||
          currentScreen === TransitionNames.Home ||
          targetScreen === TransitionNames.Home) && (
          <SeaTurtle isAnimating={isAnimating} />
        )}
        <Portal
          currentScreen={currentScreen}
          isAnimating={isAnimating}
          targetScreen={targetScreen}
        />
        <Fishes range={200} />
      </Suspense>
    </>
  );
};

export default Scene;
