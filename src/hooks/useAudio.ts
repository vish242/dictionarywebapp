import { useState, useRef } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  playAudio: (url: string) => Promise<void>;
}

export const useAudio = (): UseAudioReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = async (url: string) => {
    if (!url) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsPlaying(true);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };

      await audio.play();
    } catch (error) {
      setIsPlaying(false);
      console.error('Failed to play audio:', error);
    }
  };

  return { isPlaying, playAudio };
};