// @ts-nocheck

import { Merged, useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  Group,
  InstancedMesh,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  RepeatWrapping,
  TextureLoader,
} from "three";

const context = createContext<Record<string, Object3D>>({});
export const ReefImpactedInstances = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { nodes } = useGLTF("/reef_impact.glb");
  const instances: Record<string, Object3D> = useMemo(
    () => ({
      HardCrustations: nodes.Hard_Crustations029,
      HardCrustations2: nodes.Hard_Crustations043,
      HardCrustations3: nodes.Hard_Crustations048,
      HardCrustations5: nodes.Hard_Crustations075,
      HardCrustations6: nodes.Hard_Crustations091,
      HardPlants: nodes.Hard_Plants009,
      HardPlants1: nodes.Hard_Plants022,
      HardPlants3: nodes.Hard_Plants092,
      LargeSidePlants: nodes.Large_Side_Plants022,
      LargeSidePlants1: nodes.Large_Side_Plants035,
      LargeSidePlants2: nodes.Large_Side_Plants046,
      LargeSidePlants3: nodes.Large_Side_Plants050,
      SeaGrass: nodes.Sea_Grass013,
      SeaKelp: nodes.Sea_Kelp006,
      SeaKelp1: nodes.Sea_Kelp012,
      SeaKelp2: nodes.Sea_Kelp129,
      SeaPlants: nodes.Sea_Plants034,
      SeaPlants2: nodes.Sea_Plants068,
      SeaPlants3: nodes.Sea_Plants069,
      SeaPlants4: nodes.Sea_Plants086,
      SeaPlants5: nodes.Sea_Plants092,
      SeaPlants6: nodes.Sea_Plants097,
      SeaPlants7: nodes.Sea_Plants141,
      SeaPlants10: nodes.Sea_Plants163,
      SeaWeed: nodes.Sea_Weed022,
      SoftCrustations: nodes.Soft_Crustations021,
      SoftCrustations1: nodes.Soft_Crustations025,
      SoftCrustations2: nodes.Soft_Crustations062,
      SoftCrustations3: nodes.Soft_Crustations063,
      SoftCrustations4: nodes.Soft_Crustations080,
      SoftCrustations5: nodes.Soft_Crustations083,
      SoftCrustations6: nodes.Soft_Crustations093,
      SoftCrustations7: nodes.Soft_Crustations159,
      SuckerPlants: nodes.Sucker_Plants024,
      SuckerPlants1: nodes.Sucker_Plants051,
      SuckerPlants2: nodes.Sucker_Plants060,
      SuckerPlants3: nodes.Sucker_Plants062,
      SuckerPlants4: nodes.Sucker_Plants084,
      SuckerPlants5: nodes.Sucker_Plants090,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances}>
      {(instances: Record<string, Object3D>) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
};

export const ReefImpacted = () => {
  const ref = useRef<Group>(null);

  const sandTextures = useTexture([
    "/sand_diffuse.jpg",
    "/sand_roughness.jpg",
    "/sand_normal.jpg",
    "/sand_ao.jpg",
  ]);

  const { nodes } = useGLTF("/reef_impact.glb");
  const instances = useContext(context);

  useLayoutEffect(() => {
    for (const texture of [...sandTextures]) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(2, 2);
    }
  });

  const [map, roughnessMap, normalMap, aoMap] = sandTextures;

  const sandMaterial = new MeshStandardMaterial({
    map,
    roughnessMap,
    normalMap,
    aoMap,
  });

  const coralWallMaterial = new MeshStandardMaterial({
    map,
    roughnessMap,
    normalMap,
    aoMap,
    color: 0x888888,
    aoMapIntensity: 2,
  });

  const coralTopMaterial = new MeshStandardMaterial({
    map,
    roughnessMap,
    normalMap,
    aoMap,
    color: 0xfff5ce,
    aoMapIntensity: 1.5,
  });

  const coralReefMaterial = new MeshStandardMaterial();

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((node) => {
        node.receiveShadow = node.castShadow = true;

        if (node.name.includes("Sand")) {
          (node as Mesh).material = sandMaterial;
        } else if (node.name.startsWith("Coral_Wall")) {
          (node as Mesh).material = coralWallMaterial;
        } else if (node.name.startsWith("Coral_Tops")) {
          (node as Mesh).material = coralTopMaterial;
        } else {
          (node as Mesh).material = coralReefMaterial;
        }
      });
    }
  }, [ref]);

  return (
    <group ref={ref} dispose={null}>
      <mesh
        name="Sand_Plane"
        castShadow
        receiveShadow
        geometry={(nodes.Sand_Plane as InstancedMesh).geometry}
        scale={0.323}
      />
      <mesh
        name="Coral_Tops_Big"
        castShadow
        receiveShadow
        geometry={(nodes.Coral_Tops_Big as InstancedMesh).geometry}
        position={[15.561, 0, -1.415]}
      />
      <mesh
        name="Coral_Tops_Small"
        castShadow
        receiveShadow
        geometry={(nodes.Coral_Tops_Small as InstancedMesh).geometry}
        position={[15.561, 0, -1.415]}
      />
      <mesh
        name="Coral_Wall_Big"
        castShadow
        receiveShadow
        geometry={(nodes.Coral_Wall_Big as InstancedMesh).geometry}
        position={[15.561, 0, -1.415]}
      />
      <mesh
        name="Coral_Wall_Small"
        castShadow
        receiveShadow
        geometry={(nodes.Coral_Wall_Small as InstancedMesh).geometry}
        position={[15.561, 0, -1.415]}
      />
      <instances.HardCrustations
        name="Hard_Crustations029"
        position={[-1.729, 0.143, -0.278]}
        rotation={[0.12, -0.01, -0.168]}
        scale={0.32}
      />
      <mesh
        name="Hard_Crustations039"
        castShadow
        receiveShadow
        geometry={(nodes.Hard_Crustations039 as InstancedMesh).geometry}
        position={[-1.451, 0.583, -0.522]}
        rotation={[0.125, 0.003, 0.052]}
        scale={0.957}
      />
      <instances.HardCrustations2
        name="Hard_Crustations043"
        position={[-3.026, 1.1, 3.818]}
        rotation={[-0.001, 0, 0.014]}
        scale={0.7}
      />
      <instances.HardCrustations3
        name="Hard_Crustations048"
        position={[-1.053, 0.222, -0.711]}
        rotation={[-0.001, 0, -0.146]}
        scale={0.567}
      />
      <mesh
        name="Hard_Crustations058"
        castShadow
        receiveShadow
        geometry={(nodes.Hard_Crustations058 as InstancedMesh).geometry}
        position={[-1.423, 0.322, -1.128]}
        rotation={[-0.211, 0.001, -0.009]}
        scale={0.519}
      />
      <instances.HardCrustations5
        name="Hard_Crustations075"
        position={[-1.76, 1.591, -0.804]}
        rotation={[0.085, 0.005, 0.107]}
        scale={1.152}
      />
      <instances.HardCrustations
        name="Hard_Crustations083"
        position={[-1.179, 1.555, -1.428]}
        rotation={[0.162, 0.02, 0.244]}
        scale={0.313}
      />
      <instances.HardCrustations6
        name="Hard_Crustations091"
        position={[-1.624, 0.913, 4.444]}
        rotation={[-0.01, 0.001, -0.125]}
        scale={0.442}
      />
      <instances.HardCrustations5
        name="Hard_Crustations135"
        position={[-2.645, 1.134, 3.773]}
        rotation={[-0.006, 0, -0.002]}
        scale={0.596}
      />
      <mesh
        name="Hard_Crustations140"
        castShadow
        receiveShadow
        geometry={(nodes.Hard_Crustations140 as InstancedMesh).geometry}
        position={[1.478, 0.051, -0.526]}
        rotation={[-0.052, -0.006, 0.057]}
        scale={1.274}
      />
      <instances.HardCrustations2
        name="Hard_Crustations144"
        position={[3.326, 0.346, -1.723]}
        rotation={[0.076, -0.001, -0.037]}
        scale={0.476}
      />
      <instances.HardCrustations5
        name="Hard_Crustations148"
        position={[0.592, 1.274, 3.385]}
        rotation={[0.207, 0.034, 0.326]}
        scale={1.149}
      />
      <instances.HardCrustations3
        name="Hard_Crustations149"
        position={[0.877, 1.154, -0.467]}
        rotation={[-0.263, -0.029, 0.215]}
        scale={0.877}
      />
      <instances.HardCrustations6
        name="Hard_Crustations152"
        position={[3.669, 0.348, -1.347]}
        rotation={[0.029, 0, 0.013]}
        scale={1.015}
      />
      <instances.HardPlants
        name="Hard_Plants009"
        position={[-1.802, 0.406, -0.437]}
        rotation={[0.098, -0.003, -0.064]}
        scale={1.074}
      />
      <instances.HardPlants
        name="Hard_Plants012"
        position={[-2.585, 1.167, 4.177]}
        rotation={[0, 0, -0.005]}
        scale={0.409}
      />
      <instances.HardPlants1
        name="Hard_Plants022"
        position={[-1.401, 1.029, 2.793]}
        rotation={[0.048, -0.002, -0.086]}
        scale={1.252}
      />
      <mesh
        name="Hard_Plants025"
        castShadow
        receiveShadow
        geometry={(nodes.Hard_Plants025 as InstancedMesh).geometry}
        position={[-1.312, 1.532, -1.15]}
        rotation={[0.007, -0.001, -0.165]}
        scale={0.328}
      />
      <instances.HardPlants1
        name="Hard_Plants067"
        position={[-2.114, 0.93, 4.688]}
        rotation={[0.174, 0.004, 0.045]}
        scale={0.399}
      />
      <instances.HardPlants3
        name="Hard_Plants092"
        position={[1.396, 1.009, 0.501]}
        rotation={[0.094, -0.009, -0.197]}
        scale={0.772}
      />
      <mesh
        name="Hard_Plants094"
        castShadow
        receiveShadow
        geometry={(nodes.Hard_Plants094 as InstancedMesh).geometry}
        position={[1.754, 0.212, -0.804]}
        rotation={[0.133, 0.049, -0.015]}
        scale={0.409}
      />
      <mesh
        name="Hard_Plants095"
        castShadow
        receiveShadow
        geometry={(nodes.Hard_Plants095 as InstancedMesh).geometry}
        position={[0.925, 1.149, -0.296]}
        rotation={[-0.143, -0.004, 0.056]}
        scale={0.381}
      />
      <instances.HardPlants3
        name="Hard_Plants097"
        position={[1.132, 1.468, 2.545]}
        rotation={[-0.374, -0.043, 0.226]}
        scale={0.361}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants022"
        position={[-1.908, 0.918, 3.696]}
        rotation={[0.011, 0, -0.006]}
        scale={0.95}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants035"
        position={[-1.304, 1.54, -1.602]}
        rotation={[0.024, 0.001, 0.123]}
        scale={0.474}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants046"
        position={[-1.555, 1.248, 3.57]}
        rotation={[0.073, -0.003, -0.08]}
        scale={1.082}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants050"
        position={[-1.38, 0.812, -1.092]}
        rotation={[0.064, -0.006, -0.18]}
        scale={1.16}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants053"
        position={[-1.085, 0.939, 3.361]}
        rotation={[-0.012, 0.002, -0.313]}
        scale={0.763}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants054"
        position={[-2.396, 0.903, 4.747]}
        rotation={[0.116, -0.003, -0.046]}
        scale={0.82}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants061"
        position={[-2.34, 0.925, 4.226]}
        rotation={[-0.022, 0, 0.006]}
        scale={0.89}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants064"
        position={[-2.185, 1.225, -0.359]}
        rotation={[-0.063, 0.006, -0.198]}
        scale={0.584}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants087"
        position={[2.61, 0.401, -1.12]}
        rotation={[0.052, 0.004, 0.165]}
        scale={0.689}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants088"
        position={[1.336, 1.06, 1.58]}
        rotation={[-0.016, 0, 0.046]}
        scale={1.291}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants090"
        position={[1.809, 0.433, -0.505]}
        rotation={[0.03, 0.005, 0.295]}
        scale={0.97}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants091"
        position={[1.312, 0.713, 4.069]}
        rotation={[-0.005, 0, -0.026]}
        scale={0.422}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants093"
        position={[1.227, 1.143, 0.045]}
        rotation={[-0.002, 0, 0.002]}
        scale={1.053}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants096"
        position={[3.509, 1.15, -1.217]}
        rotation={[0.284, -0.016, -0.113]}
        scale={0.868}
      />
      <instances.SeaGrass
        name="Sea_Grass013"
        position={[-1.217, 1.551, 3.075]}
        rotation={[-0.143, 0, -0.007]}
        scale={3.441}
      />
      <instances.SeaGrass
        name="Sea_Grass014"
        position={[-3.036, 1.477, 4.349]}
        rotation={[0.009, 0, 0.007]}
        scale={3.537}
      />
      <mesh
        name="Sea_Grass019"
        castShadow
        receiveShadow
        geometry={(nodes.Sea_Grass019 as InstancedMesh).geometry}
        position={[1.134, 0.715, 2.162]}
        rotation={[0.015, 0, 0.014]}
        scale={2.429}
      />
      <mesh
        name="Sea_Grass001"
        castShadow
        receiveShadow
        geometry={(nodes.Sea_Grass001 as InstancedMesh).geometry}
        position={[-1.996, 0.252, 4.134]}
        rotation={[0.024, 0.002, -0.04]}
        scale={2.429}
      />
      <instances.SeaKelp
        name="Sea_Kelp006"
        position={[-0.582, 0.634, -1.256]}
        rotation={[0.099, 0, 0.008]}
        scale={0.709}
      />
      <instances.SeaKelp1
        name="Sea_Kelp012"
        position={[-3.051, 1.762, 4.715]}
        rotation={[0.089, 0.001, 0.021]}
        scale={1.093}
      />
      <instances.SeaKelp
        name="Sea_Kelp032"
        position={[-3.498, 2.042, 3.577]}
        rotation={[0.005, 0, 0.016]}
        scale={1.851}
      />
      <instances.SeaKelp1
        name="Sea_Kelp046"
        position={[-2.39, 1.48, 5.032]}
        rotation={[0.25, -0.009, -0.074]}
        scale={0.793}
      />
      <instances.SeaKelp1
        name="Sea_Kelp052"
        position={[-2.14, 1.839, 4.496]}
        rotation={[0.027, 0, 0.032]}
        scale={1.169}
      />
      <instances.SeaKelp
        name="Sea_Kelp075"
        position={[-1.485, 1.783, 4.515]}
        rotation={[0.177, 0, 0.005]}
        scale={1.432}
      />
      <instances.SeaKelp1
        name="Sea_Kelp097"
        position={[-1.712, 0.745, -0.062]}
        rotation={[0.188, -0.019, -0.198]}
        scale={0.777}
      />
      <instances.SeaKelp2
        name="Sea_Kelp129"
        position={[2.141, 1.079, 0.483]}
        rotation={[0.277, 0.019, 0.135]}
        scale={0.948}
      />
      <instances.SeaKelp
        name="Sea_Kelp130"
        position={[1.206, 1.033, 2.298]}
        rotation={[-0.12, -0.003, 0.048]}
        scale={1.156}
      />
      <instances.SeaKelp
        name="Sea_Kelp131"
        position={[1.896, 0.745, 0.016]}
        rotation={[0.078, 0.008, 0.21]}
        scale={-0.291}
      />
      <instances.SeaKelp1
        name="Sea_Kelp132"
        position={[2.214, 0.988, -0.062]}
        rotation={[0.022, 0, 0.01]}
        scale={0.76}
      />
      <mesh
        name="Sea_Kelp133"
        castShadow
        receiveShadow
        geometry={(nodes.Sea_Kelp133 as InstancedMesh).geometry}
        position={[3.002, 1.753, -0.796]}
        rotation={[0.032, 0.001, 0.046]}
        scale={0.878}
      />
      <instances.SeaKelp
        name="Sea_Kelp134"
        position={[1.533, 1.458, -0.123]}
        rotation={[-0.116, -0.006, 0.095]}
        scale={0.656}
      />
      <instances.SeaKelp2
        name="Sea_Kelp136"
        position={[1.068, 1.11, 0.793]}
        rotation={[0.155, 0.014, 0.191]}
        scale={1.007}
      />
      <instances.SeaKelp2
        name="Sea_Kelp137"
        position={[3.16, 0.395, -0.398]}
        rotation={[-0.035, -0.001, 0.043]}
        scale={0.093}
      />
      <instances.SeaKelp2
        name="Sea_Kelp138"
        position={[3.169, 0.526, -0.691]}
        rotation={[-0.001, 0, 0.014]}
        scale={0.259}
      />
      <instances.SeaKelp2
        name="Sea_Kelp144"
        position={[1.065, 1.595, 0.83]}
        rotation={[0.275, -0.002, -0.016]}
        scale={0.58}
      />
      <instances.SeaKelp
        name="Sea_Kelp145"
        position={[2.402, 0.399, -0.267]}
        rotation={[-0.436, 0.081, -0.361]}
        scale={-0.053}
      />
      <instances.SeaKelp2
        name="Sea_Kelp150"
        position={[1.249, 0.623, 1.743]}
        rotation={[0.102, -0.004, -0.083]}
        scale={0.023}
      />
      <instances.SeaKelp2
        name="Sea_Kelp154"
        position={[3.39, 0.766, -0.958]}
        rotation={[-0.034, 0.001, -0.03]}
        scale={0.622}
      />
      <instances.SeaKelp
        name="Sea_Kelp155"
        position={[1.577, 1.71, -0.436]}
        rotation={[-0.095, 0.003, -0.062]}
        scale={0.986}
      />
      <instances.SeaKelp1
        name="Sea_Kelp157"
        position={[3.01, 0.878, -0.855]}
        rotation={[0.394, 0.047, 0.234]}
        scale={0.851}
      />
      <instances.SeaKelp1
        name="Sea_Kelp158"
        position={[0.78, 1.43, 2.623]}
        rotation={[0.002, 0, 0.263]}
        scale={1.297}
      />
      <instances.SeaPlants
        name="Sea_Plants034"
        position={[-1.716, 1.002, 4.238]}
        rotation={[-0.069, 0.002, -0.053]}
        scale={0.901}
      />
      <mesh
        name="Sea_Plants035"
        castShadow
        receiveShadow
        geometry={(nodes.Sea_Plants035 as InstancedMesh).geometry}
        position={[-1.209, 1.024, 3.457]}
        rotation={[0.027, -0.001, -0.054]}
        scale={0.622}
      />
      <instances.SeaPlants2
        name="Sea_Plants068"
        position={[-1.348, 0.984, 2.759]}
        rotation={[0.044, -0.003, -0.119]}
        scale={0.821}
      />
      <instances.SeaPlants3
        name="Sea_Plants069"
        position={[-1.999, 0.508, -0.339]}
        rotation={[-0.127, 0.008, -0.118]}
        scale={1.195}
      />
      <instances.SeaPlants4
        name="Sea_Plants086"
        position={[-3.004, 0.927, 4.842]}
        rotation={[0.212, 0.003, 0.03]}
        scale={0.475}
      />
      <instances.SeaPlants5
        name="Sea_Plants092"
        position={[-2.568, 1.191, 3.483]}
        rotation={[0, 0, -0.001]}
        scale={0.822}
      />
      <instances.SeaPlants6
        name="Sea_Plants097"
        position={[-2.814, 1.192, 3.839]}
        rotation={[-0.009, 0, 0.01]}
        scale={0.698}
      />
      <instances.SeaPlants6
        name="Sea_Plants123"
        position={[-3.497, 1.009, 3.356]}
        rotation={[0.007, 0, 0.007]}
        scale={0.757}
      />
      <instances.SeaPlants
        name="Sea_Plants140"
        position={[-0.998, 0.291, -1.212]}
        rotation={[0.013, 0, 0.001]}
        scale={1.142}
      />
      <instances.SeaPlants7
        name="Sea_Plants141"
        position={[-1.564, 1.858, -0.736]}
        rotation={[0.232, 0.004, 0.035]}
        scale={0.648}
      />
      <instances.SeaPlants7
        name="Sea_Plants149"
        position={[2.447, 0.863, -0.592]}
        rotation={[0.209, 0.031, 0.292]}
        scale={1.105}
      />
      <instances.SeaPlants2
        name="Sea_Plants150"
        position={[0.675, 0.066, 3.461]}
        rotation={[0.757, 0.622, 1.36]}
        scale={0.363}
      />
      <instances.SeaPlants2
        name="Sea_Plants151"
        position={[3.168, 1.11, -0.618]}
        rotation={[0.377, -0.011, -0.057]}
        scale={0.812}
      />
      <instances.SeaPlants4
        name="Sea_Plants152"
        position={[1.08, 0.788, 3.865]}
        rotation={[-0.03, 0.002, -0.117]}
        scale={0.899}
      />
      <instances.SeaPlants5
        name="Sea_Plants154"
        position={[1.971, 0.954, 0.717]}
        rotation={[0.043, -0.001, -0.065]}
        scale={0.468}
      />
      <instances.SeaPlants
        name="Sea_Plants155"
        position={[2.439, 0.14, -1.232]}
        rotation={[-0.024, 0.032, -0.02]}
        scale={0.985}
      />
      <mesh
        name="Sea_Plants157"
        castShadow
        receiveShadow
        geometry={(nodes.Sea_Plants157 as InstancedMesh).geometry}
        position={[1.927, 1.209, -0.083]}
        rotation={[-0.182, 0.003, -0.029]}
        scale={0.9}
      />
      <instances.SeaPlants3
        name="Sea_Plants158"
        position={[2.657, 1.025, 0.45]}
        rotation={[0.028, -0.001, -0.047]}
        scale={1.1}
      />
      <mesh
        name="Sea_Plants159"
        castShadow
        receiveShadow
        geometry={(nodes.Sea_Plants159 as InstancedMesh).geometry}
        position={[0.624, 0.286, 2.959]}
        rotation={[0.083, -0.006, -0.147]}
        scale={1.126}
      />
      <instances.SeaPlants3
        name="Sea_Plants160"
        position={[0.722, 0.564, 2.025]}
        rotation={[-0.052, -0.015, 0.556]}
        scale={1.222}
      />
      <instances.SeaPlants10
        name="Sea_Plants163"
        position={[1.604, 0.729, 4.282]}
        rotation={[0.123, -0.023, -0.375]}
        scale={0.754}
      />
      <instances.SeaPlants10
        name="Sea_Plants168"
        position={[2.667, 0.439, -1.457]}
        rotation={[-0.273, -0.332, 0.294]}
        scale={0.901}
      />
      <instances.SeaPlants3
        name="Sea_Plants170"
        position={[0.782, 0.975, 1.615]}
        rotation={[-0.274, -0.057, 0.41]}
        scale={0.372}
      />
      <instances.SeaPlants4
        name="Sea_Plants171"
        position={[1.365, 1.03, 0.52]}
        rotation={[0.135, -0.019, -0.273]}
        scale={0.746}
      />
      <instances.SeaWeed
        name="Sea_Weed022"
        position={[-2.577, 1.494, 4.179]}
        rotation={[Math.PI, -0.895, Math.PI]}
        scale={1.946}
      />
      <mesh
        name="Sea_Weed037"
        castShadow
        receiveShadow
        geometry={(nodes.Sea_Weed037 as InstancedMesh).geometry}
        position={[2.63, 0.739, -0.778]}
        rotation={[0.012, 0, 0.019]}
        scale={1.64}
      />
      <instances.SeaWeed
        name="Sea_Weed038"
        position={[0.685, 0.409, 3.748]}
        rotation={[-0.02, 0, 0.006]}
        scale={1.657}
      />
      <instances.SoftCrustations
        name="Soft_Crustations021"
        position={[-1.223, 0.23, -0.51]}
        rotation={[0.189, 0.005, 0.048]}
        scale={0.957}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations025"
        position={[-1.199, 0.814, -1.692]}
        rotation={[-0.078, 0.005, -0.138]}
        scale={0.373}
      />
      <instances.SoftCrustations
        name="Soft_Crustations033"
        position={[-1.081, 0.176, -1.811]}
        rotation={[0.001, 0, -0.004]}
        scale={0.439}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations035"
        position={[-2.937, 1.089, 3.549]}
        rotation={[-0.007, 0, -0.002]}
        scale={0.774}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations045"
        position={[-1.481, 0.885, -0.863]}
        rotation={[0.127, -0.008, -0.124]}
        scale={1.159}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations062"
        position={[-2.5, 0.968, 4.877]}
        rotation={[0.191, -0.005, -0.049]}
        scale={1.21}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations063"
        position={[-2.268, 1.132, 2.551]}
        rotation={[-0.111, 0.003, -0.059]}
        scale={0.766}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations080"
        position={[-2.343, 1.1, 4.152]}
        rotation={[-0.027, 0, 0.002]}
        scale={0.56}
      />
      <instances.SoftCrustations5
        name="Soft_Crustations083"
        position={[-2.112, 0.518, 0.491]}
        rotation={[-0.121, 0.018, -0.291]}
        scale={1.176}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations092"
        position={[-1.162, 0.553, -0.626]}
        rotation={[0.257, -0.04, -0.31]}
        scale={0.513}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations093"
        position={[-1.631, 0.95, 4.499]}
        rotation={[0.002, 0, -0.183]}
        scale={0.537}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations094"
        position={[-1.603, 0.951, 3.915]}
        rotation={[-0.041, -0.001, 0.053]}
        scale={0.798}
      />
      <instances.SoftCrustations
        name="Soft_Crustations114"
        position={[-1.909, 0.909, 3.308]}
        rotation={[-0.005, 0, -0.004]}
        scale={0.342}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations152"
        position={[-2.098, 0.288, -0.214]}
        rotation={[-0.06, 0.006, -0.202]}
        scale={0.307}
      />
      <instances.SoftCrustations7
        name="Soft_Crustations159"
        position={[-1.663, 0.286, -0.598]}
        rotation={[0.17, 0.002, 0.028]}
        scale={0.863}
      />
      <instances.SoftCrustations5
        name="Soft_Crustations160"
        position={[-3.122, 1.159, 4.211]}
        rotation={[-0.054, -0.001, 0.028]}
        scale={0.775}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations166"
        position={[-3.337, 1.122, 3.718]}
        rotation={[-0.019, 0, 0.002]}
        scale={0.42}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations192"
        position={[-1.892, 1.15, 2.914]}
        rotation={[0.027, -0.001, -0.044]}
        scale={0.777}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations200"
        position={[-1.163, 0.27, -0.816]}
        rotation={[0.001, 0, -0.031]}
        scale={0.381}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations201"
        position={[-0.782, 0.263, -1.523]}
        rotation={[-0.024, -0.001, 0.109]}
        scale={1.078}
      />
      <instances.SoftCrustations
        name="Soft_Crustations207"
        position={[1.804, 0.414, -0.282]}
        rotation={[0.019, 0.002, 0.166]}
        scale={0.523}
      />
      <instances.SoftCrustations7
        name="Soft_Crustations208"
        position={[2.289, 0.399, -0.878]}
        rotation={[-0.169, -0.002, 0.022]}
        scale={0.567}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations210"
        position={[2.585, 1.086, -0.761]}
        rotation={[-0.029, -0.001, 0.095]}
        scale={1.215}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations212"
        position={[1.012, 1.291, 3.282]}
        rotation={[-0.077, -0.003, 0.042]}
        scale={0.999}
      />
      <instances.SoftCrustations5
        name="Soft_Crustations215"
        position={[2.067, 0.665, -0.633]}
        rotation={[-0.152, 0.008, -0.101]}
        scale={1.153}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations217"
        position={[2.497, 0.873, -0.299]}
        rotation={[0.433, 0.28, 1.139]}
        scale={1.016}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations220"
        position={[3.722, 0.392, -1.682]}
        rotation={[0.031, 0, 0.02]}
        scale={0.606}
      />
      <instances.SoftCrustations
        name="Soft_Crustations222"
        position={[0.589, 0.738, 3.121]}
        rotation={[-0.428, -0.42, 1.553]}
        scale={0.998}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations223"
        position={[2.088, 0.737, -0.171]}
        rotation={[-1.305, 0.195, -0.255]}
        scale={0.373}
      />
      <instances.SoftCrustations
        name="Soft_Crustations224"
        position={[1.109, 0.416, -0.274]}
        rotation={[-1.084, -0.585, 0.928]}
        scale={1.141}
      />
      <instances.SoftCrustations7
        name="Soft_Crustations226"
        position={[1.895, 0.42, -0.877]}
        rotation={[-1.467, -0.038, 0.042]}
        scale={0.846}
      />
      <instances.SoftCrustations5
        name="Soft_Crustations229"
        position={[1.012, 0.083, 0.457]}
        rotation={[0.092, 0, 0.019]}
        scale={0.866}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations230"
        position={[1.465, 0.302, -0.048]}
        rotation={[-0.608, -0.12, 0.377]}
        scale={0.98}
      />
      <instances.SoftCrustations
        name="Soft_Crustations236"
        position={[0.568, 0.038, 3.411]}
        rotation={[-0.062, 1.124, 0.058]}
        scale={0.711}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations243"
        position={[2.121, 0.1, -1.062]}
        rotation={[0.132, 0.004, -0.015]}
        scale={1.159}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations245"
        position={[0.598, 0.09, 2.512]}
        rotation={[0.066, -0.001, -0.034]}
        scale={1.134}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations248"
        position={[3.469, 0.68, -1.409]}
        rotation={[-1.321, 0.171, -0.219]}
        scale={0.434}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations251"
        position={[0.985, 1.16, -0.174]}
        rotation={[-0.038, 0, -0.001]}
        scale={0.604}
      />
      <instances.SuckerPlants
        name="Sucker_Plants024"
        position={[-2.165, 1.17, 2.738]}
        rotation={[3.141, 0.81, -3.13]}
        scale={0.96}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants051"
        position={[-1.68, 0.972, 4.122]}
        rotation={[-0.04, 0, 0.022]}
        scale={1.014}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants060"
        position={[-1.48, 0.988, 3.602]}
        rotation={[0.028, 0, 0.012]}
        scale={0.513}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants062"
        position={[-1.813, 0.96, 3.34]}
        rotation={[-0.005, 0, 0.003]}
        scale={0.756}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants077"
        position={[-2.103, 1.115, 3.825]}
        rotation={[-0.008, 0, -0.007]}
        scale={0.952}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants084"
        position={[-1.684, 0.933, 3.013]}
        rotation={[0.021, 0, -0.03]}
        scale={0.67}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants090"
        position={[-2.697, 1.015, 4.534]}
        rotation={[0.029, 0, 0.015]}
        scale={0.828}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants094"
        position={[-1.349, 1.567, -1.321]}
        rotation={[0.036, -0.001, -0.037]}
        scale={0.662}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants141"
        position={[-1.604, 0.198, -0.663]}
        rotation={[0.012, 0, 0.013]}
        scale={0.325}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants151"
        position={[-1.062, 0.209, -1.101]}
        rotation={[-0.017, 0, -0.003]}
        scale={0.622}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants156"
        position={[-0.656, 0.278, -1.437]}
        rotation={[-0.017, -0.001, 0.121]}
        scale={1.144}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants159"
        position={[-0.846, 0.196, -0.688]}
        rotation={[0.168, -0.01, -0.123]}
        scale={0.359}
      />
      <mesh
        name="Sucker_Plants165"
        castShadow
        receiveShadow
        geometry={(nodes.Sucker_Plants165 as InstancedMesh).geometry}
        position={[-2.538, 1.177, 2.565]}
        rotation={[-0.013, 0, 0.028]}
        scale={0.425}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants171"
        position={[-1.156, 0.209, -0.33]}
        rotation={[0.06, -0.004, -0.121]}
        scale={0.35}
      />
      <instances.SuckerPlants
        name="Sucker_Plants267"
        position={[-1.68, 0.583, -0.818]}
        rotation={[0.003, 0, 0.027]}
        scale={0.494}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants270"
        position={[-2.142, 0.534, 0.389]}
        rotation={[-0.094, 0.016, -0.334]}
        scale={1.241}
      />
      <instances.SuckerPlants
        name="Sucker_Plants271"
        position={[-0.802, 0.658, -1.469]}
        rotation={[0.071, -0.002, -0.054]}
        scale={1.165}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants296"
        position={[-3.425, 1.26, 3.473]}
        rotation={[0.018, 0, 0.005]}
        scale={1.114}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants303"
        position={[-2.878, 0.949, 3.526]}
        rotation={[-0.006, 0, -0.001]}
        scale={0.405}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants324"
        position={[2.69, 0.356, -0.822]}
        rotation={[0.012, 0, 0.019]}
        scale={0.44}
      />
      <instances.SuckerPlants
        name="Sucker_Plants327"
        position={[1.713, 0.94, 0.449]}
        rotation={[0.017, 0, 0.001]}
        scale={0.304}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants330"
        position={[2.573, 0.05, -1.385]}
        rotation={[0.02, -0.008, -0.042]}
        scale={1.123}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants331"
        position={[1.467, 1.304, 1.558]}
        rotation={[0.027, 0.001, 0.053]}
        scale={0.756}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants334"
        position={[1.713, 0.614, -0.292]}
        rotation={[0.003, 0.01, -0.069]}
        scale={1.025}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants337"
        position={[2.827, 0.381, -1.489]}
        rotation={[-0.206, -0.001, 0.011]}
        scale={0.704}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants340"
        position={[1.939, 1.005, -0.033]}
        rotation={[-0.031, 0, 0.024]}
        scale={0.837}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants342"
        position={[0.845, 1.01, 2.187]}
        rotation={[0.296, -0.019, -0.127]}
        scale={0.746}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants346"
        position={[2.63, 1.083, -0.439]}
        rotation={[0.038, 0, -0.195]}
        scale={1.116}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants348"
        position={[0.794, 0.406, 1.397]}
        rotation={[-1.099, -0.547, 0.858]}
        scale={0.902}
      />
      <instances.SuckerPlants
        name="Sucker_Plants349"
        position={[1.236, 0.728, -0.424]}
        rotation={[-1.445, 0.064, -0.073]}
        scale={1.282}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants350"
        position={[1.079, 0.927, 1.441]}
        rotation={[0.05, 0.001, 0.02]}
        scale={0.41}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants352"
        position={[1.739, 1.174, -0.352]}
        rotation={[-0.131, 0.003, -0.049]}
        scale={0.891}
      />
      <instances.SuckerPlants
        name="Sucker_Plants355"
        position={[1.181, 0.729, 4.102]}
        rotation={[-0.093, 0.004, -0.076]}
        scale={0.679}
      />
      <instances.SuckerPlants
        name="Sucker_Plants358"
        position={[1.892, 0.425, -0.31]}
        rotation={[0.016, 0, -0.006]}
        scale={0.431}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants359"
        position={[3.323, 1.256, -0.792]}
        rotation={[0.047, 0, -0.012]}
        scale={1.259}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants361"
        position={[3.705, 1.09, -0.899]}
        rotation={[0.062, 0.003, 0.082]}
        scale={0.472}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants363"
        position={[3.374, 1.072, -1.17]}
        rotation={[0.078, 0.002, 0.06]}
        scale={0.594}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants365"
        position={[2.461, 0.386, -1.029]}
        rotation={[-0.756, 0.117, 0.432]}
        scale={0.437}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants369"
        position={[0.715, 0.6, 2.33]}
        rotation={[-0.019, 0.012, 0.004]}
        scale={0.976}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants371"
        position={[1.201, 0.775, 0.822]}
        rotation={[-0.128, -0.102, 0.283]}
        scale={0.743}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants372"
        position={[1.091, 0.694, 2.823]}
        rotation={[0.128, -0.013, -0.201]}
        scale={0.907}
      />
      <mesh
        name="Tube_Plants041"
        castShadow
        receiveShadow
        geometry={(nodes.Tube_Plants041 as InstancedMesh).geometry}
        position={[-3.166, 1.628, 3.687]}
        rotation={[0.127, 0.001, 0.014]}
        scale={2.162}
      />
      <mesh
        name="Tube_Plants043"
        castShadow
        receiveShadow
        geometry={(nodes.Tube_Plants043 as InstancedMesh).geometry}
        position={[2.668, 0.392, -0.856]}
        rotation={[0.012, 0, 0.019]}
        scale={1.64}
      />
      <mesh
        name="Tube_Plants044"
        castShadow
        receiveShadow
        geometry={(nodes.Tube_Plants044 as InstancedMesh).geometry}
        position={[3.609, 0.403, -1.771]}
        rotation={[-0.072, -0.001, 0.019]}
        scale={1.657}
      />
      <mesh
        name="Tube_Plants046"
        castShadow
        receiveShadow
        geometry={(nodes.Tube_Plants046 as InstancedMesh).geometry}
        position={[1.231, 0.829, 4.049]}
        rotation={[-0.093, 0.004, -0.076]}
        scale={1.504}
      />
      <mesh
        name="Tube_Plants047"
        castShadow
        receiveShadow
        geometry={(nodes.Tube_Plants047 as InstancedMesh).geometry}
        position={[2.476, 0.842, 0.446]}
        rotation={[-0.193, -0.016, 0.166]}
        scale={1.961}
      />
      <mesh
        name="Tube_Plants049"
        castShadow
        receiveShadow
        geometry={(nodes.Tube_Plants049 as InstancedMesh).geometry}
        position={[0.864, 1.198, 2.293]}
        rotation={[0.296, -0.019, -0.127]}
        scale={2.323}
      />
    </group>
  );
};

useGLTF.preload("/reef_impact.glb");
useLoader.preload(TextureLoader, "/sand_diffuse.jpg");
useLoader.preload(TextureLoader, "/sand_roughness.jpg");
useLoader.preload(TextureLoader, "/sand_normal.jpg");
