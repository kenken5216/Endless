"use client"

import { forwardRef, useState, useEffect, useRef } from "react"
import Image from "next/image"

interface VideoPlayerProps {
  isPlaying: boolean
  currentVideo: number
  onVideoSwitch: (index: number) => void
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ isPlaying, currentVideo, onVideoSwitch }, ref) => {
  const [animationClass, setAnimationClass] = useState("")
  const [showVideo, setShowVideo] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Refs for all video elements
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const video3Ref = useRef<HTMLVideoElement>(null)
  
  const videos = [
    "/videos/endless3_compressed.mp4",
    "/videos/endless169_compress.mp4",
    "/videos/endless2_newcompressed.mp4"
  ]
  
  const videoRefs = [video1Ref, video2Ref, video3Ref]

  useEffect(() => {
    if (isPlaying) {
      setAnimationClass("animate-pulse-ultra-slow")
      setTimeout(() => setShowVideo(true), 1000)
    } else {
      setAnimationClass("")
      setShowVideo(false)
    }
  }, [isPlaying])

  // Preload next video for smooth switching
  useEffect(() => {
    const nextVideoIndex = (currentVideo + 1) % videos.length
    const nextVideoRef = videoRefs[nextVideoIndex]
    
    if (nextVideoRef.current) {
      nextVideoRef.current.load() // Preload next video
    }
  }, [currentVideo])

  // Control video playback for current video
  useEffect(() => {
    const currentVideoRef = videoRefs[currentVideo]
    
    if (currentVideoRef.current) {
      if (isPlaying && showVideo) {
        currentVideoRef.current.play()
      } else {
        currentVideoRef.current.pause()
      }
    }
    
    // Pause other videos
    videoRefs.forEach((videoRef, index) => {
      if (index !== currentVideo && videoRef.current) {
        videoRef.current.pause()
      }
    })
  }, [isPlaying, showVideo, currentVideo])


  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Main Background Image */}
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

      {/* Video Elements - All three videos */}
      {videos.map((videoSrc, index) => (
        <video 
          key={index}
          ref={videoRefs[index]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showVideo && currentVideo === index && !isTransitioning ? "opacity-100" : "opacity-0"
          }`}
          loop 
          muted 
          playsInline 
          preload={index === 0 ? "auto" : "metadata"} // Preload first video fully
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ))}

      {/* Existing overlay effects */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-green-400/10 transition-opacity duration-2000 ${
            isPlaying ? "opacity-100 animate-pulse-ultra-slow" : "opacity-0"
          }`}
        />

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