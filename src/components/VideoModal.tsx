import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { getVideoUrl, getVideoPosterUrl } from '../utils/cloudinary';

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = getVideoUrl('gymTour');
  const posterUrl = getVideoPosterUrl('gymTour');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsPlaying(true);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {
            // Autoplay policy might require mute
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
        }
      }, 100);
    };

    window.addEventListener('open-video-modal', handleOpen);
    return () => {
      window.removeEventListener('open-video-modal', handleOpen);
    };
  }, []);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
    setIsPlaying(false);
    document.body.style.overflow = '';
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0C0C12] border border-[#CCFF00]/30 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(204,255,0,0.2)] overflow-hidden z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#101016]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
            <h3 className="font-display italic text-base sm:text-lg text-white uppercase tracking-wider">
              PEAKFORM <span className="text-[#CCFF00]">FACILITY TOUR</span> • KALYAN
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Center Play Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#CCFF00] text-black flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(204,255,0,0.7)] hover:scale-110 transition-transform cursor-pointer z-10"
              aria-label="Play video"
            >
              <Play className="w-9 h-9 fill-black" />
            </button>
          )}

          {/* Bottom Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-5 flex flex-col gap-3 z-10">
            
            {/* Scrubber / Progress bar */}
            <div 
              onClick={handleSeek}
              className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all relative overflow-hidden"
            >
              <div 
                className="h-full bg-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.8)]" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#CCFF00]" />}
                </button>

                <span className="text-xs text-gray-300 font-mono font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFullScreen}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white hidden sm:flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    closeModal();
                    window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { plan: 'Premium' } }));
                  }}
                  className="bg-[#CCFF00] hover:bg-[#D4F933] text-black text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] cursor-pointer"
                >
                  Book In-Person Visit
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
