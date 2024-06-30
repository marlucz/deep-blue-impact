// @ts-nocheck
import { Merged, useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  InstancedMesh,
  Group,
  MeshStandardMaterial,
  Object3D,
  RepeatWrapping,
  TextureLoader,
  Mesh,
  Color,
} from "three";

const context = createContext<Record<string, Object3D>>({});

interface ReefInstancesProps {
  children: ReactNode;
}

export function ReefInstances({ children }: ReefInstancesProps) {
  const { nodes } = useGLTF("/reef_light.glb");
  const instances: Record<string, Object3D> = useMemo(
    () => ({
      SandPlane: nodes.Sand_Plane,
      SandPlane1: nodes.Sand_Plane001,
      CoralTopsBig: nodes.Coral_Tops_Big,
      CoralTopsSmall: nodes.Coral_Tops_Small,
      CoralWallBig: nodes.Coral_Wall_Big,
      CoralWallSmall: nodes.Coral_Wall_Small,
      HardCrustations: nodes.Hard_Crustations028,
      HardCrustations1: nodes.Hard_Crustations029,
      HardCrustations2: nodes.Hard_Crustations033,
      HardCrustations3: nodes.Hard_Crustations035,
      HardCrustations4: nodes.Hard_Crustations041,
      HardCrustations5: nodes.Hard_Crustations043,
      HardCrustations6: nodes.Hard_Crustations047,
      HardCrustations7: nodes.Hard_Crustations048,
      HardCrustations8: nodes.Hard_Crustations058,
      HardCrustations9: nodes.Hard_Crustations068,
      HardCrustations10: nodes.Hard_Crustations075,
      HardCrustations11: nodes.Hard_Crustations077,
      HardCrustations12: nodes.Hard_Crustations079,
      HardPlants: nodes.Hard_Plants009,
      HardPlants1: nodes.Hard_Plants010,
      HardPlants2: nodes.Hard_Plants011,
      HardPlants3: nodes.Hard_Plants014,
      HardPlants4: nodes.Hard_Plants017,
      HardPlants5: nodes.Hard_Plants025,
      HardPlants6: nodes.Hard_Plants051,
      LargeSidePlants: nodes.Large_Side_Plants006,
      LargeSidePlants1: nodes.Large_Side_Plants016,
      LargeSidePlants2: nodes.Large_Side_Plants021,
      LargeSidePlants3: nodes.Large_Side_Plants022,
      SeaGrass: nodes.Sea_Grass010,
      SeaGrass1: nodes.Sea_Grass013,
      SeaGrass2: nodes.Sea_Grass015,
      SeaGrass3: nodes.Sea_Grass016,
      SeaGrass4: nodes.Sea_Grass019,
      SeaGrass5: nodes.Sea_Grass001,
      SeaKelp: nodes.Sea_Kelp004,
      SeaKelp1: nodes.Sea_Kelp006,
      SeaKelp2: nodes.Sea_Kelp008,
      SeaKelp3: nodes.Sea_Kelp009,
      SeaPlants: nodes.Sea_Plants022,
      SeaPlants1: nodes.Sea_Plants033,
      SeaPlants2: nodes.Sea_Plants034,
      SeaPlants3: nodes.Sea_Plants035,
      SeaPlants4: nodes.Sea_Plants043,
      SeaPlants5: nodes.Sea_Plants046,
      SeaPlants6: nodes.Sea_Plants052,
      SeaPlants7: nodes.Sea_Plants060,
      SeaPlants8: nodes.Sea_Plants068,
      SeaPlants9: nodes.Sea_Plants078,
      SeaPlants10: nodes.Sea_Plants086,
      SeaPlants11: nodes.Sea_Plants133,
      SeaPlants12: nodes.Sea_Plants141,
      SeaPlants13: nodes.Sea_Plants159,
      SeaPlants14: nodes.Sea_Plants163,
      SeaWeed: nodes.Sea_Weed010,
      SeaWeed1: nodes.Sea_Weed012,
      SeaWeed2: nodes.Sea_Weed016,
      SeaWeed3: nodes.Sea_Weed041,
      SoftCrustations: nodes.Soft_Crustations021,
      SoftCrustations1: nodes.Soft_Crustations025,
      SoftCrustations2: nodes.Soft_Crustations026,
      SoftCrustations3: nodes.Soft_Crustations036,
      SoftCrustations4: nodes.Soft_Crustations049,
      SoftCrustations5: nodes.Soft_Crustations053,
      SoftCrustations6: nodes.Soft_Crustations062,
      SoftCrustations7: nodes.Soft_Crustations074,
      SuckerPlants: nodes.Sucker_Plants008,
      SuckerPlants1: nodes.Sucker_Plants017,
      SuckerPlants2: nodes.Sucker_Plants023,
      SuckerPlants3: nodes.Sucker_Plants024,
      SuckerPlants4: nodes.Sucker_Plants051,
      SuckerPlants5: nodes.Sucker_Plants054,
      SuckerPlants6: nodes.Sucker_Plants084,
      TubePlants: nodes.Tube_Plants023,
      TubePlants1: nodes.Tube_Plants030,
      TubePlants2: nodes.Tube_Plants036,
      TubePlants3: nodes.Tube_Plants039,
      TubePlants4: nodes.Tube_Plants043,
      TubePlants5: nodes.Tube_Plants044,
      TubePlants6: nodes.Tube_Plants045,
      TubePlants7: nodes.Tube_Plants047,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances}>
      {/* @ts-expect-error meh */}
      {(instances) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

export function ReefHealthy() {
  const instances = useContext(context);
  const { nodes } = useGLTF("/reef_light.glb");

  const sandTextures = useTexture([
    "/sand_diffuse.jpg",
    "/sand_roughness.jpg",
    "/sand_normal.jpg",
    "/sand_ao.jpg",
  ]);

  const ref = useRef<Group>(null);

  useLayoutEffect(() => {
    for (const sandTexture of sandTextures) {
      sandTexture.wrapS = sandTexture.wrapT = RepeatWrapping;
      sandTexture.repeat.set(2, 2);
    }
  });

  const [diffuse, roughness, normal, ao] = sandTextures;

  const sandMaterial = new MeshStandardMaterial({
    map: diffuse,
    roughnessMap: roughness,
    normalMap: normal,
    aoMap: ao,
  });

  const coralWallMaterial = new MeshStandardMaterial({
    map: diffuse,
    roughnessMap: roughness,
    normalMap: normal,
    aoMap: ao,
    color: 0x888888,
    aoMapIntensity: 2,
  });

  const coralTopMaterial = new MeshStandardMaterial({
    map: diffuse,
    roughnessMap: roughness,
    normalMap: normal,
    aoMap: ao,
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
          const color = new Color(Math.random() * 0xffffff);
          // @ts-expect-error exists
          (node as InstancedMesh).color = color;
        }
      });
    }
  }, [ref]);

  return (
    <group dispose={null} ref={ref}>
      <mesh
        name="Sand_Plane"
        castShadow
        receiveShadow
        geometry={(nodes.Sand_Plane as InstancedMesh).geometry}
        scale={0.323}
      />
      <mesh
        name="Sand_Plane001"
        castShadow
        receiveShadow
        geometry={(nodes.Sand_Plane001 as InstancedMesh).geometry}
        scale={10}
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
        name="Hard_Crustations028"
        position={[-2.626, 0.216, -2.714]}
        rotation={[-0.179, -0.008, 0.088]}
        scale={1.113}
      />
      <instances.HardCrustations1
        name="Hard_Crustations029"
        position={[-1.729, 0.143, -0.278]}
        rotation={[0.12, -0.01, -0.168]}
        scale={0.32}
      />
      <instances.HardCrustations2
        name="Hard_Crustations033"
        position={[-2.725, 0.25, -1.017]}
        rotation={[0.005, 0, 0.007]}
        scale={0.707}
      />
      <instances.HardCrustations3
        name="Hard_Crustations035"
        position={[-1.293, 0.192, -2.047]}
        rotation={[0.004, 0, -0.005]}
        scale={0.433}
      />
      <instances.HardCrustations2
        name="Hard_Crustations039"
        position={[-1.451, 0.583, -0.522]}
        rotation={[0.125, 0.003, 0.052]}
        scale={0.957}
      />
      <instances.HardCrustations4
        name="Hard_Crustations041"
        position={[-1.863, 1.278, 0.4]}
        rotation={[-0.116, 0.01, -0.17]}
        scale={1.271}
      />
      <instances.HardCrustations5
        name="Hard_Crustations043"
        position={[-3.026, 1.1, 3.818]}
        rotation={[-0.001, 0, 0.014]}
        scale={0.7}
      />
      <instances.HardCrustations6
        name="Hard_Crustations047"
        position={[-2.193, 0.253, -1.528]}
        rotation={[0.002, 0, -0.009]}
        scale={0.762}
      />
      <instances.HardCrustations7
        name="Hard_Crustations048"
        position={[-1.053, 0.222, -0.711]}
        rotation={[-0.001, 0, -0.146]}
        scale={0.567}
      />
      <instances.HardCrustations2
        name="Hard_Crustations054"
        position={[-0.567, 0.225, -1.483]}
        rotation={[-0.026, -0.002, 0.135]}
        scale={1.021}
      />
      <instances.HardCrustations2
        name="Hard_Crustations057"
        position={[-2.275, 0.237, -2.24]}
        rotation={[-0.135, 0.003, -0.04]}
        scale={1.129}
      />
      <instances.HardCrustations8
        name="Hard_Crustations058"
        position={[-1.423, 0.322, -1.128]}
        rotation={[-0.211, 0.001, -0.009]}
        scale={0.519}
      />
      <instances.HardCrustations3
        name="Hard_Crustations060"
        position={[-2.071, 1.593, -1.491]}
        rotation={[0.001, 0, -0.006]}
        scale={0.867}
      />
      <instances.HardCrustations9
        name="Hard_Crustations068"
        position={[-1.351, 0.215, -2.863]}
        rotation={[-0.341, 0.036, -0.21]}
        scale={0.538}
      />
      <instances.HardCrustations
        name="Hard_Crustations071"
        position={[-1.773, 0.255, -2.124]}
        rotation={[-0.182, 0.004, -0.039]}
        scale={0.604}
      />
      <instances.HardCrustations10
        name="Hard_Crustations075"
        position={[-1.76, 1.591, -0.804]}
        rotation={[0.085, 0.005, 0.107]}
        scale={1.152}
      />
      <instances.HardCrustations11
        name="Hard_Crustations077"
        position={[-2.803, 1.091, 1.716]}
        rotation={[-0.01, 0.001, -0.016]}
        scale={0.977}
      />
      <instances.HardCrustations12
        name="Hard_Crustations079"
        position={[-0.631, 0.211, -2.187]}
        rotation={[-0.046, 0.004, -0.178]}
        scale={0.849}
      />
      <instances.HardCrustations2
        name="Hard_Crustations081"
        position={[-2.812, 1.253, -0.775]}
        rotation={[-0.087, 0.005, -0.11]}
        scale={0.881}
      />
      <instances.HardCrustations1
        name="Hard_Crustations083"
        position={[-1.179, 1.555, -1.428]}
        rotation={[0.162, 0.02, 0.244]}
        scale={0.313}
      />
      <instances.HardCrustations2
        name="Hard_Crustations084"
        position={[-0.886, 0.571, -1.789]}
        rotation={[-0.012, 0, -0.039]}
        scale={1.178}
      />
      <instances.HardCrustations11
        name="Hard_Crustations086"
        position={[-0.937, 0.181, -2.588]}
        rotation={[-0.211, 0.011, -0.104]}
        scale={0.319}
      />
      <instances.HardCrustations6
        name="Hard_Crustations091"
        position={[-1.624, 0.913, 4.444]}
        rotation={[-0.01, 0.001, -0.125]}
        scale={0.442}
      />
      <instances.HardCrustations3
        name="Hard_Crustations092"
        position={[-1.097, 1.012, 3.398]}
        rotation={[0.015, -0.001, -0.152]}
        scale={1.073}
      />
      <instances.HardCrustations4
        name="Hard_Crustations094"
        position={[-2.474, 1.27, 1.053]}
        rotation={[-0.004, 0, -0.023]}
        scale={0.769}
      />
      <instances.HardCrustations9
        name="Hard_Crustations104"
        position={[-2.532, 2.331, -1.22]}
        rotation={[-0.063, -0.001, 0.046]}
        scale={0.914}
      />
      <instances.HardCrustations12
        name="Hard_Crustations107"
        position={[-3.593, 2.535, 0.473]}
        rotation={[-0.005, 0, 0.007]}
        scale={0.872}
      />
      <instances.HardCrustations11
        name="Hard_Crustations110"
        position={[-3.226, 0.153, -2.222]}
        rotation={[-0.377, -0.178, 0.877]}
        scale={0.992}
      />
      <instances.HardCrustations6
        name="Hard_Crustations112"
        position={[-1.712, 0.182, -1.653]}
        rotation={[-0.002, 0, 0]}
        scale={0.958}
      />
      <instances.HardCrustations9
        name="Hard_Crustations115"
        position={[-2.193, 0.824, -2.308]}
        rotation={[-0.205, -0.022, 0.216]}
        scale={0.6}
      />
      <instances.HardCrustations9
        name="Hard_Crustations120"
        position={[-2.028, 0.174, -2.765]}
        rotation={[-0.057, 0, -0.004]}
        scale={0.783}
      />
      <instances.HardCrustations6
        name="Hard_Crustations126"
        position={[-2.381, 0.505, 1.78]}
        rotation={[-0.007, 0, 0.107]}
        scale={0.598}
      />
      <instances.HardCrustations3
        name="Hard_Crustations132"
        position={[-1.98, 0.58, -1.1]}
        rotation={[0.009, 0, -0.002]}
        scale={0.487}
      />
      <instances.HardCrustations2
        name="Hard_Crustations134"
        position={[-4.075, 0.517, 0.175]}
        rotation={[-0.77, -0.331, 0.783]}
        scale={1.214}
      />
      <instances.HardCrustations10
        name="Hard_Crustations135"
        position={[-2.645, 1.134, 3.773]}
        rotation={[-0.006, 0, -0.002]}
        scale={0.596}
      />
      <instances.HardCrustations4
        name="Hard_Crustations140"
        position={[1.478, 0.051, -0.526]}
        rotation={[-0.052, -0.006, 0.057]}
        scale={1.274}
      />
      <instances.HardCrustations10
        name="Hard_Crustations141"
        position={[0.855, 1.205, 0.156]}
        rotation={[-0.088, 0.018, -0.042]}
        scale={1.195}
      />
      <instances.HardCrustations1
        name="Hard_Crustations143"
        position={[3.113, 0.375, -1.453]}
        rotation={[-0.006, 0, 0.009]}
        scale={1.2}
      />
      <instances.HardCrustations5
        name="Hard_Crustations144"
        position={[3.326, 0.346, -1.723]}
        rotation={[0.076, -0.001, -0.037]}
        scale={0.476}
      />
      <instances.HardCrustations10
        name="Hard_Crustations148"
        position={[0.592, 1.274, 3.385]}
        rotation={[0.207, 0.034, 0.326]}
        scale={1.149}
      />
      <instances.HardCrustations7
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
      <instances.HardPlants1
        name="Hard_Plants010"
        position={[-3.116, 2.065, 1.697]}
        rotation={[-0.018, 0, 0.014]}
        scale={0.772}
      />
      <instances.HardPlants2
        name="Hard_Plants011"
        position={[-2.992, 1.727, 2.869]}
        rotation={[-0.055, 0.001, -0.019]}
        scale={0.514}
      />
      <instances.HardPlants
        name="Hard_Plants012"
        position={[-2.585, 1.167, 4.177]}
        rotation={[0, 0, -0.005]}
        scale={0.409}
      />
      <instances.HardPlants3
        name="Hard_Plants014"
        position={[-1.918, 1.358, 0.553]}
        rotation={[-0.093, 0.001, -0.028]}
        scale={1.175}
      />
      <instances.HardPlants4
        name="Hard_Plants017"
        position={[-2.086, 2.427, -0.794]}
        rotation={[0.381, -0.066, -0.34]}
        scale={1.057}
      />
      <instances.HardPlants2
        name="Hard_Plants022"
        position={[-1.401, 1.029, 2.793]}
        rotation={[0.048, -0.002, -0.086]}
        scale={1.252}
      />
      <instances.HardPlants3
        name="Hard_Plants023"
        position={[-1.795, 0.208, -2.571]}
        rotation={[-0.014, 0, 0.029]}
        scale={0.588}
      />
      <instances.HardPlants5
        name="Hard_Plants025"
        position={[-1.312, 1.532, -1.15]}
        rotation={[0.007, -0.001, -0.165]}
        scale={0.328}
      />
      <instances.HardPlants2
        name="Hard_Plants029"
        position={[-2.032, 0.621, 1.233]}
        rotation={[0.113, -0.004, -0.077]}
        scale={1.194}
      />
      <instances.HardPlants1
        name="Hard_Plants035"
        position={[-0.825, 0.792, -1.487]}
        rotation={[-0.028, -0.002, 0.129]}
        scale={1.204}
      />
      <instances.HardPlants4
        name="Hard_Plants041"
        position={[-2.108, 0.985, 2.159]}
        rotation={[0.14, -0.016, -0.156]}
        scale={0.712}
      />
      <instances.HardPlants
        name="Hard_Plants044"
        position={[-3.381, 3.599, 2.242]}
        rotation={[0.045, 0, -0.009]}
        scale={0.383}
      />
      <instances.HardPlants2
        name="Hard_Plants050"
        position={[-2.122, 1.503, -0.355]}
        rotation={[0.05, 0, -0.008]}
        scale={0.862}
      />
      <instances.HardPlants6
        name="Hard_Plants051"
        position={[-2.539, 1.106, 3.223]}
        rotation={[0.005, 0, 0.005]}
        scale={0.821}
      />
      <instances.HardPlants
        name="Hard_Plants055"
        position={[-3.477, 1.158, 3.143]}
        rotation={[0.28, -0.002, -0.015]}
        scale={0.975}
      />
      <instances.HardPlants3
        name="Hard_Plants059"
        position={[-2.004, 0.912, -1.052]}
        rotation={[0.039, -0.001, -0.028]}
        scale={0.959}
      />
      <instances.HardPlants2
        name="Hard_Plants067"
        position={[-2.114, 0.93, 4.688]}
        rotation={[0.174, 0.004, 0.045]}
        scale={0.399}
      />
      <instances.HardPlants
        name="Hard_Plants071"
        position={[-2.755, 2.815, 2.685]}
        rotation={[0.279, -0.012, -0.086]}
        scale={1.003}
      />
      <instances.HardPlants3
        name="Hard_Plants072"
        position={[-2.844, 0.263, -2.437]}
        rotation={[-0.339, -0.02, 0.118]}
        scale={0.431}
      />
      <instances.HardPlants1
        name="Hard_Plants075"
        position={[-1.795, 1.991, -2.438]}
        rotation={[-0.219, 0.003, -0.03]}
        scale={0.966}
      />
      <instances.HardPlants6
        name="Hard_Plants077"
        position={[-2.066, 0.267, -1.665]}
        rotation={[-0.019, 0, -0.018]}
        scale={0.522}
      />
      <instances.HardPlants2
        name="Hard_Plants078"
        position={[-0.888, 0.316, -2.49]}
        rotation={[-0.121, 0.003, -0.052]}
        scale={1.247}
      />
      <instances.HardPlants6
        name="Hard_Plants083"
        position={[-3.543, 3.022, 0.063]}
        rotation={[-0.082, -0.002, 0.047]}
        scale={0.476}
      />
      <instances.HardPlants
        name="Hard_Plants084"
        position={[-2.387, 2.248, -1.714]}
        rotation={[0.06, 0, 0.006]}
        scale={0.644}
      />
      <instances.HardPlants1
        name="Hard_Plants085"
        position={[-2.697, 2.72, -0.238]}
        rotation={[-0.026, 0, -0.011]}
        scale={1.253}
      />
      <instances.HardPlants
        name="Hard_Plants091"
        position={[0.655, 0.199, 2.234]}
        rotation={[-0.088, -0.012, 0.069]}
        scale={1.074}
      />
      <instances.HardPlants3
        name="Hard_Plants092"
        position={[1.396, 1.009, 0.501]}
        rotation={[0.094, -0.009, -0.197]}
        scale={0.772}
      />
      <instances.HardPlants1
        name="Hard_Plants094"
        position={[1.754, 0.212, -0.804]}
        rotation={[0.133, 0.049, -0.015]}
        scale={0.409}
      />
      <instances.HardPlants4
        name="Hard_Plants095"
        position={[0.925, 1.149, -0.296]}
        rotation={[-0.143, -0.004, 0.056]}
        scale={0.381}
      />
      <instances.HardPlants2
        name="Hard_Plants096"
        position={[1.094, 0.81, 3.956]}
        rotation={[-0.004, 0, -0.131]}
        scale={1.175}
      />
      <instances.HardPlants3
        name="Hard_Plants097"
        position={[1.132, 1.468, 2.545]}
        rotation={[-0.374, -0.043, 0.226]}
        scale={0.361}
      />
      <instances.HardPlants6
        name="Hard_Plants098"
        position={[3.529, 0.413, -1.509]}
        rotation={[0.025, 0.001, 0.045]}
        scale={1.23}
      />
      <instances.HardPlants4
        name="Hard_Plants099"
        position={[2.919, 1.074, -0.636]}
        rotation={[0.363, 0.038, 0.029]}
        scale={1.057}
      />
      <instances.HardPlants6
        name="Hard_Plants100"
        position={[3.168, 0.028, -1.755]}
        rotation={[-0.052, 0.003, -0.1]}
        scale={0.738}
      />
      <instances.HardPlants2
        name="Hard_Plants102"
        position={[0.68, 0.574, 2.661]}
        rotation={[0.08, -0.015, -0.123]}
        scale={0.892}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants006"
        position={[-2.753, 2.158, -1.85]}
        rotation={[0.08, 0.001, 0.014]}
        scale={1.291}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants008"
        position={[-2.002, 1.529, -0.854]}
        rotation={[0.107, -0.004, -0.079]}
        scale={0.97}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants014"
        position={[-2.524, 1.012, 2.145]}
        rotation={[-0.055, 0.001, -0.022]}
        scale={0.868}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants016"
        position={[-2.364, 2.174, -1.561]}
        rotation={[0.019, 0, 0.013]}
        scale={0.419}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants021"
        position={[-2.371, 2.128, -0.795]}
        rotation={[-0.002, 0, 0.048]}
        scale={0.635}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants022"
        position={[-1.908, 0.918, 3.696]}
        rotation={[0.011, 0, -0.006]}
        scale={0.95}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants028"
        position={[-2.785, 1.969, 0.401]}
        rotation={[-0.026, 0, 0.02]}
        scale={0.622}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants030"
        position={[-2.945, 1.019, 2.323]}
        rotation={[0.006, 0, 0.005]}
        scale={0.894}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants033"
        position={[-3.151, 2.66, 1.956]}
        rotation={[-0.014, 0, -0.006]}
        scale={1.032}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants035"
        position={[-1.304, 1.54, -1.602]}
        rotation={[0.024, 0.001, 0.123]}
        scale={0.474}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants037"
        position={[-2.237, 0.265, -1.197]}
        rotation={[-0.004, 0, -0.007]}
        scale={1.038}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants046"
        position={[-1.555, 1.248, 3.57]}
        rotation={[0.073, -0.003, -0.08]}
        scale={1.082}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants050"
        position={[-1.38, 0.812, -1.092]}
        rotation={[0.064, -0.006, -0.18]}
        scale={1.16}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants053"
        position={[-1.085, 0.939, 3.361]}
        rotation={[-0.012, 0.002, -0.313]}
        scale={0.763}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants054"
        position={[-2.396, 0.903, 4.747]}
        rotation={[0.116, -0.003, -0.046]}
        scale={0.82}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants056"
        position={[-2.814, 1.246, -1.632]}
        rotation={[0.06, -0.001, -0.044]}
        scale={0.818}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants061"
        position={[-2.34, 0.925, 4.226]}
        rotation={[-0.022, 0, 0.006]}
        scale={0.89}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants063"
        position={[-3.067, 1.679, 1.805]}
        rotation={[0.002, 0, 0.018]}
        scale={0.45}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants064"
        position={[-2.185, 1.225, -0.359]}
        rotation={[-0.063, 0.006, -0.198]}
        scale={0.584}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants068"
        position={[-2.348, 1.042, 1.147]}
        rotation={[-0.11, 0.018, -0.322]}
        scale={1.058}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants069"
        position={[-1.889, 0.902, -2.3]}
        rotation={[0.007, 0, -0.069]}
        scale={0.772}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants070"
        position={[-2.604, 1.685, 2.793]}
        rotation={[0.097, 0.004, 0.077]}
        scale={0.445}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants071"
        position={[-2.237, 1.337, -1.682]}
        rotation={[0.138, 0.005, 0.068]}
        scale={0.905}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants075"
        position={[-3.482, 1.016, 2.256]}
        rotation={[-0.001, 0, 0.004]}
        scale={1.016}
      />
      <instances.LargeSidePlants3
        name="Large_Side_Plants076"
        position={[-2.36, 1.695, 2.418]}
        rotation={[-0.105, 0.006, -0.108]}
        scale={1.034}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants087"
        position={[2.61, 0.401, -1.12]}
        rotation={[0.052, 0.004, 0.165]}
        scale={0.689}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants088"
        position={[1.336, 1.06, 1.58]}
        rotation={[-0.016, 0, 0.046]}
        scale={1.291}
      />
      <instances.LargeSidePlants2
        name="Large_Side_Plants090"
        position={[1.809, 0.433, -0.505]}
        rotation={[0.03, 0.005, 0.295]}
        scale={0.97}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants091"
        position={[1.312, 0.713, 4.069]}
        rotation={[-0.005, 0, -0.026]}
        scale={0.422}
      />
      <instances.LargeSidePlants
        name="Large_Side_Plants093"
        position={[1.227, 1.143, 0.045]}
        rotation={[-0.002, 0, 0.002]}
        scale={1.053}
      />
      <instances.LargeSidePlants1
        name="Large_Side_Plants096"
        position={[3.509, 1.15, -1.217]}
        rotation={[0.284, -0.016, -0.113]}
        scale={0.868}
      />
      <instances.SeaGrass
        name="Sea_Grass010"
        position={[-3.961, 1.672, 3.836]}
        rotation={[0.024, 0.002, -0.04]}
        scale={2.429}
      />
      <instances.SeaGrass1
        name="Sea_Grass013"
        position={[-1.217, 1.551, 3.075]}
        rotation={[-0.143, 0, -0.007]}
        scale={3.441}
      />
      <instances.SeaGrass1
        name="Sea_Grass014"
        position={[-3.036, 1.477, 4.349]}
        rotation={[0.009, 0, 0.007]}
        scale={3.537}
      />
      <instances.SeaGrass2
        name="Sea_Grass015"
        position={[-2.346, 1.811, 1.271]}
        rotation={[-0.078, 0.001, -0.01]}
        scale={2.849}
      />
      <instances.SeaGrass3
        name="Sea_Grass016"
        position={[-2.449, 0.177, -2.801]}
        rotation={[-0.279, -0.007, 0.053]}
        scale={3.077}
      />
      <instances.SeaGrass4
        name="Sea_Grass019"
        position={[1.134, 0.715, 2.162]}
        rotation={[0.015, 0, 0.014]}
        scale={2.429}
      />
      <instances.SeaGrass5
        name="Sea_Grass001"
        position={[-1.996, 0.252, 4.134]}
        rotation={[0.024, 0.002, -0.04]}
        scale={2.429}
      />
      <instances.SeaKelp
        name="Sea_Kelp004"
        position={[-0.157, 1.816, -2.497]}
        rotation={[0.067, 0.005, 0.145]}
        scale={1.948}
      />
      <instances.SeaKelp
        name="Sea_Kelp005"
        position={[-2.489, 2.06, -1.326]}
        rotation={[-0.001, 0, -0.001]}
        scale={2.156}
      />
      <instances.SeaKelp1
        name="Sea_Kelp006"
        position={[-0.582, 0.634, -1.256]}
        rotation={[0.099, 0, 0.008]}
        scale={0.709}
      />
      <instances.SeaKelp
        name="Sea_Kelp007"
        position={[-2.452, 2.533, 1.096]}
        rotation={[-0.072, 0.002, -0.067]}
        scale={1.76}
      />
      <instances.SeaKelp2
        name="Sea_Kelp008"
        position={[-1.266, 1.745, 0.53]}
        rotation={[-0.212, 0.054, -0.5]}
        scale={1.878}
      />
      <instances.SeaKelp3
        name="Sea_Kelp009"
        position={[-2.428, 1.512, -2.561]}
        rotation={[-0.174, 0.013, -0.15]}
        scale={1.656}
      />
      <instances.SeaKelp3
        name="Sea_Kelp012"
        position={[-3.051, 1.762, 4.715]}
        rotation={[0.089, 0.001, 0.021]}
        scale={1.093}
      />
      <instances.SeaKelp2
        name="Sea_Kelp016"
        position={[-1.679, 1.577, -1.747]}
        rotation={[0.001, 0, 0.003]}
        scale={1.277}
      />
      <instances.SeaKelp3
        name="Sea_Kelp017"
        position={[-2.863, 3.041, -1.388]}
        rotation={[0.035, 0, 0.021]}
        scale={2.273}
      />
      <instances.SeaKelp1
        name="Sea_Kelp018"
        position={[-3.161, 1.926, 3.98]}
        rotation={[-0.009, 0, 0.01]}
        scale={1.658}
      />
      <instances.SeaKelp3
        name="Sea_Kelp021"
        position={[-2.36, 2.258, -1.793]}
        rotation={[0.072, 0, 0.003]}
        scale={1.253}
      />
      <instances.SeaKelp
        name="Sea_Kelp024"
        position={[-2.833, 1.977, 0.654]}
        rotation={[0.015, 0, -0.001]}
        scale={1.776}
      />
      <instances.SeaKelp1
        name="Sea_Kelp026"
        position={[-3.192, 2.84, -0.075]}
        rotation={[0.117, 0.002, 0.031]}
        scale={1.902}
      />
      <instances.SeaKelp2
        name="Sea_Kelp027"
        position={[-2.82, 1.072, 2.222]}
        rotation={[0.072, 0.001, 0.035]}
        scale={0.725}
      />
      <instances.SeaKelp2
        name="Sea_Kelp028"
        position={[-0.277, 2.044, -2.123]}
        rotation={[-0.063, 0.78, -0.006]}
        scale={1.98}
      />
      <instances.SeaKelp2
        name="Sea_Kelp029"
        position={[-2.306, 2.922, -0.414]}
        rotation={[0.029, -0.002, -0.145]}
        scale={1.622}
      />
      <instances.SeaKelp2
        name="Sea_Kelp030"
        position={[-0.805, 2.143, -1.916]}
        rotation={[-0.117, 0.005, -0.081]}
        scale={1.986}
      />
      <instances.SeaKelp1
        name="Sea_Kelp032"
        position={[-3.498, 2.042, 3.577]}
        rotation={[0.005, 0, 0.016]}
        scale={1.851}
      />
      <instances.SeaKelp3
        name="Sea_Kelp037"
        position={[-2.819, 2.616, 2.21]}
        rotation={[-0.07, 0.004, -0.114]}
        scale={1.9}
      />
      <instances.SeaKelp3
        name="Sea_Kelp044"
        position={[-2.503, 1.693, 1.286]}
        rotation={[0.015, 0, -0.005]}
        scale={1.521}
      />
      <instances.SeaKelp3
        name="Sea_Kelp046"
        position={[-2.39, 1.48, 5.032]}
        rotation={[0.25, -0.009, -0.074]}
        scale={0.793}
      />
      <instances.SeaKelp
        name="Sea_Kelp047"
        position={[-1.224, 1.867, -1.045]}
        rotation={[0.012, 0, -0.036]}
        scale={1.58}
      />
      <instances.SeaKelp
        name="Sea_Kelp048"
        position={[-3.392, 3.722, 0.738]}
        rotation={[-0.036, 0.001, -0.068]}
        scale={0.865}
      />
      <instances.SeaKelp1
        name="Sea_Kelp049"
        position={[-1.994, 1.084, 0.214]}
        rotation={[-0.147, 0.029, -0.388]}
        scale={1.109}
      />
      <instances.SeaKelp3
        name="Sea_Kelp052"
        position={[-2.14, 1.839, 4.496]}
        rotation={[0.027, 0, 0.032]}
        scale={1.169}
      />
      <instances.SeaKelp2
        name="Sea_Kelp054"
        position={[-2.748, 1.36, -1.333]}
        rotation={[-0.001, 0, -0.135]}
        scale={0.98}
      />
      <instances.SeaKelp2
        name="Sea_Kelp064"
        position={[-2.72, 1.365, -1.968]}
        rotation={[-0.05, 0, -0.019]}
        scale={1.021}
      />
      <instances.SeaKelp2
        name="Sea_Kelp065"
        position={[-3.141, 1.545, -1.911]}
        rotation={[-0.029, 0, 0.032]}
        scale={1.628}
      />
      <instances.SeaKelp2
        name="Sea_Kelp067"
        position={[-2.565, 2.134, 0.684]}
        rotation={[0.003, 0, 0.001]}
        scale={1.111}
      />
      <instances.SeaKelp
        name="Sea_Kelp070"
        position={[-1.5, 2.763, 3.131]}
        rotation={[-0.048, -0.001, 0.039]}
        scale={2.211}
      />
      <instances.SeaKelp1
        name="Sea_Kelp073"
        position={[-2.205, 2.484, 4.061]}
        rotation={[0.011, 0, 0.001]}
        scale={2.247}
      />
      <instances.SeaKelp1
        name="Sea_Kelp074"
        position={[-1.599, 2.165, -0.639]}
        rotation={[0.242, 0.003, 0.026]}
        scale={1.049}
      />
      <instances.SeaKelp1
        name="Sea_Kelp075"
        position={[-1.485, 1.783, 4.515]}
        rotation={[0.177, 0, 0.005]}
        scale={1.432}
      />
      <instances.SeaKelp
        name="Sea_Kelp078"
        position={[-1.353, 1.861, 3.695]}
        rotation={[-0.015, 0, 0.018]}
        scale={1.147}
      />
      <instances.SeaKelp3
        name="Sea_Kelp080"
        position={[-2.99, 2.216, 1.692]}
        rotation={[0.026, 0, -0.013]}
        scale={2.175}
      />
      <instances.SeaKelp
        name="Sea_Kelp084"
        position={[-3.412, 1.926, 2.958]}
        rotation={[0.011, 0, -0.078]}
        scale={1.096}
      />
      <instances.SeaKelp2
        name="Sea_Kelp085"
        position={[-2.443, 2.912, -1.042]}
        rotation={[-0.084, 0.005, -0.107]}
        scale={2.116}
      />
      <instances.SeaKelp
        name="Sea_Kelp088"
        position={[-2.699, 1.709, -0.332]}
        rotation={[-0.025, -0.002, 0.182]}
        scale={1.766}
      />
      <instances.SeaKelp
        name="Sea_Kelp090"
        position={[-2.048, 0.845, -1.644]}
        rotation={[-0.015, 0, -0.013]}
        scale={0.726}
      />
      <instances.SeaKelp1
        name="Sea_Kelp092"
        position={[-1.866, 2.157, 0.826]}
        rotation={[0.03, 0, 0.03]}
        scale={1.461}
      />
      <instances.SeaKelp3
        name="Sea_Kelp094"
        position={[-2.312, 1.73, -1.981]}
        rotation={[-0.033, -0.001, 0.056]}
        scale={1.169}
      />
      <instances.SeaKelp3
        name="Sea_Kelp095"
        position={[-2.478, 0.795, -2.896]}
        rotation={[-0.195, -0.001, 0.007]}
        scale={0.833}
      />
      <instances.SeaKelp
        name="Sea_Kelp096"
        position={[-1.132, 2.668, 2.818]}
        rotation={[0.046, -0.003, -0.123]}
        scale={2.138}
      />
      <instances.SeaKelp3
        name="Sea_Kelp097"
        position={[-1.712, 0.745, -0.062]}
        rotation={[0.188, -0.019, -0.198]}
        scale={0.777}
      />
      <instances.SeaKelp3
        name="Sea_Kelp098"
        position={[-1.436, 1.556, -1.451]}
        rotation={[-0.055, 0.001, -0.047]}
        scale={1.66}
      />
      <instances.SeaKelp
        name="Sea_Kelp100"
        position={[-1.925, 1.949, -1.447]}
        rotation={[-0.01, 0, -0.003]}
        scale={1.353}
      />
      <instances.SeaKelp2
        name="Sea_Kelp101"
        position={[-1.783, 1.225, -0.7]}
        rotation={[0.027, 0.001, 0.094]}
        scale={1.202}
      />
      <instances.SeaKelp2
        name="Sea_Kelp102"
        position={[-2.488, 1.292, -0.252]}
        rotation={[0.73, 0.009, 0.024]}
        scale={1.155}
      />
      <instances.SeaKelp3
        name="Sea_Kelp104"
        position={[-1.858, 2.676, 3.785]}
        rotation={[0.008, 0, -0.008]}
        scale={2.227}
      />
      <instances.SeaKelp3
        name="Sea_Kelp107"
        position={[-1.27, 1.553, -2.426]}
        rotation={[-0.021, 0, 0.015]}
        scale={1.742}
      />
      <instances.SeaKelp1
        name="Sea_Kelp109"
        position={[-1.312, 2.929, -1.771]}
        rotation={[-0.102, -0.008, 0.163]}
        scale={2.191}
      />
      <instances.SeaKelp
        name="Sea_Kelp112"
        position={[-3.319, 1.525, 1.116]}
        rotation={[-0.002, 0, -0.002]}
        scale={1.243}
      />
      <instances.SeaKelp2
        name="Sea_Kelp115"
        position={[-2.159, 0.94, -0.878]}
        rotation={[-0.001, 0, -0.006]}
        scale={0.868}
      />
      <instances.SeaKelp2
        name="Sea_Kelp116"
        position={[-3.606, 2.611, 0.901]}
        rotation={[-0.015, 0, 0.019]}
        scale={1.929}
      />
      <instances.SeaKelp
        name="Sea_Kelp119"
        position={[-4.092, 2.644, 3.646]}
        rotation={[-0.084, -0.003, 0.067]}
        scale={2.107}
      />
      <instances.SeaKelp1
        name="Sea_Kelp121"
        position={[-1.824, 0.747, -2.177]}
        rotation={[-0.133, -0.001, 0.019]}
        scale={0.86}
      />
      <instances.SeaKelp1
        name="Sea_Kelp122"
        position={[-1.822, 0.785, -2.708]}
        rotation={[0.015, 0.001, 0.073]}
        scale={1.031}
      />
      <instances.SeaKelp3
        name="Sea_Kelp126"
        position={[-0.86, 1.36, -0.622]}
        rotation={[0.095, -0.004, -0.081]}
        scale={1.527}
      />
      <instances.SeaKelp2
        name="Sea_Kelp129"
        position={[2.141, 1.079, 0.483]}
        rotation={[0.277, 0.019, 0.135]}
        scale={0.948}
      />
      <instances.SeaKelp1
        name="Sea_Kelp130"
        position={[1.206, 1.033, 2.298]}
        rotation={[-0.12, -0.003, 0.048]}
        scale={1.156}
      />
      <instances.SeaKelp1
        name="Sea_Kelp131"
        position={[1.896, 0.745, 0.016]}
        rotation={[0.078, 0.008, 0.21]}
        scale={-0.291}
      />
      <instances.SeaKelp3
        name="Sea_Kelp132"
        position={[2.214, 0.988, -0.062]}
        rotation={[0.022, 0, 0.01]}
        scale={0.76}
      />
      <instances.SeaKelp
        name="Sea_Kelp133"
        position={[3.002, 1.753, -0.796]}
        rotation={[0.032, 0.001, 0.046]}
        scale={0.878}
      />
      <instances.SeaKelp1
        name="Sea_Kelp134"
        position={[1.533, 1.458, -0.123]}
        rotation={[-0.116, -0.006, 0.095]}
        scale={0.656}
      />
      <instances.SeaKelp
        name="Sea_Kelp135"
        position={[2.911, 1.067, -1.273]}
        rotation={[-0.011, 0.778, -0.014]}
        scale={0.869}
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
      <instances.SeaKelp
        name="Sea_Kelp140"
        position={[2.063, 1.298, 0.699]}
        rotation={[-0.04, 0, -0.021]}
        scale={1.186}
      />
      <instances.SeaKelp
        name="Sea_Kelp142"
        position={[1.718, 1.38, 0.5]}
        rotation={[0.004, 0, -0.003]}
        scale={1.273}
      />
      <instances.SeaKelp1
        name="Sea_Kelp143"
        position={[4.147, 0.754, -1.047]}
        rotation={[-0.191, 1.075, 0.258]}
        scale={0.658}
      />
      <instances.SeaKelp2
        name="Sea_Kelp144"
        position={[1.065, 1.595, 0.83]}
        rotation={[0.275, -0.002, -0.016]}
        scale={0.58}
      />
      <instances.SeaKelp1
        name="Sea_Kelp145"
        position={[2.402, 0.399, -0.267]}
        rotation={[-0.436, 0.081, -0.361]}
        scale={-0.053}
      />
      <instances.SeaKelp
        name="Sea_Kelp146"
        position={[4.136, 0.49, -1.586]}
        rotation={[0.022, -0.003, -0.31]}
        scale={0.253}
      />
      <instances.SeaKelp3
        name="Sea_Kelp147"
        position={[2.738, 0.964, -1.644]}
        rotation={[0.031, 0, -0.016]}
        scale={1.162}
      />
      <instances.SeaKelp
        name="Sea_Kelp148"
        position={[2.39, 0.92, -1.492]}
        rotation={[-0.127, -0.001, 0.019]}
        scale={1.106}
      />
      <instances.SeaKelp3
        name="Sea_Kelp149"
        position={[1.199, 1.742, 0.396]}
        rotation={[-0.044, 0.001, -0.042]}
        scale={0.776}
      />
      <instances.SeaKelp2
        name="Sea_Kelp150"
        position={[1.249, 0.623, 1.743]}
        rotation={[0.102, -0.004, -0.083]}
        scale={0.023}
      />
      <instances.SeaKelp3
        name="Sea_Kelp151"
        position={[3.915, 1.04, -1.069]}
        rotation={[-0.002, 0, 0]}
        scale={0.902}
      />
      <instances.SeaKelp
        name="Sea_Kelp153"
        position={[2.345, 0.8, -1.424]}
        rotation={[-0.015, 0.001, -0.075]}
        scale={0.98}
      />
      <instances.SeaKelp2
        name="Sea_Kelp154"
        position={[3.39, 0.766, -0.958]}
        rotation={[-0.034, 0.001, -0.03]}
        scale={0.622}
      />
      <instances.SeaKelp1
        name="Sea_Kelp155"
        position={[1.577, 1.71, -0.436]}
        rotation={[-0.095, 0.003, -0.062]}
        scale={0.986}
      />
      <instances.SeaKelp3
        name="Sea_Kelp157"
        position={[3.01, 0.878, -0.855]}
        rotation={[0.394, 0.047, 0.234]}
        scale={0.851}
      />
      <instances.SeaKelp3
        name="Sea_Kelp158"
        position={[0.78, 1.43, 2.623]}
        rotation={[0.002, 0, 0.263]}
        scale={1.297}
      />
      <instances.SeaKelp
        name="Sea_Kelp159"
        position={[3.36, 1.366, -1.373]}
        rotation={[-0.001, 0, -0.007]}
        scale={1.239}
      />
      <instances.SeaPlants
        name="Sea_Plants022"
        position={[-0.669, 0.416, -2.284]}
        rotation={[-0.062, 0.003, -0.083]}
        scale={1.267}
      />
      <instances.SeaPlants1
        name="Sea_Plants033"
        position={[-2.539, 1.138, 0.666]}
        rotation={[-0.084, 0.001, -0.033]}
        scale={0.452}
      />
      <instances.SeaPlants2
        name="Sea_Plants034"
        position={[-1.716, 1.002, 4.238]}
        rotation={[-0.069, 0.002, -0.053]}
        scale={0.901}
      />
      <instances.SeaPlants3
        name="Sea_Plants035"
        position={[-1.209, 1.024, 3.457]}
        rotation={[0.027, -0.001, -0.054]}
        scale={0.622}
      />
      <instances.SeaPlants2
        name="Sea_Plants039"
        position={[-0.383, 0.239, -1.663]}
        rotation={[-0.136, 0.076, -1.017]}
        scale={0.765}
      />
      <instances.SeaPlants4
        name="Sea_Plants043"
        position={[-2.215, 0.236, -2.762]}
        rotation={[-0.077, 0, -0.003]}
        scale={0.795}
      />
      <instances.SeaPlants5
        name="Sea_Plants046"
        position={[-3.025, 0.499, -2.268]}
        rotation={[-0.072, -0.004, 0.125]}
        scale={1.009}
      />
      <instances.SeaPlants
        name="Sea_Plants048"
        position={[-2.413, 0.936, -2.104]}
        rotation={[-0.074, -0.006, 0.167]}
        scale={0.855}
      />
      <instances.SeaPlants6
        name="Sea_Plants052"
        position={[-2.096, 1.363, 1.11]}
        rotation={[-0.01, 0, -0.052]}
        scale={0.399}
      />
      <instances.SeaPlants
        name="Sea_Plants054"
        position={[-2.372, 1.945, -0.557]}
        rotation={[-0.723, 0.321, -0.809]}
        scale={0.652}
      />
      <instances.SeaPlants1
        name="Sea_Plants059"
        position={[-2.16, 0.528, -1.511]}
        rotation={[0, 0, -0.008]}
        scale={1.294}
      />
      <instances.SeaPlants7
        name="Sea_Plants060"
        position={[-3.345, 1.769, 0.623]}
        rotation={[-0.287, 0.005, -0.038]}
        scale={0.652}
      />
      <instances.SeaPlants1
        name="Sea_Plants064"
        position={[-1.488, 0.368, -1.455]}
        rotation={[-0.049, 0.002, -0.065]}
        scale={0.636}
      />
      <instances.SeaPlants8
        name="Sea_Plants068"
        position={[-1.348, 0.984, 2.759]}
        rotation={[0.044, -0.003, -0.119]}
        scale={0.821}
      />
      <instances.SeaPlants1
        name="Sea_Plants069"
        position={[-1.999, 0.508, -0.339]}
        rotation={[-0.127, 0.008, -0.118]}
        scale={1.195}
      />
      <instances.SeaPlants1
        name="Sea_Plants074"
        position={[-3.306, 1.875, 2.453]}
        rotation={[0.005, 0, -0.004]}
        scale={0.926}
      />
      <instances.SeaPlants9
        name="Sea_Plants078"
        position={[-2.851, 2.006, 0.984]}
        rotation={[0.29, 0.02, 0.139]}
        scale={1.155}
      />
      <instances.SeaPlants6
        name="Sea_Plants085"
        position={[-1.74, 0.443, -2.156]}
        rotation={[-0.214, 0.009, -0.085]}
        scale={0.714}
      />
      <instances.SeaPlants10
        name="Sea_Plants086"
        position={[-3.004, 0.927, 4.842]}
        rotation={[0.212, 0.003, 0.03]}
        scale={0.475}
      />
      <instances.SeaPlants4
        name="Sea_Plants092"
        position={[-2.568, 1.191, 3.483]}
        rotation={[0, 0, -0.001]}
        scale={0.822}
      />
      <instances.SeaPlants9
        name="Sea_Plants093"
        position={[-3.162, 1.777, 1.624]}
        rotation={[-0.009, 0, 0.005]}
        scale={0.995}
      />
      <instances.SeaPlants3
        name="Sea_Plants094"
        position={[-2.674, 1.822, 3.072]}
        rotation={[0.248, -0.023, -0.18]}
        scale={1.092}
      />
      <instances.SeaPlants7
        name="Sea_Plants097"
        position={[-2.814, 1.192, 3.839]}
        rotation={[-0.009, 0, 0.01]}
        scale={0.698}
      />
      <instances.SeaPlants9
        name="Sea_Plants105"
        position={[-2.685, 1.746, 2.234]}
        rotation={[-0.001, 0, -0.061]}
        scale={0.86}
      />
      <instances.SeaPlants10
        name="Sea_Plants106"
        position={[-2.523, 1.718, 1.51]}
        rotation={[-0.314, 0.026, -0.161]}
        scale={0.653}
      />
      <instances.SeaPlants2
        name="Sea_Plants111"
        position={[-2.54, 1.695, -1.886]}
        rotation={[-0.046, 0.001, -0.032]}
        scale={1.297}
      />
      <instances.SeaPlants1
        name="Sea_Plants117"
        position={[-2.964, 2.144, -0.108]}
        rotation={[0.015, 0.001, 0.1]}
        scale={0.335}
      />
      <instances.SeaPlants10
        name="Sea_Plants118"
        position={[-1.375, 0.337, -0.431]}
        rotation={[-0.073, -0.003, 0.069]}
        scale={1.177}
      />
      <instances.SeaPlants1
        name="Sea_Plants122"
        position={[-3.552, 2.662, 0.275]}
        rotation={[-0.012, 0, 0.01]}
        scale={0.727}
      />
      <instances.SeaPlants7
        name="Sea_Plants123"
        position={[-3.497, 1.009, 3.356]}
        rotation={[0.007, 0, 0.007]}
        scale={0.757}
      />
      <instances.SeaPlants11
        name="Sea_Plants133"
        position={[-2.137, 2.349, -1.187]}
        rotation={[-0.039, 0, -0.023]}
        scale={1.032}
      />
      <instances.SeaPlants10
        name="Sea_Plants136"
        position={[-1.552, 1.597, -1.798]}
        rotation={[-0.006, 0, 0.022]}
        scale={0.587}
      />
      <instances.SeaPlants1
        name="Sea_Plants137"
        position={[-3.496, 2.847, 1.93]}
        rotation={[0.055, 0, 0.004]}
        scale={0.917}
      />
      <instances.SeaPlants8
        name="Sea_Plants138"
        position={[-1.493, 0.344, -2.897]}
        rotation={[-0.129, -0.003, 0.044]}
        scale={1.103}
      />
      <instances.SeaPlants2
        name="Sea_Plants140"
        position={[-0.998, 0.291, -1.212]}
        rotation={[0.013, 0, 0.001]}
        scale={1.142}
      />
      <instances.SeaPlants12
        name="Sea_Plants141"
        position={[-1.564, 1.858, -0.736]}
        rotation={[0.232, 0.004, 0.035]}
        scale={0.648}
      />
      <instances.SeaPlants4
        name="Sea_Plants146"
        position={[-2.945, 2.709, 2.642]}
        rotation={[0.081, 0.001, 0.017]}
        scale={0.627}
      />
      <instances.SeaPlants9
        name="Sea_Plants147"
        position={[-2.215, 2.352, -1.874]}
        rotation={[-0.587, 0.054, -0.177]}
        scale={0.762}
      />
      <instances.SeaPlants12
        name="Sea_Plants149"
        position={[2.447, 0.863, -0.592]}
        rotation={[0.209, 0.031, 0.292]}
        scale={1.105}
      />
      <instances.SeaPlants8
        name="Sea_Plants150"
        position={[0.675, 0.066, 3.461]}
        rotation={[0.757, 0.622, 1.36]}
        scale={0.363}
      />
      <instances.SeaPlants8
        name="Sea_Plants151"
        position={[3.168, 1.11, -0.618]}
        rotation={[0.377, -0.011, -0.057]}
        scale={0.812}
      />
      <instances.SeaPlants10
        name="Sea_Plants152"
        position={[1.08, 0.788, 3.865]}
        rotation={[-0.03, 0.002, -0.117]}
        scale={0.899}
      />
      <instances.SeaPlants4
        name="Sea_Plants154"
        position={[1.971, 0.954, 0.717]}
        rotation={[0.043, -0.001, -0.065]}
        scale={0.468}
      />
      <instances.SeaPlants2
        name="Sea_Plants155"
        position={[2.439, 0.14, -1.232]}
        rotation={[-0.024, 0.032, -0.02]}
        scale={0.985}
      />
      <instances.SeaPlants3
        name="Sea_Plants156"
        position={[1.049, 0.513, 0.569]}
        rotation={[0.066, 0.001, 0.076]}
        scale={1.267}
      />
      <instances.SeaPlants6
        name="Sea_Plants157"
        position={[1.927, 1.209, -0.083]}
        rotation={[-0.182, 0.003, -0.029]}
        scale={0.9}
      />
      <instances.SeaPlants1
        name="Sea_Plants158"
        position={[2.657, 1.025, 0.45]}
        rotation={[0.028, -0.001, -0.047]}
        scale={1.1}
      />
      <instances.SeaPlants13
        name="Sea_Plants159"
        position={[0.624, 0.286, 2.959]}
        rotation={[0.083, -0.006, -0.147]}
        scale={1.126}
      />
      <instances.SeaPlants1
        name="Sea_Plants160"
        position={[0.722, 0.564, 2.025]}
        rotation={[-0.052, -0.015, 0.556]}
        scale={1.222}
      />
      <instances.SeaPlants11
        name="Sea_Plants162"
        position={[4.245, 0.47, -1.212]}
        rotation={[-0.165, 1.081, 0.164]}
        scale={0.501}
      />
      <instances.SeaPlants14
        name="Sea_Plants163"
        position={[1.604, 0.729, 4.282]}
        rotation={[0.123, -0.023, -0.375]}
        scale={0.754}
      />
      <instances.SeaPlants7
        name="Sea_Plants166"
        position={[4.109, 0.455, -1.42]}
        rotation={[0.036, -0.005, -0.273]}
        scale={0.921}
      />
      <instances.SeaPlants14
        name="Sea_Plants168"
        position={[2.667, 0.439, -1.457]}
        rotation={[-0.273, -0.332, 0.294]}
        scale={0.901}
      />
      <instances.SeaPlants1
        name="Sea_Plants170"
        position={[0.782, 0.975, 1.615]}
        rotation={[-0.274, -0.057, 0.41]}
        scale={0.372}
      />
      <instances.SeaPlants10
        name="Sea_Plants171"
        position={[1.365, 1.03, 0.52]}
        rotation={[0.135, -0.019, -0.273]}
        scale={0.746}
      />
      <instances.SeaWeed
        name="Sea_Weed010"
        position={[-3.37, 2.169, 1.239]}
        rotation={[-0.01, 0.695, 0.036]}
        scale={2.323}
      />
      <instances.SeaWeed1
        name="Sea_Weed012"
        position={[-2.534, 2.477, -0.713]}
        rotation={[-0.126, 0.011, -0.166]}
        scale={1.674}
      />
      <instances.SeaWeed
        name="Sea_Weed014"
        position={[-1.578, 2.08, -1.921]}
        rotation={[-0.061, -0.002, 0.053]}
        scale={2.225}
      />
      <instances.SeaWeed2
        name="Sea_Weed016"
        position={[-1.92, 1.444, 4.343]}
        rotation={[-0.04, 0, 0.022]}
        scale={1.84}
      />
      <instances.SeaWeed1
        name="Sea_Weed017"
        position={[-1.991, 0.471, -0.001]}
        rotation={[-0.035, 0, -0.007]}
        scale={1.904}
      />
      <instances.SeaWeed2
        name="Sea_Weed020"
        position={[-0.218, 0.676, -1.471]}
        rotation={[-0.128, -0.001, 0.04]}
        scale={2.037}
      />
      <instances.SeaWeed1
        name="Sea_Weed022"
        position={[-2.577, 1.494, 4.179]}
        rotation={[Math.PI, -0.895, Math.PI]}
        scale={1.946}
      />
      <instances.SeaWeed1
        name="Sea_Weed025"
        position={[-2.958, 1.319, 4.813]}
        rotation={[0.127, 0.001, 0.014]}
        scale={2.041}
      />
      <instances.SeaWeed1
        name="Sea_Weed027"
        position={[-3.802, 2.116, 3.011]}
        rotation={[3.063, -0.378, 2.983]}
        scale={2.287}
      />
      <instances.SeaWeed1
        name="Sea_Weed029"
        position={[-2.843, 0.776, -2.26]}
        rotation={[-0.074, -0.004, 0.115]}
        scale={2.482}
      />
      <instances.SeaWeed
        name="Sea_Weed031"
        position={[-1.26, 1.098, -2.358]}
        rotation={[-0.046, -0.005, -0.095]}
        scale={1.945}
      />
      <instances.SeaWeed1
        name="Sea_Weed034"
        position={[-4.033, 2.209, -0.047]}
        rotation={[-0.268, -0.047, 0.343]}
        scale={2.364}
      />
      <instances.SeaWeed
        name="Sea_Weed037"
        position={[2.63, 0.739, -0.778]}
        rotation={[0.012, 0, 0.019]}
        scale={1.64}
      />
      <instances.SeaWeed1
        name="Sea_Weed038"
        position={[0.685, 0.409, 3.748]}
        rotation={[-0.02, 0, 0.006]}
        scale={1.657}
      />
      <instances.SeaWeed2
        name="Sea_Weed039"
        position={[1.204, 1.097, 4.088]}
        rotation={[-0.093, 0.004, -0.076]}
        scale={1.525}
      />
      <instances.SeaWeed2
        name="Sea_Weed040"
        position={[1.029, 0.465, 1.06]}
        rotation={[0.019, -0.002, -0.055]}
        scale={1.504}
      />
      <instances.SeaWeed3
        name="Sea_Weed041"
        position={[-1.422, 1.148, -2.741]}
        rotation={[-0.189, -0.008, -0.102]}
        scale={1.961}
      />
      <instances.SeaWeed
        name="Sea_Weed042"
        position={[3.577, 0.827, -1.718]}
        rotation={[-0.072, -0.001, 0.019]}
        scale={1.917}
      />
      <instances.SeaWeed1
        name="Sea_Weed043"
        position={[-1.496, 0.375, 4.64]}
        rotation={[-0.012, -0.014, 0.084]}
        scale={2.323}
      />
      <instances.SeaWeed
        name="Sea_Weed044"
        position={[2.349, 1.249, 0.46]}
        rotation={[-0.193, -0.016, 0.166]}
        scale={1.956}
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
      <instances.SoftCrustations2
        name="Soft_Crustations026"
        position={[-3.182, 3.027, 2.034]}
        rotation={[-1.096, 0.505, -0.8]}
        scale={1.141}
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
      <instances.SoftCrustations3
        name="Soft_Crustations036"
        position={[-0.396, 0.079, -1.891]}
        rotation={[-0.25, 0.226, -1.471]}
        scale={1.052}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations045"
        position={[-1.481, 0.885, -0.863]}
        rotation={[0.127, -0.008, -0.124]}
        scale={1.159}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations049"
        position={[-1.094, 0.182, -2.588]}
        rotation={[-0.073, 0, 0.009]}
        scale={0.411}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations050"
        position={[-3.694, 3.03, 0.801]}
        rotation={[-0.23, 0.001, -0.009]}
        scale={0.434}
      />
      <instances.SoftCrustations5
        name="Soft_Crustations053"
        position={[-2.911, 1.965, 2.288]}
        rotation={[0.184, -0.189, -1.596]}
        scale={0.604}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations057"
        position={[-3.09, 3.085, 0.555]}
        rotation={[0.077, 0.002, 0.049]}
        scale={0.807}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations062"
        position={[-2.5, 0.968, 4.877]}
        rotation={[0.191, -0.005, -0.049]}
        scale={1.21}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations063"
        position={[-2.268, 1.132, 2.551]}
        rotation={[-0.111, 0.003, -0.059]}
        scale={0.766}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations066"
        position={[-3.315, 3.066, 0.162]}
        rotation={[-0.006, 0, -0.033]}
        scale={0.961}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations073"
        position={[-2.014, 0.506, 1.106]}
        rotation={[0.002, 0, -0.2]}
        scale={0.527}
      />
      <instances.SoftCrustations7
        name="Soft_Crustations074"
        position={[-2.328, 0.532, 1.664]}
        rotation={[-0.114, -0.001, 0.019]}
        scale={0.703}
      />
      <instances.SoftCrustations7
        name="Soft_Crustations080"
        position={[-2.343, 1.1, 4.152]}
        rotation={[-0.027, 0, 0.002]}
        scale={0.56}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations083"
        position={[-2.112, 0.518, 0.491]}
        rotation={[-0.121, 0.018, -0.291]}
        scale={1.176}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations084"
        position={[-2.713, 1.078, 2.046]}
        rotation={[-0.052, 0, -0.013]}
        scale={1.172}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations087"
        position={[-2.39, 0.921, 2.405]}
        rotation={[0.001, 0, -0.017]}
        scale={0.662}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations088"
        position={[-1.88, 0.234, -2.655]}
        rotation={[-0.025, 0, 0.029]}
        scale={1.222}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations092"
        position={[-1.162, 0.553, -0.626]}
        rotation={[0.257, -0.04, -0.31]}
        scale={0.513}
      />
      <instances.SoftCrustations5
        name="Soft_Crustations093"
        position={[-1.631, 0.95, 4.499]}
        rotation={[0.002, 0, -0.183]}
        scale={0.537}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations094"
        position={[-1.603, 0.951, 3.915]}
        rotation={[-0.041, -0.001, 0.053]}
        scale={0.798}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations096"
        position={[-1.673, 1.547, -1.735]}
        rotation={[-0.005, 0, 0.005]}
        scale={0.388}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations098"
        position={[-2.893, 1.419, 2.289]}
        rotation={[0.032, -0.045, -1.924]}
        scale={0.36}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations103"
        position={[-1.926, 0.615, -1.414]}
        rotation={[-0.006, 0, -0.001]}
        scale={1.003}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations106"
        position={[-1.503, 0.993, 2.342]}
        rotation={[-0.03, 0.002, -0.117]}
        scale={1.224}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations107"
        position={[-2.01, 1.231, 0.753]}
        rotation={[-0.022, 0, 0.041]}
        scale={0.37}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations110"
        position={[-3.109, 1.754, 3.248]}
        rotation={[0.367, 0.015, 0.08]}
        scale={1.179}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations111"
        position={[-2.213, 1.132, 3.637]}
        rotation={[-0.004, 0, -0.003]}
        scale={1.09}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations112"
        position={[-3.006, 1.756, 2.738]}
        rotation={[-0.046, 0, -0.016]}
        scale={1.08}
      />
      <instances.SoftCrustations
        name="Soft_Crustations114"
        position={[-1.909, 0.909, 3.308]}
        rotation={[-0.005, 0, -0.004]}
        scale={0.342}
      />
      <instances.SoftCrustations
        name="Soft_Crustations117"
        position={[-1.901, 0.919, 2.333]}
        rotation={[-0.076, -0.001, 0.023]}
        scale={0.589}
      />
      <instances.SoftCrustations
        name="Soft_Crustations118"
        position={[-1.794, 1.193, 0.188]}
        rotation={[-0.049, 0.011, -0.439]}
        scale={0.458}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations119"
        position={[-2.362, 0.615, -1.403]}
        rotation={[-0.007, 0, 0.009]}
        scale={1.053}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations138"
        position={[-2.758, 1.097, 1.416]}
        rotation={[0.033, 0.001, 0.063]}
        scale={0.663}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations145"
        position={[-2.34, 1.307, 0.39]}
        rotation={[-0.013, 0, -0.006]}
        scale={0.99}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations149"
        position={[-3.069, 0.298, -2.324]}
        rotation={[-0.252, -0.012, 0.098]}
        scale={1.256}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations151"
        position={[-2.063, 0.315, -1.681]}
        rotation={[-0.019, 0, -0.018]}
        scale={1.085}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations152"
        position={[-2.098, 0.288, -0.214]}
        rotation={[-0.06, 0.006, -0.202]}
        scale={0.307}
      />
      <instances.SoftCrustations7
        name="Soft_Crustations154"
        position={[-2.315, 0.254, -2.097]}
        rotation={[-0.07, 0.001, -0.03]}
        scale={0.545}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations159"
        position={[-1.663, 0.286, -0.598]}
        rotation={[0.17, 0.002, 0.028]}
        scale={0.863}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations160"
        position={[-3.122, 1.159, 4.211]}
        rotation={[-0.054, -0.001, 0.028]}
        scale={0.775}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations165"
        position={[-1.623, 0.266, -1.559]}
        rotation={[-0.029, 0, -0.034]}
        scale={0.874}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations166"
        position={[-3.337, 1.122, 3.718]}
        rotation={[-0.019, 0, 0.002]}
        scale={0.42}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations168"
        position={[-2.577, 0.621, 1.06]}
        rotation={[1.654, 0.302, 0.279]}
        scale={1.266}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations169"
        position={[-2.921, 2.664, 2.196]}
        rotation={[0.001, 0, 0.045]}
        scale={0.603}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations170"
        position={[-2.751, 1.754, 1.121]}
        rotation={[0.157, -0.016, -0.201]}
        scale={0.901}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations172"
        position={[-1.849, 0.321, -2.036]}
        rotation={[-0.05, -0.001, 0.045]}
        scale={1.299}
      />
      <instances.SoftCrustations
        name="Soft_Crustations174"
        position={[-2.216, 1.941, 0.724]}
        rotation={[-0.04, 0.004, -0.177]}
        scale={0.944}
      />
      <instances.SoftCrustations
        name="Soft_Crustations176"
        position={[-2.793, 0.169, -2.665]}
        rotation={[-0.445, -0.09, 0.394]}
        scale={0.657}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations178"
        position={[-2.451, 1.944, 0.101]}
        rotation={[0.028, -0.001, -0.066]}
        scale={1.044}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations181"
        position={[-2.327, 0.166, -2.724]}
        rotation={[-0.079, 0.001, -0.021]}
        scale={0.388}
      />
      <instances.SoftCrustations
        name="Soft_Crustations185"
        position={[-2.394, 1.253, -1.462]}
        rotation={[0.021, 0, -0.013]}
        scale={0.705}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations186"
        position={[-1.348, 0.21, -2.174]}
        rotation={[0.003, 0, 0.004]}
        scale={0.691}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations189"
        position={[-2.344, 1.371, -1.845]}
        rotation={[0.012, 0, -0.017]}
        scale={1.293}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations191"
        position={[-2.214, 1.304, -0.926]}
        rotation={[0.055, 0, -0.008]}
        scale={1.187}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations192"
        position={[-1.892, 1.15, 2.914]}
        rotation={[0.027, -0.001, -0.044]}
        scale={0.777}
      />
      <instances.SoftCrustations5
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
        name="Soft_Crustations202"
        position={[-2.831, 2.174, -1.737]}
        rotation={[0.051, -0.001, -0.053]}
        scale={1.136}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations204"
        position={[-3.223, 3.574, 2.28]}
        rotation={[0.173, -0.022, -0.253]}
        scale={0.755}
      />
      <instances.SoftCrustations7
        name="Soft_Crustations205"
        position={[-3.447, 2.596, 0.891]}
        rotation={[-0.036, -0.001, 0.032]}
        scale={0.431}
      />
      <instances.SoftCrustations
        name="Soft_Crustations207"
        position={[1.804, 0.414, -0.282]}
        rotation={[0.019, 0.002, 0.166]}
        scale={0.523}
      />
      <instances.SoftCrustations2
        name="Soft_Crustations208"
        position={[2.289, 0.399, -0.878]}
        rotation={[-0.169, -0.002, 0.022]}
        scale={0.567}
      />
      <instances.SoftCrustations4
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
        name="Soft_Crustations213"
        position={[4.169, 0.37, -1.09]}
        rotation={[-0.209, 1.074, 0.254]}
        scale={0.76}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations215"
        position={[2.067, 0.665, -0.633]}
        rotation={[-0.152, 0.008, -0.101]}
        scale={1.153}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations216"
        position={[2.929, 0.05, -1.622]}
        rotation={[0.01, 0, 0.001]}
        scale={0.574}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations217"
        position={[2.497, 0.873, -0.299]}
        rotation={[0.433, 0.28, 1.139]}
        scale={1.016}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations219"
        position={[1.427, 1.187, -0.103]}
        rotation={[-0.004, 0, 0.005]}
        scale={0.957}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations220"
        position={[3.722, 0.392, -1.682]}
        rotation={[0.031, 0, 0.02]}
        scale={0.606}
      />
      <instances.SoftCrustations1
        name="Soft_Crustations221"
        position={[3.054, 0.769, -1.263]}
        rotation={[-0.599, -0.632, 1.629]}
        scale={0.428}
      />
      <instances.SoftCrustations
        name="Soft_Crustations222"
        position={[0.589, 0.738, 3.121]}
        rotation={[-0.428, -0.42, 1.553]}
        scale={0.998}
      />
      <instances.SoftCrustations7
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
      <instances.SoftCrustations2
        name="Soft_Crustations226"
        position={[1.895, 0.42, -0.877]}
        rotation={[-1.467, -0.038, 0.042]}
        scale={0.846}
      />
      <instances.SoftCrustations3
        name="Soft_Crustations229"
        position={[1.012, 0.083, 0.457]}
        rotation={[0.092, 0, 0.019]}
        scale={0.866}
      />
      <instances.SoftCrustations6
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
      <instances.SoftCrustations5
        name="Soft_Crustations237"
        position={[0.675, 0.538, 1.78]}
        rotation={[-1.127, 0.02, 1.819]}
        scale={1.129}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations243"
        position={[2.121, 0.1, -1.062]}
        rotation={[0.132, 0.004, -0.015]}
        scale={1.159}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations245"
        position={[0.598, 0.09, 2.512]}
        rotation={[0.066, -0.001, -0.034]}
        scale={1.134}
      />
      <instances.SoftCrustations6
        name="Soft_Crustations246"
        position={[1.267, 1.174, -0.429]}
        rotation={[0.132, -0.022, -0.015]}
        scale={1.069}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations248"
        position={[3.469, 0.68, -1.409]}
        rotation={[-1.321, 0.171, -0.219]}
        scale={0.434}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations249"
        position={[1.596, 1.338, 1.689]}
        rotation={[0.057, 0, -0.005]}
        scale={1.289}
      />
      <instances.SoftCrustations4
        name="Soft_Crustations251"
        position={[0.985, 1.16, -0.174]}
        rotation={[-0.038, 0, -0.001]}
        scale={0.604}
      />
      <instances.SuckerPlants
        name="Sucker_Plants008"
        position={[-2.444, 1.118, 1.506]}
        rotation={[0.142, -0.015, -0.209]}
        scale={0.457}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants017"
        position={[-2.22, 0.747, -2.776]}
        rotation={[-0.565, -0.024, 0.081]}
        scale={1.025}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants023"
        position={[-2.203, 1.539, 0.841]}
        rotation={[1.032, -0.48, -0.814]}
        scale={0.837}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants024"
        position={[-2.165, 1.17, 2.738]}
        rotation={[3.141, 0.81, -3.13]}
        scale={0.96}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants032"
        position={[-2.563, 1.283, 2.931]}
        rotation={[0.004, 0, 0.002]}
        scale={1.282}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants051"
        position={[-1.68, 0.972, 4.122]}
        rotation={[-0.04, 0, 0.022]}
        scale={1.014}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants052"
        position={[-1.152, 1.14, 3.267]}
        rotation={[-0.042, 0.002, -0.08]}
        scale={1.214}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants054"
        position={[-2.466, 1.284, -0.156]}
        rotation={[0.036, 0, -0.013]}
        scale={0.743}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants056"
        position={[-2.418, 1.59, -1.135]}
        rotation={[0.057, 0.002, 0.072]}
        scale={0.923}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants057"
        position={[-2.582, 1.618, -2.064]}
        rotation={[-0.381, -0.027, 0.139]}
        scale={0.884}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants060"
        position={[-1.48, 0.988, 3.602]}
        rotation={[0.028, 0, 0.012]}
        scale={0.513}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants062"
        position={[-1.813, 0.96, 3.34]}
        rotation={[-0.005, 0, 0.003]}
        scale={0.756}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants066"
        position={[-1.277, 0.962, 2.584]}
        rotation={[0.02, -0.002, -0.195]}
        scale={1.07}
      />
      <instances.SuckerPlants
        name="Sucker_Plants069"
        position={[-1.926, 1.687, -1.27]}
        rotation={[-0.001, 0, 0.002]}
        scale={1.214}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants073"
        position={[-2.121, 0.377, -1.696]}
        rotation={[-0.015, 0, -0.017]}
        scale={0.793}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants077"
        position={[-2.103, 1.115, 3.825]}
        rotation={[-0.008, 0, -0.007]}
        scale={0.952}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants078"
        position={[-2.519, 0.308, -1.934]}
        rotation={[-0.008, 0, -0.016]}
        scale={0.853}
      />
      <instances.SuckerPlants
        name="Sucker_Plants081"
        position={[-2.307, 1.604, -1.554]}
        rotation={[-0.021, 0, 0.002]}
        scale={0.607}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants084"
        position={[-1.684, 0.933, 3.013]}
        rotation={[0.021, 0, -0.03]}
        scale={0.67}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants085"
        position={[-2.796, 1.978, 0.733]}
        rotation={[0.037, 0.001, 0.048]}
        scale={0.964}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants088"
        position={[-1.642, 1.582, -1.594]}
        rotation={[0, 0, 0.002]}
        scale={0.911}
      />
      <instances.SuckerPlants
        name="Sucker_Plants090"
        position={[-2.697, 1.015, 4.534]}
        rotation={[0.029, 0, 0.015]}
        scale={0.828}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants091"
        position={[-1.51, 1.608, -1.993]}
        rotation={[-0.061, -0.002, 0.053]}
        scale={1.038}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants093"
        position={[-2.633, 1.291, -1.141]}
        rotation={[0.005, 0, 0.004]}
        scale={0.955}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants094"
        position={[-1.349, 1.567, -1.321]}
        rotation={[0.036, -0.001, -0.037]}
        scale={0.662}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants099"
        position={[-2.036, 1.32, -1.081]}
        rotation={[0.04, 0, 0.021]}
        scale={0.493}
      />
      <instances.SuckerPlants
        name="Sucker_Plants101"
        position={[-2.431, 1.778, -0.365]}
        rotation={[0.034, -0.004, -0.239]}
        scale={1.232}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants102"
        position={[-1.134, 1.765, -1.819]}
        rotation={[-0.284, -0.017, 0.119]}
        scale={1.049}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants107"
        position={[-2.008, 1.296, -1.617]}
        rotation={[0.01, 0.001, 0.126]}
        scale={0.458}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants109"
        position={[-2.529, 2.096, -0.241]}
        rotation={[-0.085, 0.002, -0.039]}
        scale={0.366}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants112"
        position={[-2.816, 1.94, 0.371]}
        rotation={[-0.033, 0, 0.018]}
        scale={0.549}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants116"
        position={[-2.08, 1.921, 0.465]}
        rotation={[-0.108, 0.025, -0.463]}
        scale={0.447}
      />
      <instances.SuckerPlants
        name="Sucker_Plants119"
        position={[-2.664, 2.181, -0.683]}
        rotation={[-0.126, 0.011, -0.166]}
        scale={0.366}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants121"
        position={[-2.03, 1.564, -1.923]}
        rotation={[0.042, -0.001, -0.028]}
        scale={0.65}
      />
      <instances.SuckerPlants
        name="Sucker_Plants122"
        position={[-2.305, 1.979, 0.852]}
        rotation={[0.017, 0, -0.019]}
        scale={0.591}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants126"
        position={[-2.278, 2.151, -1.579]}
        rotation={[0.013, 0, -0.008]}
        scale={0.302}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants128"
        position={[-2.292, 1.255, -1.341]}
        rotation={[0.071, 0, -0.002]}
        scale={1.047}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants132"
        position={[-3.104, 2.063, 2.517]}
        rotation={[1.293, -0.478, -0.624]}
        scale={0.862}
      />
      <instances.SuckerPlants
        name="Sucker_Plants141"
        position={[-1.604, 0.198, -0.663]}
        rotation={[0.012, 0, 0.013]}
        scale={0.325}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants142"
        position={[-2.887, 2.413, -1.367]}
        rotation={[-0.05, -0.001, 0.026]}
        scale={0.813}
      />
      <instances.SuckerPlants
        name="Sucker_Plants143"
        position={[-2.241, 1.877, -1.06]}
        rotation={[0.845, -0.554, -1.128]}
        scale={0.636}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants144"
        position={[-2.504, 2.417, -1.364]}
        rotation={[0.001, 0, 0.014]}
        scale={1.026}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants145"
        position={[-2.135, 2.382, -1.04]}
        rotation={[0.029, 0, -0.028]}
        scale={0.667}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants146"
        position={[-1.593, 0.176, -1.933]}
        rotation={[-0.001, 0, 0.001]}
        scale={0.315}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants151"
        position={[-1.062, 0.209, -1.101]}
        rotation={[-0.017, 0, -0.003]}
        scale={0.622}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants155"
        position={[-2.192, 1.198, 3.053]}
        rotation={[0.005, 0, -0.002]}
        scale={1.217}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants156"
        position={[-0.656, 0.278, -1.437]}
        rotation={[-0.017, -0.001, 0.121]}
        scale={1.144}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants159"
        position={[-0.846, 0.196, -0.688]}
        rotation={[0.168, -0.01, -0.123]}
        scale={0.359}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants161"
        position={[-3.262, 1.064, 3.073]}
        rotation={[0.115, -0.006, -0.108]}
        scale={0.798}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants165"
        position={[-2.538, 1.177, 2.565]}
        rotation={[-0.013, 0, 0.028]}
        scale={0.425}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants171"
        position={[-1.156, 0.209, -0.33]}
        rotation={[0.06, -0.004, -0.121]}
        scale={0.35}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants174"
        position={[-2.854, 1.149, 2.905]}
        rotation={[0.087, 0.003, 0.061]}
        scale={1.084}
      />
      <instances.SuckerPlants
        name="Sucker_Plants180"
        position={[-2.567, 0.487, -1.461]}
        rotation={[0.151, 0.042, 0.542]}
        scale={0.565}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants183"
        position={[-1.188, 0.264, -2.265]}
        rotation={[-0.002, 0, 0.001]}
        scale={0.535}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants190"
        position={[-1.194, 0.26, -2.67]}
        rotation={[-0.047, 0.002, -0.076]}
        scale={0.635}
      />
      <instances.SuckerPlants
        name="Sucker_Plants192"
        position={[-3.392, 1.786, 2.893]}
        rotation={[0.304, 0.001, 0.006]}
        scale={1.035}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants193"
        position={[-3.111, 1.722, 1.854]}
        rotation={[0.002, 0, 0.01]}
        scale={0.785}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants194"
        position={[-3.032, 1.679, 1.312]}
        rotation={[-0.278, 0.015, -0.108]}
        scale={0.712}
      />
      <instances.SuckerPlants
        name="Sucker_Plants199"
        position={[-2.519, 1.787, 2.873]}
        rotation={[0.243, -0.008, -0.069]}
        scale={0.868}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants206"
        position={[-3.28, 2.527, 0.398]}
        rotation={[0.068, 0, -0.012]}
        scale={0.376}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants209"
        position={[-1.939, 0.247, -2.218]}
        rotation={[-0.026, 0, 0.002]}
        scale={1.297}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants210"
        position={[-2.542, 1.8, 1.627]}
        rotation={[-0.125, 0.004, -0.064]}
        scale={0.71}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants211"
        position={[-2.323, 1.374, 1.031]}
        rotation={[0.009, 0, 0.017]}
        scale={0.732}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants212"
        position={[-2.883, 1.808, 3.109]}
        rotation={[0.073, -0.005, -0.129]}
        scale={0.662}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants213"
        position={[-2.158, 0.202, -2.834]}
        rotation={[-0.14, 0, 0.005]}
        scale={0.406}
      />
      <instances.SuckerPlants
        name="Sucker_Plants217"
        position={[-2.782, 1.772, 1.97]}
        rotation={[0.033, 0, -0.011]}
        scale={0.747}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants231"
        position={[-3.633, 3.033, 0.474]}
        rotation={[0.001, 0, -0.002]}
        scale={0.466}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants233"
        position={[-2.062, 0.618, -0.865]}
        rotation={[0.005, 0, -0.022]}
        scale={0.906}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants243"
        position={[-3.311, 3.06, 0.924]}
        rotation={[0.133, -0.017, -0.257]}
        scale={1.128}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants244"
        position={[-2.432, 0.582, -0.995]}
        rotation={[-0.02, 0, 0.003]}
        scale={0.473}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants245"
        position={[-2.755, 2.762, 2.141]}
        rotation={[-0.062, 0.003, -0.087]}
        scale={0.626}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants251"
        position={[-3.456, 2.756, 2.824]}
        rotation={[-0.095, -0.017, 0.346]}
        scale={1.286}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants254"
        position={[-3.15, 2.817, 2.387]}
        rotation={[0.007, 0, -0.006]}
        scale={0.911}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants260"
        position={[-2.165, 0.519, 1.287]}
        rotation={[0.065, 0, -0.001]}
        scale={0.737}
      />
      <instances.SuckerPlants
        name="Sucker_Plants261"
        position={[-3.082, 2.124, 0.169]}
        rotation={[-0.97, 0.681, -1.184]}
        scale={0.97}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants262"
        position={[-2.184, 0.532, 1.698]}
        rotation={[-0.068, 0.003, -0.074]}
        scale={0.461}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants265"
        position={[-1.39, 0.168, -1.607]}
        rotation={[-0.064, 0, -0.001]}
        scale={0.675}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants267"
        position={[-1.68, 0.583, -0.818]}
        rotation={[0.003, 0, 0.027]}
        scale={0.494}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants270"
        position={[-2.142, 0.534, 0.389]}
        rotation={[-0.094, 0.016, -0.334]}
        scale={1.241}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants271"
        position={[-0.802, 0.658, -1.469]}
        rotation={[0.071, -0.002, -0.054]}
        scale={1.165}
      />
      <instances.SuckerPlants
        name="Sucker_Plants272"
        position={[-3.26, 3.309, 0.437]}
        rotation={[-0.018, -0.001, 0.081]}
        scale={0.554}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants273"
        position={[-2.604, 0.68, 1.504]}
        rotation={[0.014, 0, -0.004]}
        scale={1.115}
      />
      <instances.SuckerPlants
        name="Sucker_Plants274"
        position={[-1.141, 0.68, -2.142]}
        rotation={[0.019, 0, -0.125]}
        scale={1.052}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants277"
        position={[-3.363, 2.984, 2.439]}
        rotation={[-0.121, 0.004, -0.069]}
        scale={0.482}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants280"
        position={[-3.653, 3.868, 0.429]}
        rotation={[-0.025, -0.001, 0.044]}
        scale={0.997}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants281"
        position={[-3.239, 2.967, 2.054]}
        rotation={[-0.043, 0, 0.007]}
        scale={0.3}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants282"
        position={[-1.253, 0.613, -1.854]}
        rotation={[-0.004, 0, 0.011]}
        scale={0.889}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants286"
        position={[-2.315, 1.726, 0.247]}
        rotation={[-1.211, 0.27, -0.388]}
        scale={1.215}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants287"
        position={[-3.382, 3.546, 2.161]}
        rotation={[0.354, -0.053, -0.293]}
        scale={0.405}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants294"
        position={[-1.714, 0.591, -1.511]}
        rotation={[0.002, 0, -0.002]}
        scale={0.673}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants296"
        position={[-3.425, 1.26, 3.473]}
        rotation={[0.018, 0, 0.005]}
        scale={1.114}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants297"
        position={[-1.886, 0.59, -1.823]}
        rotation={[0, 0, -0.002]}
        scale={0.744}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants302"
        position={[-1.737, 1.038, -2.1]}
        rotation={[-0.736, 0.496, -1.163]}
        scale={0.545}
      />
      <instances.SuckerPlants
        name="Sucker_Plants303"
        position={[-2.878, 0.949, 3.526]}
        rotation={[-0.006, 0, -0.001]}
        scale={0.405}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants304"
        position={[-2.472, 0.976, -1.897]}
        rotation={[-0.085, -0.003, 0.078]}
        scale={1.035}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants308"
        position={[-1.975, 0.905, -1.157]}
        rotation={[0.021, 0, -0.019]}
        scale={1.105}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants322"
        position={[-2.265, 0.818, -2.245]}
        rotation={[-0.111, -0.01, 0.176]}
        scale={0.37}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants324"
        position={[2.69, 0.356, -0.822]}
        rotation={[0.012, 0, 0.019]}
        scale={0.44}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants327"
        position={[1.713, 0.94, 0.449]}
        rotation={[0.017, 0, 0.001]}
        scale={0.304}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants330"
        position={[2.573, 0.05, -1.385]}
        rotation={[0.02, -0.008, -0.042]}
        scale={1.123}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants331"
        position={[1.467, 1.304, 1.558]}
        rotation={[0.027, 0.001, 0.053]}
        scale={0.756}
      />
      <instances.SuckerPlants
        name="Sucker_Plants334"
        position={[1.713, 0.614, -0.292]}
        rotation={[0.003, 0.01, -0.069]}
        scale={1.025}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants337"
        position={[2.827, 0.381, -1.489]}
        rotation={[-0.206, -0.001, 0.011]}
        scale={0.704}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants340"
        position={[1.939, 1.005, -0.033]}
        rotation={[-0.031, 0, 0.024]}
        scale={0.837}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants341"
        position={[4.189, 0.381, -1.339]}
        rotation={[-0.316, 1.064, 0.307]}
        scale={0.96}
      />
      <instances.SuckerPlants
        name="Sucker_Plants342"
        position={[0.845, 1.01, 2.187]}
        rotation={[0.296, -0.019, -0.127]}
        scale={0.746}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants343"
        position={[3.619, 0.533, -1.784]}
        rotation={[-0.072, -0.001, 0.019]}
        scale={0.962}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants344"
        position={[3.964, 0.592, -1.651]}
        rotation={[0, 0, -0.146]}
        scale={1.005}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants345"
        position={[1.021, 1.178, -0.27]}
        rotation={[-0.111, -0.003, 0.049]}
        scale={0.841}
      />
      <instances.SuckerPlants4
        name="Sucker_Plants346"
        position={[2.63, 1.083, -0.439]}
        rotation={[0.038, 0, -0.195]}
        scale={1.116}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants348"
        position={[0.794, 0.406, 1.397]}
        rotation={[-1.099, -0.547, 0.858]}
        scale={0.902}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants349"
        position={[1.236, 0.728, -0.424]}
        rotation={[-1.445, 0.064, -0.073]}
        scale={1.282}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants350"
        position={[1.079, 0.927, 1.441]}
        rotation={[0.05, 0.001, 0.02]}
        scale={0.41}
      />
      <instances.SuckerPlants2
        name="Sucker_Plants351"
        position={[3.956, 0.467, -1.264]}
        rotation={[0.004, 0, -0.001]}
        scale={0.745}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants352"
        position={[1.739, 1.174, -0.352]}
        rotation={[-0.131, 0.003, -0.049]}
        scale={0.891}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants355"
        position={[1.181, 0.729, 4.102]}
        rotation={[-0.093, 0.004, -0.076]}
        scale={0.679}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants358"
        position={[1.892, 0.425, -0.31]}
        rotation={[0.016, 0, -0.006]}
        scale={0.431}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants359"
        position={[3.323, 1.256, -0.792]}
        rotation={[0.047, 0, -0.012]}
        scale={1.259}
      />
      <instances.SuckerPlants
        name="Sucker_Plants361"
        position={[3.705, 1.09, -0.899]}
        rotation={[0.062, 0.003, 0.082]}
        scale={0.472}
      />
      <instances.SuckerPlants6
        name="Sucker_Plants363"
        position={[3.374, 1.072, -1.17]}
        rotation={[0.078, 0.002, 0.06]}
        scale={0.594}
      />
      <instances.SuckerPlants3
        name="Sucker_Plants364"
        position={[1.227, 0.362, 0.761]}
        rotation={[0.095, 0.011, 0.028]}
        scale={0.693}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants365"
        position={[2.461, 0.386, -1.029]}
        rotation={[-0.756, 0.117, 0.432]}
        scale={0.437}
      />
      <instances.SuckerPlants
        name="Sucker_Plants369"
        position={[0.715, 0.6, 2.33]}
        rotation={[-0.019, 0.012, 0.004]}
        scale={0.976}
      />
      <instances.SuckerPlants5
        name="Sucker_Plants371"
        position={[1.201, 0.775, 0.822]}
        rotation={[-0.128, -0.102, 0.283]}
        scale={0.743}
      />
      <instances.SuckerPlants1
        name="Sucker_Plants372"
        position={[1.091, 0.694, 2.823]}
        rotation={[0.128, -0.013, -0.201]}
        scale={0.907}
      />
      <instances.TubePlants
        name="Tube_Plants023"
        position={[-1.95, 1.365, 0.958]}
        rotation={[0.05, -0.003, -0.123]}
        scale={1.244}
      />
      <instances.TubePlants1
        name="Tube_Plants030"
        position={[-0.983, 0.688, -0.962]}
        rotation={[0.006, 0.882, -0.039]}
        scale={1.674}
      />
      <instances.TubePlants2
        name="Tube_Plants036"
        position={[-2.514, 1.818, 2.867]}
        rotation={[0.243, -0.008, -0.069]}
        scale={2.034}
      />
      <instances.TubePlants3
        name="Tube_Plants039"
        position={[-2.142, 0.789, -1.64]}
        rotation={[-0.015, 0, -0.017]}
        scale={2.16}
      />
      <instances.TubePlants3
        name="Tube_Plants041"
        position={[-3.166, 1.628, 3.687]}
        rotation={[0.127, 0.001, 0.014]}
        scale={2.162}
      />
      <instances.TubePlants4
        name="Tube_Plants043"
        position={[2.668, 0.392, -0.856]}
        rotation={[0.012, 0, 0.019]}
        scale={1.64}
      />
      <instances.TubePlants5
        name="Tube_Plants044"
        position={[3.609, 0.403, -1.771]}
        rotation={[-0.072, -0.001, 0.019]}
        scale={1.657}
      />
      <instances.TubePlants6
        name="Tube_Plants045"
        position={[3.556, 0.203, -1.963]}
        rotation={[-0.158, -0.008, 0.103]}
        scale={1.525}
      />
      <instances.TubePlants1
        name="Tube_Plants046"
        position={[1.231, 0.829, 4.049]}
        rotation={[-0.093, 0.004, -0.076]}
        scale={1.504}
      />
      <instances.TubePlants7
        name="Tube_Plants047"
        position={[2.476, 0.842, 0.446]}
        rotation={[-0.193, -0.016, 0.166]}
        scale={1.961}
      />
      <instances.TubePlants6
        name="Tube_Plants049"
        position={[0.864, 1.198, 2.293]}
        rotation={[0.296, -0.019, -0.127]}
        scale={2.323}
      />
    </group>
  );
}

useGLTF.preload("/reef_light.glb");
useLoader.preload(TextureLoader, "/sand_diffuse.jpg");
useLoader.preload(TextureLoader, "/sand_roughness.jpg");
useLoader.preload(TextureLoader, "/sand_normal.jpg");
