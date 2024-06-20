import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { DoubleSide, Euler, Vector3 } from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { editable as e } from "@theatre/r3f";

// might use a plane geometry with a shader material instead though

export type PortalProps = {
  position?: Vector3;
  rotation?: Euler;
};

export const Portal = ({
  position = new Vector3(1.38, 4.05, -3.15),
  rotation = new Euler(0, 0, 0),
}: PortalProps) => {
  const {
    paths: [path],
  } = useLoader(SVGLoader, "/square.svg");

  const geometry = useMemo(
    () =>
      SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), {
        ...path.userData!.style,
        width: 45,
        height: 80,
      }),
    [path]
  );

  // const { scale, x, y, z, rotX, rotY, rotZ } = useControls("Square", {
  //   scale: { value: 0.01, min: 0, max: 10, step: 0.01 },
  //   x: { value: 1.38, min: -10, max: 10, step: 0.01 },
  //   y: { value: 4.05, min: -10, max: 10, step: 0.01 },
  //   z: { value: -3.15, min: -10, max: 10, step: 0.01 },
  //   rotX: { value: 0, min: -10, max: 10, step: 0.01 },
  //   rotY: { value: 0, min: -10, max: 10, step: 0.01 },
  //   rotZ: { value: 0, min: -10, max: 10, step: 0.01 },
  // });

  if (!geometry) return null;

  return (
    <group>
      <e.mesh
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={0.01}
        theatreKey="Portal"
      >
        {/* <planeGeometry args={[width,]}/> */}
        <meshStandardMaterial
          emissive={"#ffce00"}
          emissiveIntensity={2}
          color="#ffce00"
          side={DoubleSide}
        />
      </e.mesh>
    </group>
  );
};
