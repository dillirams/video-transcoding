import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initialize Plyr with options
    const defaultOptions: Plyr.Options = {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["quality", "speed"],
    };

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const availableQualities = hls.levels.map((l) => l.height);
        
        // Add auto option
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (e: any) => updateQuality(e),
        };

        playerRef.current = new Plyr(video, defaultOptions);
      });

      const updateQuality = (newQuality: number) => {
        if (hlsRef.current) {
          hlsRef.current.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              console.log("Found quality match with index", levelIndex);
              hlsRef.current!.currentLevel = levelIndex;
            }
          });
        }
      };

      return () => {
        if (hlsRef.current) hlsRef.current.destroy();
        if (playerRef.current) playerRef.current.destroy();
      };
    } else {
      // Fallback for native HLS (Safari)
      playerRef.current = new Plyr(video, defaultOptions);
      video.src = src;
    }
  }, [src]);

  return (
    <div className={className || "w-full h-full overflow-hidden rounded-xl shadow-2xl"}>
      <video ref={videoRef} playsInline className="w-full h-full" />
    </div>
  );
};

export default VideoPlayer;
