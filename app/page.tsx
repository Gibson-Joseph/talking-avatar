'use client';

import MainTalkingAvatar from './components/MainTalkingAvatar';
import useGetAudioWithLipSync from './hooks/useGetAudioWithLipSync';
import { AvatarProvider } from './providers/AvatarProvider';

export default function Home() {
  const { getAudio, isLoading, data, setData } = useGetAudioWithLipSync();

  return (
    <AvatarProvider
      audioUrl={data?.metadata.soundFile}
      mouthCues={data?.mouthCues}
      setData={setData}
    >
      <main className='w-full h-full flex flex-col'>
        <button
          className='cursor-pointer'
          disabled={isLoading}
          onClick={getAudio}
        >
          {isLoading ? 'Thinking ...' : 'Click to Speek'}
        </button>
        <MainTalkingAvatar />
      </main>
    </AvatarProvider>
  );
}
