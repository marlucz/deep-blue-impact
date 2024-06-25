import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Color, DoubleSide } from "three";
import { SVGLoader } from "three/examples/jsm/Addons.js";

export type FrameProps = {
  width: number;
  height: number;
  color: Color;
};

export const Frame = ({ width, height, color }: FrameProps) => {
  const {
    paths: [path],
  } = useLoader(SVGLoader, "/square.svg");

  const geometry = useMemo(() => {
    const points = path.subPaths[0].getPoints();
    const strokeGeometry = SVGLoader.pointsToStroke(points, {
      ...path.userData!.style,
      width,
      height,
      color,
      strokeWidth: 0.05,
    });

    return strokeGeometry;
  }, [path]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={2}
        color={color}
        side={DoubleSide}
      />
    </mesh>
  );
};
