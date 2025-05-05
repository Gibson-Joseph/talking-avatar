'use client';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useTexture } from '@react-three/drei';

import { Avatar } from './Avatar';

const CustomebackgroundImage = () => {
  const texture = useTexture('assets/hospital.png');
  const viewport = useThree((state) => state.viewport);
  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const MainTalkingAvatar = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Environment preset='sunset' />
      <Avatar position={[0, -3, 5]} scale={2} />
      <CustomebackgroundImage />
    </Canvas>
  );
};

export default MainTalkingAvatar;
