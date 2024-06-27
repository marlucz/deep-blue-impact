import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import {
  Group,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
} from "three";

export const Reef = () => {
  const ref = useRef<Group>(null);

  const sandTextures = useTexture([
    "/sand_diffuse.jpg",
    "/sand_roughness.jpg",
    "/sand_normal.jpg",
    "/sand_ao.jpg",
  ]);
  const { scene, nodes } = useGLTF("/reef_light.glb");

  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => {
      node.receiveShadow = node.castShadow = true;
    });
    for (const sandTexture of sandTextures) {
      sandTexture.wrapS = sandTexture.wrapT = RepeatWrapping;
      sandTexture.repeat.set(2, 2);
    }
  });

  const [diffuse, roughness, normal, ao] = sandTextures;

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((node) => {
        if (node.name === "Sand_Plane") {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: diffuse,
            roughnessMap: roughness,
            normalMap: normal,
            aoMap: ao,
          });
        } else if (node.name.startsWith("Coral_Wall")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: diffuse,
            roughnessMap: roughness,
            normalMap: normal,
            aoMap: ao,
            color: 0x888888,
            aoMapIntensity: 2,
          });
        } else if (node.name.startsWith("Coral_Tops")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: diffuse,
            roughnessMap: roughness,
            normalMap: normal,
            aoMap: ao,
            color: 0xfff5ce,
            aoMapIntensity: 1.5,
          });
        } else {
          const mesh = node as Mesh;
          const color = 0xffffff * Math.random();

          mesh.material = new MeshStandardMaterial({
            color,
          });
        }
      });
    }
  }, [ref]);

  return (
    <group>
      <primitive object={scene} ref={ref} />;
    </group>
  );
};

useGLTF.preload("/reef_light.glb");
useLoader.preload(TextureLoader, "/sand_diffuse.jpg");
useLoader.preload(TextureLoader, "/sand_roughness.jpg");
useLoader.preload(TextureLoader, "/sand_normal.jpg");
