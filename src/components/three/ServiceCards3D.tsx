import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './ServiceCards3D.css';

// Component cho thẻ dịch vụ 3D
function ServiceCard({ position, icon, title, description, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Animation cho thẻ
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Hiệu ứng hover
    meshRef.current.scale.x = THREE.MathUtils.lerp(
      meshRef.current.scale.x,
      hovered || clicked ? 1.1 : 1,
      0.1
    );
    meshRef.current.scale.y = THREE.MathUtils.lerp(
      meshRef.current.scale.y,
      hovered || clicked ? 1.1 : 1,
      0.1
    );
    
    // Hiệu ứng lơ lửng
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1;
  });
  
  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial 
          color={hovered ? "#5CCC60" : "#4CAF50"} 
          metalness={0.2} 
          roughness={0.3}
          emissive={hovered ? "#4CAF50" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
        
        <Text
          position={[0, 0.6, 0.11]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
        
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {description}
        </Text>
        
        <Text
          position={[0, -0.7, 0.11]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </mesh>
    </group>
  );
}

// Component chính cho ServiceCards3D
const ServiceCards3D: React.FC = () => {
  const services = [
    {
      icon: "❄️",
      title: "Sửa chữa điều hòa",
      description: "Dịch vụ sửa chữa, bảo dưỡng và vệ sinh điều hòa tại nhà và văn phòng."
    },
    {
      icon: "🧊",
      title: "Sửa chữa tủ lạnh",
      description: "Khắc phục các sự cố tủ lạnh, tủ đông và các thiết bị làm lạnh khác."
    },
    {
      icon: "🛠️",
      title: "Lắp đặt điều hòa",
      description: "Dịch vụ lắp đặt điều hòa mới chuyên nghiệp, nhanh chóng và an toàn."
    },
    {
      icon: "📷",
      title: "Bảo trì định kỳ",
      description: "Dịch vụ bảo trì định kỳ giúp kéo dài tuổi thọ và hiệu suất của thiết bị."
    }
  ];
  
  return (
    <div className="service-cards-3d-container">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <ServiceCard 
          position={[-3.5, 1, 0]} 
          icon={services[0].icon} 
          title={services[0].title} 
          description={services[0].description}
          index={0}
        />
        
        <ServiceCard 
          position={[3.5, 1, 0]} 
          icon={services[1].icon} 
          title={services[1].title} 
          description={services[1].description}
          index={1}
        />
        
        <ServiceCard 
          position={[-3.5, -1.5, 0]} 
          icon={services[2].icon} 
          title={services[2].title} 
          description={services[2].description}
          index={2}
        />
        
        <ServiceCard 
          position={[3.5, -1.5, 0]} 
          icon={services[3].icon} 
          title={services[3].title} 
          description={services[3].description}
          index={3}
        />
        
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default ServiceCards3D;
