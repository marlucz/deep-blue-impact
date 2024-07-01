import { useGLTF } from "@react-three/drei";
import {
  CatmullRomCurve3,
  Group,
  InstancedMesh,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  ShaderMaterial,
  Vector3,
} from "three";
import { memo, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import ThreeCustomShaderMaterial from "three-custom-shader-material";

const swimVertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uTotalLength;

    float getWave(float z) {
      float currX = mod(z - (uTime * 4.), 3.1415926535 * 2.);
      return sin(currX) * 0.00015 * pow((z / uTotalLength), 2.);
    }

    void main() {
      vec3 pos = (vec4(position, 1.0) * instanceMatrix).xyz;
      csm_PositionRaw = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    }
  `;

interface FishesImplProps {
  range: number;
}

const getRandomPointInEllipsoid = (
  radiusX: number,
  radiusY: number,
  radiusZ: number
) => {
  let x, y, z;
  do {
    x = (Math.random() * 2 - 1) * radiusX;
    y = (Math.random() * 2 - 1) * radiusY;
    z = (Math.random() * 2 - 1) * radiusZ;
  } while (
    (x * x) / (radiusX * radiusX) +
      (y * y) / (radiusY * radiusY) +
      (z * z) / (radiusZ * radiusZ) >
    1
  );
  return new Vector3(x, y, z);
};

const tempObject = new Object3D();

export const FishesImpl = ({ range = 200 }: FishesImplProps) => {
  const fishesRef = useRef<InstancedMesh>(null);

  const curvePoints = useMemo(
    () => [
      new Vector3(0, 0.5, 0),
      new Vector3(0.0, 0.5, 2),
      new Vector3(0.5, 0.5, 4),
      new Vector3(-1, 0.5, 5),
      new Vector3(-1.5, 0.5, 3),
      new Vector3(-1.5, 0.5, 1),
      new Vector3(-0.5, 0.8, 0),
      new Vector3(0, 1, -2),
      new Vector3(1.5, 1.2, -2.5),
      new Vector3(2.5, 1.5, -2),
      new Vector3(1.5, 1.2, -1.5),
      new Vector3(0.5, 0.8, -1),
      new Vector3(0, 0.5, 0),
    ],
    []
  );

  const curve = useMemo(() => {
    return new CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  // const shape = useMemo(() => {
  //   const shape = new Shape();
  //   shape.moveTo(0, -0.08);
  //   shape.lineTo(0, 0.08);

  //   return shape;
  // }, [curve]);

  const initialPositions = useRef<Vector3[]>([]);
  const speed = useRef<number[]>([]);
  const noiseFactors = useRef<{
    positionNoise: Vector3[];
    rotationNoise: number[];
  }>({
    positionNoise: [],
    rotationNoise: [],
  });

  const { nodes, materials } = useGLTF("/fish.glb");
  const baseMaterial = materials.Fish_001 as MeshStandardMaterial;
  const materialRef = useRef<ShaderMaterial>(null);

  const geo = (nodes.Object_7 as Mesh).geometry.clone();
  geo.computeVertexNormals();
  geo.scale(0.002, 0.002, 0.002);

  useLayoutEffect(() => {
    if (fishesRef.current) {
      initialPositions.current = Array.from({ length: range }).map(() =>
        getRandomPointInEllipsoid(0.5, 0.5, 1.5)
      );
      noiseFactors.current.positionNoise = Array.from({ length: range }).map(
        () =>
          new Vector3(
            Math.random() - 0.5,
            Math.random() * 0.1 - 0.1,
            Math.random() - 0.5
          )
      );
      noiseFactors.current.rotationNoise = Array.from({ length: range }).map(
        () => Math.random() - 0.5
      );

      speed.current = Array.from({ length: range }).map(
        () => Math.random() * 0.02 + 0.005
      );

      for (let i = 0; i < range; i++) {
        const initialPosition = initialPositions.current[i];

        tempObject.position.set(
          initialPosition.x,
          initialPosition.y,
          initialPosition.z
        );

        tempObject.rotation.y = 0;
        tempObject.rotation.z = 0;

        const randScale = 1 - Math.random() * 0.2;
        tempObject.scale.set(randScale, randScale, randScale);

        tempObject.updateMatrix();
        fishesRef.current.setMatrixAt(i, tempObject.matrix);
      }
      fishesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (fishesRef.current) {
      for (let i = 0; i < range; i++) {
        const time = state.clock.getElapsedTime() * speed.current[i];
        const initialPosition = initialPositions.current[i];
        const positionNoise = noiseFactors.current.positionNoise[i];
        const rotationNoise = noiseFactors.current.rotationNoise[i];

        const u = (time + i * 0.1) % 1;
        const curvePosition = curve.getPointAt(u);

        tempObject.position.set(
          initialPosition.x + curvePosition.x + positionNoise.x * 0.5,
          initialPosition.y +
            curvePosition.y +
            Math.cos(time * 80) * positionNoise.y,
          initialPosition.z + curvePosition.z + positionNoise.z * 0.5
        );

        const tangent = curve.getTangentAt(u);
        const lookAtPoint = curve.getPoint(u + 0.000001);
        const targetLookAt = new Vector3()
          .subVectors(curvePosition, lookAtPoint)
          .normalize();

        tempObject.rotation.y =
          Math.atan2(tangent.x, tangent.z) + Math.sin(time) * rotationNoise;

        const nonLerpLookAt = new Group();
        nonLerpLookAt.position.copy(curvePosition);
        nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

        tangent.applyAxisAngle(new Vector3(0, 1, 0), -nonLerpLookAt.rotation.y);

        let angle = Math.atan2(-tangent.z, tangent.x);
        angle = -Math.PI / 2 + angle;

        let angleDegrees = (angle * 180) / Math.PI;

        if (angleDegrees < 0) {
          angleDegrees = Math.max(angleDegrees, -20);
        }
        if (angleDegrees > 0) {
          angleDegrees = Math.min(angleDegrees, 20);
        }

        angle = (angleDegrees * Math.PI) / 180;
        tempObject.rotation.z += (angle - tempObject.rotation.z) * 0.1;

        tempObject.updateMatrix();
        fishesRef.current.setMatrixAt(i, tempObject.matrix);
      }
      fishesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh args={[geo, undefined, range]} ref={fishesRef}>
        <ThreeCustomShaderMaterial
          ref={materialRef}
          baseMaterial={baseMaterial}
          map={baseMaterial.map}
          vertexShader={swimVertexShader}
          silent
          uniforms={{
            uTime: { value: 0 },
            uTotalLength: { value: 0.2 },
          }}
          attach="material"
        />
      </instancedMesh>
      {/* <group>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
            ref={curveRef}
          />
          <meshStandardMaterial
            color={"white"}
            transparent
            envMapIntensity={2}
          />
        </mesh>
      </group> */}
    </>
  );
};

export const Fishes = memo(FishesImpl);

useGLTF.preload("/fish.glb");
