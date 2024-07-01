import { Settings } from "./Settings";
import { SeaTurtle } from "../Components/SeaTurtle";
import { Portal } from "../Components/Portal";
import { TransitionNames } from "../App";
import { Fishes } from "../Components/Fishes";
import { ReefHealthy, ReefInstances } from "../Components/Reef/ReefHealthy";
import { Suspense } from "react";

const Scene = ({
  isAnimating,
  currentScreen,
  targetScreen,
  isEffects,
}: {
  isAnimating: boolean;
  currentScreen: TransitionNames;
  targetScreen: TransitionNames;
  isEffects: boolean;
}) => {
  return (
    <>
      <Settings isEffects={isEffects} />
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
        <Fishes range={isEffects ? 200 : 100} />
      </Suspense>
    </>
  );
};

export default Scene;
