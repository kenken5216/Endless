"use client"

import { useState, useEffect } from "react"

interface AudioVisualizerProps {
  isPlaying: boolean
  volume: number
}

export default function AudioVisualizer({ isPlaying, volume }: AudioVisualizerProps) {
  const [barHeights, setBarHeights] = useState<number[]>([])
  const bars = Array.from({ length: 12 }, (_, i) => i)

  // Generate random heights for animation
  const generateHeights = () => {
    return bars.map(() => Math.random() * 20 + 10)
  }

  // Initialize bar heights
  useEffect(() => {
    setBarHeights(generateHeights())
  }, [])

  // Animate bars when playing - much slower
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setBarHeights(generateHeights())
      }, 500) // Update every 500ms instead of 150ms - much slower
    } else {
      // When stopped, gradually reduce to minimum height
      setBarHeights(bars.map(() => 4))
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  return (
    <div className="fixed bottom-24 left-8 flex items-end space-x-1 opacity-60">
      {bars.map((bar, index) => (
        <div
          key={bar}
          className="w-1 bg-white/60 rounded-full transition-all duration-500 ease-in-out" // Longer transition duration
          style={{
            height: `${barHeights[index] || 4}px`,
            opacity: volume * 0.8 + 0.2, // Minimum opacity of 0.2
            transform: isPlaying ? `scaleY(${0.8 + Math.sin(Date.now() * 0.003 + bar) * 0.2})` : 'scaleY(1)', // Slower sine wave
          }}
        />
      ))}
    </div>
  )
}