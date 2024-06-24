import { useEffect, useState } from "react";
import { Color, DoubleSide } from "three";

export type FrameProps = {
  width: number;
  height: number;
  color: Color;
};

export const Frame = ({ width, height, color }: FrameProps) => {
  const [resolution, setResolution] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setResolution([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      {/* @ts-expect-error it's there */}
      <frameShader
        uColor={color}
        resolution={resolution}
        side={DoubleSide}
        transparent
        attach={"material"}
      />
    </mesh>
  );
};
