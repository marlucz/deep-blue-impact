import { Environment } from "@react-three/drei";
import {
  ReefImpacted,
  ReefImpactedInstances,
} from "../Components/Reef/ReefImpacted";
import { Trash } from "../Components/Trash";
import { Fishes } from "../Components/Fishes";

export const SceneImpacted = () => {
  return (
    <>
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
      <ReefImpactedInstances>
        <ReefImpacted />
      </ReefImpactedInstances>
      <Trash />
      <Fishes range={30} />
    </>
  );
};
