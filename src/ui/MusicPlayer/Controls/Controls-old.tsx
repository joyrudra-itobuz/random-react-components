import { useMusicPlayer } from "../../../hooks/musicPlayer/useMusicPlayer";
import "../MusicPlayer.css";

export default function Controls() {
  const {
    isPlaying,
    isLoading,
    shuffle,
    repeat,
    currentTime,
    duration,
    progress,
    volume,
    togglePlay,
    nextSong,
    previousSong,
    toggleShuffle,
    toggleRepeat,
    seekToPercentage,
    setVolume,
    formatTime,
  } = useMusicPlayer();

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = parseFloat(e.target.value);
    seekToPercentage(percentage);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full music-range"
            style={{
              background: `linear-gradient(to right, #1db954 0%, #1db954 ${progress}%, #374151 ${progress}%, #374151 100%)`,
            }}
          />
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        {/* Shuffle */}
        <button
          onClick={toggleShuffle}
          className={`p-2 rounded-full transition-colors ${
            shuffle ? "text-green-400" : "text-gray-400 hover:text-white"
          }`}
          title="Shuffle"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h2a1 1 0 010 2H5.414l1.293 1.293a1 1 0 01-1.414 1.414L3 5.414V7a1 1 0 01-2 0V4zm14 0a1 1 0 10-2 0v2.586l-1.293-1.293a1 1 0 00-1.414 1.414L13.586 8H12a1 1 0 100 2h2a1 1 0 001-1V4zM3 16a1 1 0 011-1h2a1 1 0 010 2H5.414l1.293 1.293a1 1 0 01-1.414 1.414L3 17.414V19a1 1 0 01-2 0v-3zm14 0a1 1 0 10-2 0v2.586l-1.293-1.293a1 1 0 00-1.414 1.414L15.586 20H14a1 1 0 100 2h2a1 1 0 001-1v-3z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Previous */}
        <button
          onClick={previousSong}
          className="p-3 text-gray-400 hover:text-white transition-colors"
          title="Previous"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="p-4 bg-white text-black rounded-full hover:bg-gray-200 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                   transform hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          onClick={nextSong}
          className="p-3 text-gray-400 hover:text-white transition-colors"
          title="Next"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
          </svg>
        </button>

        {/* Repeat */}
        <button
          onClick={toggleRepeat}
          className={`p-2 rounded-full transition-colors relative ${
            repeat !== "none"
              ? "text-green-400"
              : "text-gray-400 hover:text-white"
          }`}
          title={`Repeat: ${repeat}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          {repeat === "one" && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 text-black text-xs rounded-full flex items-center justify-center font-bold">
              1
            </span>
          )}
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12 5a1 1 0 011.414 0A4.978 4.978 0 0115 10a4.978 4.978 0 01-1.586 5 1 1 0 01-1.414-1.414A2.984 2.984 0 0013 10a2.984 2.984 0 00-1-2.236A1 1 0 0112 5z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="flex-1 volume-range"
          style={{
            background: `linear-gradient(to right, #1db954 0%, #1db954 ${
              volume * 100
            }%, #374151 ${volume * 100}%, #374151 100%)`,
          }}
        />
        <span className="text-sm text-gray-400 w-8">
          {Math.round(volume * 100)}
        </span>
      </div>
    </div>
  );
}
