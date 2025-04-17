import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Float, Text, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import './AppliancesScene.css';
import refrigeratorImg from '../../assets/appliances/refrigerator.png';

// Component cho mô hình điều hòa
function AirConditioner(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Xoay mô hình nhẹ nhàng
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[3, 1, 0.5]} />
      <meshStandardMaterial color="#f0f0f0" metalness={0.5} roughness={0.2} />
      <mesh position={[0, 0, 0.26]}>
        <boxGeometry args={[2.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 8, 0, 0]}>
        <boxGeometry args={[2.5, 0.1, 0.3]} />
        <meshStandardMaterial color="#4CAF50" metalness={0.7} roughness={0.2} />
      </mesh>
    </mesh>
  );
}

// Component cho mô hình tủ lạnh sử dụng ảnh PNG với hiệu ứng chiều sâu
function Refrigerator(props: any) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(refrigeratorImg);

  // Thêm hiệu ứng chiều sâu và chuyển động
  useFrame((state) => {
    if (groupRef.current) {
      // Chuyển động nhẹ nhàng
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      groupRef.current.position.y = props.position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;

      // Hiệu ứng thở
      const breatheScale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.01;
      groupRef.current.scale.set(breatheScale, breatheScale, breatheScale);
    }
  });

  return (
    <group ref={groupRef} position={props.position}>
      {/* Bóng đổ */}
      <mesh
        position={[0, -1.9, -0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="black" transparent opacity={0.2} />
      </mesh>

      {/* Tủ lạnh chính */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[2.5, 4]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Hiệu ứng ánh sáng */}
      <pointLight
        position={[0, 0, 1]}
        intensity={0.5}
        distance={3}
        color="#ffffff"
      />
    </group>
  );
}

// Component cho mô hình máy giặt
function WashingMachine(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const drumRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.2;
    }
    if (drumRef.current) {
      drumRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#f0f0f0" metalness={0.5} roughness={0.2} />
      <mesh position={[0, 0, 1.01]} ref={drumRef}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.5} />
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.11]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
        <mesh position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.11]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
      </mesh>
      <mesh position={[0, 0.8, 1.01]}>
        <boxGeometry args={[1.5, 0.2, 0.05]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </mesh>
  );
}

// Component cho mô hình lò vi sóng
function Microwave(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 1.2, 1.2]} />
      <meshStandardMaterial color="#f0f0f0" metalness={0.5} roughness={0.2} />
      <mesh position={[-0.5, 0, 0.61]}>
        <boxGeometry args={[0.9, 0.9, 0.01]} />
        <meshStandardMaterial color="#333" opacity={0.8} transparent={true} />
      </mesh>
      <mesh position={[0.7, 0, 0.61]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      <mesh position={[0.7, 0.3, 0.61]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
    </mesh>
  );
}



// Component chính cho cảnh 3D
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <AirConditioner position={[-3, 2, 0]} />
        <Text
          position={[-3, 0.8, 0]}
          fontSize={0.3}
          color="#4CAF50"
          anchorX="center"
          anchorY="middle"
        >
          Điều hòa
        </Text>
      </Float>

      <Refrigerator position={[3, 1, 0]} />
      <Text
        position={[3, -1.2, 0]}
        fontSize={0.3}
        color="#4CAF50"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Tủ lạnh
      </Text>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
        <WashingMachine position={[-3, -2, 0]} />
        <Text
          position={[-3, -3.3, 0]}
          fontSize={0.3}
          color="#4CAF50"
          anchorX="center"
          anchorY="middle"
        >
          Máy giặt
        </Text>
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
        <Microwave position={[3, -2, 0]} />
        <Text
          position={[3, -3, 0]}
          fontSize={0.3}
          color="#4CAF50"
          anchorX="center"
          anchorY="middle"
        >
          Lò vi sóng
        </Text>
      </Float>

      <Environment preset="sunset" />
    </>
  );
}

// Component chính để xuất ra
const AppliancesScene: React.FC = () => {
  return (
    <div className="appliances-scene-container">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
};

export default AppliancesScene;
