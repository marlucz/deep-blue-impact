import { Suspense } from "react";

import { Settings } from "./Settings";
import { Reef } from "../Components/Reef";
import { SeaTurtle } from "../Components/SeaTurtle";
import { Portal } from "../Components/Portal";
import { TransitionNames } from "../App";

const Scene = ({
  isAnimating,
  currentScreen,
}: {
  isAnimating: boolean;
  currentScreen: TransitionNames;
}) => {
  return (
    <>
      <Settings />
      <Suspense fallback={null}>
        <Reef />
        <SeaTurtle isAnimating={isAnimating} />
        <Portal currentScreen={currentScreen} />
      </Suspense>
    </>
  );
};

export default Scene;
