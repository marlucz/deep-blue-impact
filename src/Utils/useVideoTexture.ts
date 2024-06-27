import * as THREE from "three";
import * as React from "react";

function useVideoTexture(src: string): THREE.Texture {
  const [texture, setTexture] = React.useState<THREE.Texture>(
    () => new THREE.Texture()
  );
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    videoRef.current = video;

    video.addEventListener("canplay", () => {
      video.play();
      setTexture(new THREE.VideoTexture(video));
    });

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, [src]);

  return texture;
}

export default useVideoTexture;
