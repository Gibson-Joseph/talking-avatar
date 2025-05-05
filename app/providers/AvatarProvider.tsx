'use client';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CustomAxiosResponse } from '../hooks/useGetAudioWithLipSync';

type AvatarContext = {
  audio: HTMLAudioElement | null;
  playAudio: () => void;
  mouthCues?: { end: number; start: number; value: string }[];
};

const AvatarContext = createContext<AvatarContext | null>(null);

export const AvatarProvider = ({
  children,
  audioUrl,
  mouthCues,
  setData,
}: {
  children: ReactNode;
  audioUrl?: string | null;
  mouthCues?: AvatarContext['mouthCues'];
  setData: Dispatch<SetStateAction<CustomAxiosResponse['lipSync'] | null>>;
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = useCallback(() => {
    if (audioUrl) {
      const audioInstance = new Audio(audioUrl);

      audioInstance.onended = () => {
        setAudio(null);
        setData(null);
      };

      setAudio(audioInstance);
      audioInstance.play().catch((e) => {
        console.error('Audio playback failed', e);
      });
    }
  }, [audioUrl, setData]);

  useEffect(() => playAudio(), [playAudio]);

  return (
    <AvatarContext.Provider
      value={{
        audio,
        playAudio,
        mouthCues,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatarContext must be inside the AvatarProvider');
  }
  return context;
};
