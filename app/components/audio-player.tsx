"use client"

import { forwardRef, useEffect, useState } from "react"

interface AudioPlayerProps {
  volume: number
  isMuted: boolean
  isPlaying: boolean
  currentTrack: string
  onTrackEnd: () => void
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ volume, isMuted, isPlaying, currentTrack, onTrackEnd }, ref) => {
    const [isStarting, setIsStarting] = useState(false)

    // Handle track changes
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audio = ref.current
        const wasPlaying = !audio.paused
        
        // Load new track
        audio.src = currentTrack
        audio.load()
        
        // Resume playing if it was playing before
        if (wasPlaying && isPlaying) {
          audio.play().catch(console.error)
        }
      }
    }, [currentTrack, ref, isPlaying])

    // Control play/pause based on isPlaying prop
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audio = ref.current
        
        if (isPlaying) {
          audio.play().catch(console.error)
        } else {
          audio.pause()
        }
      }
    }, [isPlaying, ref])

    // Handle volume and muting
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audio = ref.current
        audio.muted = isMuted

        // Handle smooth fade-in when starting
        if (isStarting && !isMuted) {
          audio.volume = 0
          let currentVolume = 0
          const targetVolume = volume
          const fadeInterval = setInterval(() => {
            currentVolume += 0.02
            if (currentVolume >= targetVolume) {
              currentVolume = targetVolume
              clearInterval(fadeInterval)
              setIsStarting(false)
            }
            audio.volume = currentVolume
          }, 50)

          return () => clearInterval(fadeInterval)
        } else if (!isStarting) {
          audio.volume = volume
        }
      }
    }, [volume, isMuted, isStarting, ref])

    // Listen for events
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audio = ref.current
        
        const handlePlay = () => setIsStarting(true)
        const handleEnded = () => {
          // Ensure we move to next track when current ends
          console.log("Track ended, moving to next...")
          onTrackEnd()
        }
        const handleCanPlayThrough = () => {
          // Auto-play when new track is loaded if we should be playing
          if (isPlaying && audio.paused) {
            audio.play().catch(console.error)
          }
        }
        
        audio.addEventListener("play", handlePlay)
        audio.addEventListener("ended", handleEnded)
        audio.addEventListener("canplaythrough", handleCanPlayThrough)
        
        return () => {
          audio.removeEventListener("play", handlePlay)
          audio.removeEventListener("ended", handleEnded)
          audio.removeEventListener("canplaythrough", handleCanPlayThrough)
        }
      }
    }, [ref, onTrackEnd, isPlaying])

    return (
      <audio ref={ref} preload="auto" className="hidden">
        <source src={currentTrack} type="audio/mpeg" />
      </audio>
    )
  }
)

AudioPlayer.displayName = "AudioPlayer"

export default AudioPlayer