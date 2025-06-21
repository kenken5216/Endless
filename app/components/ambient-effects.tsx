"use client"

interface AmbientEffectsProps {
  isPlaying: boolean
}

export default function AmbientEffects({ isPlaying }: AmbientEffectsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Breathing Glow Effect */}
      <div className={`absolute inset-0 transition-opacity duration-3000 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Subtle Wind Effect */}
      {isPlaying && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      )}
    </div>
  )
}
