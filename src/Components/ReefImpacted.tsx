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

  const metalTextures = useTexture(["/rust_diffuse.jpg"]);

  const { scene, nodes } = useGLTF("/reef_impact.glb");
  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => {
      node.visible =
        IMPACTED_VISIBLE_STARTS_WITH.some((str) => node.name.startsWith(str)) ||
        Math.random() > 0.7;
    });

    for (const texture of [...metalTextures, ...sandTextures]) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(2, 2);
    }
  });

  const [sandDiffuse, sandRoughness, sandNormal, sandAo] = sandTextures;
  const [metalDiffuse] = metalTextures;

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((node) => {
        node.receiveShadow = node.castShadow = true;

        if (node.name === "Sand_Plane") {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: sandDiffuse,
            roughnessMap: sandRoughness,
            normalMap: sandNormal,
            aoMap: sandAo,
          });
        } else if (node.name.startsWith("Coral_Wall")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: sandDiffuse,
            roughnessMap: sandRoughness,
            normalMap: sandNormal,
            aoMap: sandAo,
            // make it look like rock
            color: 0xeeeeee,
            aoMapIntensity: 2,
          });
        } else if (node.name.startsWith("Coral_Tops")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: sandDiffuse,
            roughnessMap: sandRoughness,
            normalMap: sandNormal,
            aoMap: sandAo,
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
        } else if (node.name.startsWith("Metal")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            map: metalDiffuse,
            roughness: 0.8,
            metalness: 0.5,
          });
        } else if (node.name.startsWith("Glass")) {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            roughness: 0.2,
            metalness: 0.5,
            color: 0x092e20,
          });
        } else {
          const mesh = node as Mesh;

          mesh.material = new MeshStandardMaterial({
            roughnessMap: sandRoughness,
            normalMap: sandNormal,
            aoMap: sandAo,
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
