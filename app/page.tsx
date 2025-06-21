"use client"

import { useState, useEffect, useRef } from "react"
import VideoPlayer from "./components/video-player"
import AudioPlayer from "./components/audio-player"
import AudioVisualizer from "./components/audio-visualizer"
import AmbientEffects from "./components/ambient-effects"
import ControlPanel from "./components/control-panel"
import Navigation from "./components/navigation"
import HeroSection from "./components/hero-section"

// play() can throw AbortError if interrupted – wrap & swallow that promise.
const safePlay = (el: HTMLMediaElement | null) => {
  if (!el) return
  if (!el.paused) return // already playing
  const promise = el.play()
  if (promise !== undefined) {
    promise.catch(() => {
      /* ignore AbortError or any autoplay blocking */
    })
  }
}

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [showControls, setShowControls] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const tracks = [
    "/audio/Midnight_Reverie1.mp3",
    "/audio/Drifting_Away1.mp3", 
    "/audio/Drifting_Away2.mp3",
    "/audio/Midnight_Reverie2.mp3",
    "/audio/Midnight_Reverie3.mp3",
    "/audio/Wandering_Mind1.mp3",
    "/audio/Midnight_Reverie4.mp3",
    "/audio/Wandering_Mind2.mp3",
  ]
  
  const handlePreviousTrack = () => {
  setCurrentTrack((prev) => prev > 0 ? prev - 1 : tracks.length - 1)
}

  const handleNextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const handleEnterExperience = () => {
    setIsTransitioning(true)

    setTimeout(() => {
      setHasEntered(true)
      setShowControls(true) // Show immediately
      handlePlay()
      
      // Auto-hide after 4 seconds
      const timeout = setTimeout(() => setShowControls(false), 4000)
      setHideTimeout(timeout)
    }, 1800)
  }

  // Keyboard shortcuts (only active after entering)
  useEffect(() => {
    if (!hasEntered) return

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          e.preventDefault()
          handlePlayPause()
          break
        case "ArrowUp":
          e.preventDefault()
          setVolume((prev) => Math.min(1, prev + 0.1))
          break
        case "ArrowDown":
          e.preventDefault()
          setVolume((prev) => Math.max(0, prev - 0.1))
          break
        case "KeyM":
          handleMute()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [hasEntered])

  // Mouse movement detection
  useEffect(() => {
    if (!hasEntered) return

    const handleMouseMove = () => {
      // Clear existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }

      // Show controls
      setShowControls(true)
      
      // Set new auto-hide timeout
      const timeout = setTimeout(() => setShowControls(false), 3000)
      setHideTimeout(timeout)
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }
    }
  }, [hasEntered, hideTimeout])

  const handlePlay = () => {
    safePlay(videoRef.current)
    safePlay(audioRef.current)
    setIsPlaying(true)
  }

  const handlePause = () => {
    if (videoRef.current && !videoRef.current.paused) videoRef.current.pause()
    if (audioRef.current && !audioRef.current.paused) audioRef.current.pause()
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black"
      onClick={hasEntered ? handlePlayPause : undefined}
      onMouseEnter={() => hasEntered && setShowControls(true)}
      onMouseLeave={() => hasEntered && setShowControls(false)}
    >
      {/* Background Video/Image */}
      <VideoPlayer ref={videoRef} isPlaying={isPlaying} />

      {/* Background Audio */}
      <AudioPlayer 
        ref={audioRef} 
        volume={volume} 
        isMuted={isMuted}
        isPlaying={isPlaying}
        currentTrack={tracks[currentTrack]}
        onTrackEnd={() => setCurrentTrack((prev) => (prev + 1) % tracks.length)}
      />

      {/* Blur System */}
      <div
        className="absolute inset-0 transition-all duration-1800 ease-out"
        style={{
          backdropFilter: isTransitioning ? 'blur(0px)' : 'blur(12px)',
          background: isTransitioning 
            ? 'transparent' 
            : 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
          opacity: isTransitioning ? 0 : 1,
        }}
      />

      {/* Ambient Effects */}
      <AmbientEffects isPlaying={isPlaying} />

      {/* Audio Visualizer */}
      {hasEntered && <AudioVisualizer isPlaying={isPlaying} volume={volume} />}


      {/* Hero Section with integrated button */}
      <HeroSection 
        hasEntered={hasEntered}
        isTransitioning={isTransitioning}
        handleEnterExperience={handleEnterExperience}
      />
      {/* Navigation */}
      {hasEntered && <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} showControls={showControls} />}

      {/* Control Panel */}
      {hasEntered && (
        <ControlPanel
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          showControls={showControls}
          currentTrack={currentTrack}
          totalTracks={tracks.length}
          onPlayPause={handlePlayPause}
          onMute={handleMute}
          onVolumeChange={setVolume}
          onPreviousTrack={handlePreviousTrack}
          onNextTrack={handleNextTrack}
        />
      )}

      {/* Main Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
    </div>
  )
}
