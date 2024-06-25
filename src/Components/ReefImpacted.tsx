import { useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  Group,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader,
} from "three";

const IMPACTED_VISIBLE_STARTS_WITH = [
  "Sand_Plane",
  "Coral_Tops",
  "Coral_Wall",
  "Plastic",
  "Metal",
  "Scene",
  "Glass",
  "Radio",
];

export const ReefImpacted = () => {
  const ref = useRef<Group>(null);

  const sandTextures = useTexture([
    "/sand_diffuse.jpg",
    "/sand_roughness.jpg",
    "/sand_normal.jpg",
    "/sand_ao.jpg",
  ]);

  const { scene, nodes } = useGLTF("/reef_impact.glb");
  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => {
      node.visible =
        IMPACTED_VISIBLE_STARTS_WITH.some((str) => node.name.startsWith(str)) ||
        Math.random() > 0.7;
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
            // make it look like rock
            color: 0xeeeeee,
            aoMapIntensity: 2,
          });
        } else if (node.name.startsWith("Coral_Tops")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: diffuse,
            roughnessMap: roughness,
            normalMap: normal,
            aoMap: ao,
            // pick some sandy rock color
            color: 0xeeeeee,
            aoMapIntensity: 1.5,
          });
        } else if (node.name.startsWith("Plastic")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            roughness: 0.5,
            metalness: 0.5,
            color: 0xffffff * Math.random(),
          });
        } else {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            roughnessMap: roughness,
            normalMap: normal,
            aoMap: ao,
            aoMapIntensity: 1.5,
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

useGLTF.preload("/reef_impact.glb");
useLoader.preload(TextureLoader, "/sand_diffuse.jpg");
useLoader.preload(TextureLoader, "/sand_roughness.jpg");
useLoader.preload(TextureLoader, "/sand_normal.jpg");
