"use client"

import { Menu, X } from "lucide-react"

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  showControls: boolean
}

export default function Navigation({ isMenuOpen, setIsMenuOpen, showControls }: NavigationProps) {
  return (
    <>
      {/* Menu Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsMenuOpen(!isMenuOpen)
        }}
        className={`fixed top-8 right-8 z-50 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${
          showControls || isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-xl bg-black/50 transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          e.stopPropagation()
          setIsMenuOpen(false)
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-6 max-w-md px-8">
            <div
              className={`transform transition-all duration-700 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              <h2 className="text-3xl md:text-4xl font-thin text-white/90 tracking-wider mb-4">
                ENDLESS
              </h2>
              <div className="h-px w-24 bg-white/30 mx-auto mb-6"></div>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                Endless is your digital sanctuary.<br/>
              </p>
              <p className="text-base md:text-sm font-light text-white/70 leading-relaxed">
                I will update the video and audio soon.<br/>
                 When I have time :Date
              </p>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-sm md:text-sm font-light text-white/50 leading-relaxed">
                AI Image: MidJourney<br/>
                AI Video: MidJourney + Kling<br/>
                AI Music: SunoAI<br/>
                Editing: DaVinci Reslove
              </p>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="h-px w-16 bg-white/20 mx-auto"></div>
              <p className="text-xs text-white/40 font-light tracking-wider uppercase mt-4">
                github
              </p>
              <p className="text-xs text-white/40 font-light tracking-wider uppercase">
                last update: 21/06/2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}