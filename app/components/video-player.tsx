"use client"

import { forwardRef, useState, useEffect } from "react"
import Image from "next/image"

interface VideoPlayerProps {
  isPlaying: boolean
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ isPlaying }, ref) => {
  const [animationClass, setAnimationClass] = useState("")
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      setAnimationClass("animate-pulse-ultra-slow")
      // Show video after image animations start
      setTimeout(() => setShowVideo(true), 1000)
    } else {
      setAnimationClass("")
      setShowVideo(false)
    }
  }, [isPlaying])

  // Control video playback
  useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      if (isPlaying) {
        ref.current.play()
      } else {
        ref.current.pause()
      }
    }
  }, [isPlaying, ref])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Main Background Image - fades out when video starts */}
      <div className={`absolute inset-0 transition-all duration-2000 ${animationClass} ${
        showVideo ? "opacity-0" : "opacity-100"
      }`}>
        <Image
          src="/images/ghibli-landscape.png"
          alt="Serene landscape with cyclist"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Video Element - fades in */}
      <video 
        ref={ref} 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
        loop 
        muted 
        playsInline 
        preload="auto"
      >
        <source src="/videos/endless169_compress.mp4" type="video/mp4" />
      </video>

      {/* Animated Overlay Effects - on top of video */}
      <div className="absolute inset-0">
        {/* Breathing Light Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-green-400/10 transition-opacity duration-2000 ${
            isPlaying ? "opacity-100 animate-pulse-ultra-slow" : "opacity-0"
          }`}
        />

        {/* Floating Particles */}
        {isPlaying && (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "8s" }}
            />
            <div
              className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "10s" }}
            />
            <div
              className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"
              style={{ animationDelay: "4s", animationDuration: "12s" }}
            />
          </>
        )}

        {/* Subtle Movement Simulation */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform transition-transform duration-8000 ${
            isPlaying ? "translate-x-full" : "-translate-x-full"
          }`}
          style={{
            animation: isPlaying ? "drift 16s ease-in-out infinite alternate" : "none",
          }}
        />
      </div>
    </div>
  )
})

VideoPlayer.displayName = "VideoPlayer"

export default VideoPlayer