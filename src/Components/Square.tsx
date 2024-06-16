import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo } from "react";
import { DoubleSide } from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";

// might use a plane geometry with a shader material instead though

export const Square = () => {
  const {
    paths: [path],
  } = useLoader(SVGLoader, "/square.svg");

  const geometry = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        path.subPaths[0].getPoints(),
        path.userData!.style
      ),
    [path]
  );

  const { scale, x, y, z, rotX, rotY, rotZ } = useControls("Square", {
    scale: { value: 0.01, min: 0, max: 10, step: 0.01 },
    x: { value: 1.38, min: -10, max: 10, step: 0.01 },
    y: { value: 4.05, min: -10, max: 10, step: 0.01 },
    z: { value: -3.15, min: -10, max: 10, step: 0.01 },
    rotX: { value: 0, min: -10, max: 10, step: 0.01 },
    rotY: { value: 0, min: -10, max: 10, step: 0.01 },
    rotZ: { value: 0, min: -10, max: 10, step: 0.01 },
  });

  return (
    <group>
      <mesh
        geometry={geometry}
        position={[x, y, z]}
        rotation={[rotX, rotY, rotZ]}
        scale={scale}
      >
        <meshStandardMaterial
          emissive={"#ffce00"}
          emissiveIntensity={2}
          color="#ffce00"
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
};
