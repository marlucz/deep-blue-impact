import { useGLTF } from "@react-three/drei";
import { useLayoutEffect } from "react";

export const Reef = () => {
  const { scene, nodes } = useGLTF("/reef_light.glb");
  useLayoutEffect(() =>
    Object.values(nodes).forEach(
      (node) => (node.receiveShadow = node.castShadow = true)
    )
  );

  return <primitive object={scene} />;
};

useGLTF.preload("/reef_light.glb");