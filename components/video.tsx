"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlayCircle } from "lucide-react";

export default function HomeVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  const [play, setPlay] = useState(true);

  const handleClick = useCallback(() => {
    if (ref.current) {
      if (play) ref.current.pause();
      else ref.current.play();
    }
  }, [ref, play]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener("play", () => setPlay(true));
    ref.current.addEventListener("pause", () => setPlay(false));

    return () => {
      ref.current?.removeEventListener("play", () => setPlay(true));
      ref.current?.removeEventListener("pause", () => setPlay(false));
    };
  }, [setPlay]);

  return (
    <div className="size-full relative">
      {/* {!play && (
        <div className="size-full flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm">
          <PlayCircle size={28} />
        </div>
      )} */}
      <video
        className="size-full cursor-pointer"
        ref={ref}
        // onClick={handleClick}
        autoPlay
        playsInline
        muted
        controls
        controlsList="nodownload"
        poster="/img/poster-video.jpeg"
        src="https://res.cloudinary.com/dpxwhoqgy/video/upload/v1757027167/MANIFESTO_1_ml1l9m.mp4"
      />
    </div>
  );
}
