'use client';

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export interface CustomAxiosResponse extends AxiosResponse {
  lipSync: {
    metadata: { duration: number; soundFile: string };
    mouthCues: { end: number; start: number; value: string }[];
  };
}

const useGetAudioWithLipSync = () => {
  const [data, setData] = useState<CustomAxiosResponse['lipSync'] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const getAudio = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post<CustomAxiosResponse>(
        '/api/run-rhubarb'
      );
      setData(response.data.lipSync);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getAudio, data, setData };
};

export default useGetAudioWithLipSync;
