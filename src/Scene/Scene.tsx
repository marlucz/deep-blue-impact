import { Suspense } from "react";

import { Settings } from "./Settings";
import { Reef } from "../Components/Reef";
import { SeaTurtle } from "../Components/SeaTurtle";
import { Portal } from "../Components/Portal";
import { TransitionNames } from "../App";

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
        <SeaTurtle isAnimating={isAnimating} />
        <Portal
          currentScreen={currentScreen}
          isAnimating={isAnimating}
          targetScreen={targetScreen}
        />
      </Suspense>
    </>
  );
};

export default Scene;
