import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, PerspectiveCamera, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './Hero3D.css';

// Component cho các hạt bay lơ lửng
function Particles({ count = 200 }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const { viewport, camera } = useThree();

  // Tạo ma trận cho mỗi hạt
  useEffect(() => {
    if (!mesh.current) return;

    // Tạo ma trận cho mỗi hạt
    const dummy = new THREE.Object3D();
    const particles = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Vị trí ngẫu nhiên
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;

      particles[i * 3] = x;
      particles[i * 3 + 1] = y;
      particles[i * 3 + 2] = z;

      // Kích thước ngẫu nhiên
      scales[i] = Math.random() * 0.2 + 0.05;

      dummy.position.set(x, y, z);
      dummy.scale.set(scales[i], scales[i], scales[i]);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;

    // Lưu trữ dữ liệu để animation
    mesh.current.userData = { particles, scales };
  }, [count]);

  // Animation cho các hạt
  useFrame((state) => {
    if (!mesh.current || !mesh.current.userData || !mesh.current.userData.particles || !mesh.current.userData.scales) return;

    const time = state.clock.getElapsedTime();
    const particles = mesh.current.userData.particles;
    const scales = mesh.current.userData.scales;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const x = particles[i * 3];
      const y = particles[i * 3 + 1];
      const z = particles[i * 3 + 2];

      // Di chuyển hạt lên trên và lắc lư
      dummy.position.set(
        x + Math.sin(time * 0.1 + i) * 0.1,
        y + Math.cos(time * 0.1 + i) * 0.1 + time * 0.05,
        z
      );

      // Nếu hạt đi quá cao, đưa nó xuống dưới
      if (dummy.position.y > 10) {
        dummy.position.y = -10;
        particles[i * 3 + 1] = -10;
      }

      // Xoay hạt
      dummy.rotation.x = time * 0.2 + i;
      dummy.rotation.y = time * 0.1 + i;

      // Kích thước hạt
      const scale = scales[i] * (1 + Math.sin(time + i) * 0.2);
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.2} transparent opacity={0.7} />
    </instancedMesh>
  );
}

// Component cho logo xoay
function RotatingLogo() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#8BC34A" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

// Component cho nội dung hero
function HeroContent() {
  const textRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!textRef.current) return;

    textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group position={[0, 0, -5]}>
      <RotatingLogo />
      <Particles />

      <group ref={textRef} position={[0, -2, 2]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#4CAF50"
        >
          Điện Lạnh Tâm An
        </Text>

        <Text
          position={[0, -1.2, 0]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Chuyên nghiệp - Uy tín - Chất lượng
        </Text>
      </group>
    </group>
  );
}

// Component chính cho Hero 3D
const Hero3D: React.FC = () => {
  return (
    <div className="hero-3d-container">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <HeroContent />
        <Environment preset="sunset" />
      </Canvas>

      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Điện Lạnh Tâm An</h1>
          <p>Chuyên cung cấp dịch vụ sửa chữa, bảo trì và lắp đặt điều hòa, tủ lạnh và các thiết bị điện lạnh</p>
          <a href="#contact" className="cta-button">Liên hệ ngay</a>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
