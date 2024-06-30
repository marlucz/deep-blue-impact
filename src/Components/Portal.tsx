import { Color, DoubleSide, Euler, Group, Vector3 } from "three";

import { editable as e } from "@theatre/r3f";
import { TransitionNames } from "../App";
import { Frame } from "./Frame";
import { useRef } from "react";
import { MeshPortalMaterial } from "@react-three/drei";
import { SceneImpacted } from "../Scene/SceneImpacted";

export type PortalProps = {
  currentScreen: TransitionNames;
  targetScreen: TransitionNames;
  position?: Vector3;
  rotation?: Euler;
  isAnimating: boolean;
};

const width = 0.5;
const height = 1;

export const Portal = ({
  position = new Vector3(1.6, 4.5, -3.15),
  rotation = new Euler(0, 0, 0),
  currentScreen,
  targetScreen,
}: PortalProps) => {
  const portalRef = useRef<Group>(null);

  const isShowingImpact =
    ![TransitionNames.Intro, TransitionNames.Home].includes(currentScreen) &&
    targetScreen === currentScreen;

  return (
    <e.group
      theatreKey="Portal"
      position={position}
      rotation={rotation}
      ref={portalRef}
    >
      <Frame color={new Color("#ffce00")} width={width} height={height} />

      <mesh
        scale={0.95}
        renderOrder={10}
        position-z={-0.01}
        visible={isShowingImpact}
      >
        <planeGeometry args={[width, height]} />
        <MeshPortalMaterial worldUnits side={DoubleSide}>
          <SceneImpacted />
        </MeshPortalMaterial>
      </mesh>
    </e.group>
  );
};
