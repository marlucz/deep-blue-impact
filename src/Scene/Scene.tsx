import { Suspense } from "react";

import { Settings } from "./Settings";
import { Reef } from "../Components/Reef";
import { SeaTurtle } from "../Components/SeaTurtle";
import { Portal } from "../Components/Portal";
import { TransitionNames } from "../App";
import { Fishes } from "../Components/Fishes";

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
        <Reef key={"reef"} />
        {(currentScreen === TransitionNames.Intro ||
          currentScreen === TransitionNames.Home) && (
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
