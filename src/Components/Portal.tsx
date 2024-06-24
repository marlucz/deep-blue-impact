import { Color, Euler, Vector3 } from "three";

import { editable as e } from "@theatre/r3f";
import { TransitionNames } from "../App";
import { Frame } from "./Frame";
import { useMemo } from "react";

export type PortalProps = {
  position?: Vector3;
  rotation?: Euler;
  currentScreen: TransitionNames;
};

const portalWidthMapping = {
  Intro: 0.6,
  Home: 0.6,
  Bleaching: 0.6,
  Pollution: 0.8,
  Overfishing: 0.6,
  Habitat: 0.6,
  Choice: 1,
};
const portalHeightMapping = {
  Intro: 1,
  Home: 1,
  Bleaching: 1,
  Pollution: 1,
  Overfishing: 1,
  Habitat: 1,
  Choice: 1.6,
};

export const Portal = ({
  position = new Vector3(1.6, 4.5, -3.15),
  rotation = new Euler(0, 0, 0),
  currentScreen,
}: PortalProps) => {
  const height = useMemo(
    () => portalHeightMapping[currentScreen],
    [currentScreen]
  );

  const width = useMemo(
    () => portalWidthMapping[currentScreen],
    [currentScreen]
  );

  return (
    <e.group
      theatreKey="Portal"
      position={position}
      rotation={rotation}
      scale={1}
    >
      <Frame color={new Color("#ffce00")} width={width} height={height} />
    </e.group>
  );
};
