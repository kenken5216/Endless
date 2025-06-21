"use client"

import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Monitor } from "lucide-react"
import { Video } from "lucide-react"

interface ControlPanelProps {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  showControls: boolean
  currentTrack: number
  totalTracks: number
  currentVideo: number
  totalVideos: number
  onPlayPause: () => void
  onMute: () => void
  onVolumeChange: (volume: number) => void
  onPreviousTrack: () => void
  onNextTrack: () => void
  onVideoSwitch: () => void
}

export default function ControlPanel({
  isPlaying,
  isMuted,
  volume,
  showControls,
  currentTrack,
  totalTracks,
  currentVideo,
  totalVideos,
  onPlayPause,
  onMute,
  onVolumeChange,
  onPreviousTrack,
  onNextTrack,
  onVideoSwitch,
}: ControlPanelProps) {
  return (
    <>
      <style jsx>{`
        .volume-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
      
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Control Panel */}
        <div className="flex items-center space-x-6 px-8 py-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
          {/* Previous Button */}
          <button 
            onClick={onPreviousTrack}
            className="p-2 text-white/70 hover:text-white transition-colors duration-300"
            title="Previous Track"
          >
            <SkipBack size={20} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={onPlayPause}
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Next Button */}
          <button 
            onClick={onNextTrack}
            className="p-2 text-white/70 hover:text-white transition-colors duration-300"
            title="Next Track"
          >
            <SkipForward size={20} />
          </button>

          {/* Video Switch Button */}
          <button 
            onClick={onVideoSwitch}
            className="p-2 text-white/70 hover:text-white transition-colors duration-300"
            title={`Switch Video (${currentVideo + 1}/${totalVideos})`}
          >
            <Video size={20} />
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <button onClick={onMute} className="p-2 text-white/70 hover:text-white transition-colors duration-300">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div className="relative w-20 flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => onVolumeChange(Number.parseFloat(e.target.value))}
                className="volume-slider"
              />
            </div>
          </div>
        </div>

        {/* Status Indicator with Track and Video Info */}
        <div className="flex justify-center items-center mt-4 space-x-6">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isPlaying ? "bg-green-400" : "bg-white/40"
              }`}
            />
            <div className="text-xs text-white/60 font-light">
              Track {currentTrack + 1} of {totalTracks}
            </div>
          </div>
          
          <div className="text-xs text-white/60 font-light">
            Video {currentVideo + 1} of {totalVideos}
          </div>
        </div>
      </div>
    </>
  )
}