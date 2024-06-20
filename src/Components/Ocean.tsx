import { extend, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { Water } from "three-stdlib";

extend({ Water });

export function Ocean() {
  const ref = useRef<Water>();
  const waterNormals = useLoader(TextureLoader, "/waternormal.png");
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;
  const geom = useMemo(() => new PlaneGeometry(1000, 1000), []);
  const config = useMemo(
    () => ({
      textureWidth: 256,
      textureHeight: 256,
      waterNormals,
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0xc1e2f1,
      distortionScale: 3.7,
      fog: false,
      opacity: 0.5,
    }),
    [waterNormals]
  );
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.material.uniforms.time.value += delta / 5;
  });
  return (
    // @ts-expect-error it's extended so it exists
    <water
      ref={ref}
      args={[geom, config]}
      position-y={6}
      rotation-x={Math.PI / 2}
    />
  );
}
