import { useEffect, useRef } from "react";

export const useSound = ({ play }: { play: boolean }) => {
  const envMusic = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("deep-water-adventure.mp3");
    audio.preload = "auto";
    audio.loop = true;

    envMusic.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (play) {
      envMusic.current?.play();
    } else {
      envMusic.current?.pause();
    }
  }, [play]);
};
