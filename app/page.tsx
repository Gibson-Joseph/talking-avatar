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
        <div className='w-full h-fit flex justify-center items-center p-1'>
          <button
            className='cursor-pointer w-fit bg-blue-200 text-black rounded-md px-1'
            disabled={isLoading}
            onClick={getAudio}
          >
            {isLoading ? 'Thinking ...' : 'Click to Speek'}
          </button>
        </div>
        <MainTalkingAvatar />
      </main>
    </AvatarProvider>
  );
}
