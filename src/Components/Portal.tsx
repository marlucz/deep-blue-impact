import { Color, DoubleSide, Euler, Group, Vector3 } from "three";

import { editable as e } from "@theatre/r3f";
import { TransitionNames } from "../App";
import { Frame } from "./Frame";
import { useRef } from "react";
import { Environment, MeshPortalMaterial } from "@react-three/drei";
import { ReefImpacted } from "./ReefImpacted";
import { Trash } from "./Trash";
import { Fishes } from "./Fishes";

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
      {isShowingImpact && (
        <mesh scale={0.95} renderOrder={10} position-z={-0.01}>
          <planeGeometry args={[width, height]} />
          <MeshPortalMaterial worldUnits side={DoubleSide}>
            <color attach="background" args={[0x74ccf4]} />
            <Environment files={"./env_map.hdr"}>
              <color attach="background" args={[0x74ccf4]} />
            </Environment>
            <hemisphereLight args={[0x74ccf4, "#c1e2f1", 5]} />;
            <hemisphereLight args={[0x74ccf4, 0, 1]} />;
            <directionalLight position={[5, 1, 0]} />
            <spotLight
              position={[0, 5, 0]}
              intensity={1}
              color={0x74ccf4}
              castShadow
              angle={0.1}
              penumbra={1}
              decay={0}
            />
            <fog attach="fog" args={["#74ccf4", 5, 12]} />
            <ReefImpacted />
            <Trash />
            <Fishes range={30} />
          </MeshPortalMaterial>
        </mesh>
      )}
    </e.group>
  );
};
