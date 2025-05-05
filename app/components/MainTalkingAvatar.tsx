'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

import { Avatar } from './Avatar';

const MainTalkingAvatar = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
      {/* <color attach='background' args={['#ececec']} /> */}
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Environment preset='sunset' />
      <Avatar position={[0, -3, 5]} scale={2} />
    </Canvas>
  );
};

export default MainTalkingAvatar;
