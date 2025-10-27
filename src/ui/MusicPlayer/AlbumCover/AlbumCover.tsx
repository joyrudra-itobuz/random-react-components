import { useMusicPlayer } from "../../../hooks/musicPlayer/useMusicPlayer";

export default function AlbumCover() {
  const { isPlaying, currentSong } = useMusicPlayer();

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <div
          className={`w-72 h-72 rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 ${
            isPlaying ? "animate-pulse" : ""
          }`}
        >
          <img
            src="/covers/MessiWC.jpeg"
            alt={currentSong?.title || "Album Cover"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Song Info - Spotify Style */}
      <div className="text-center mt-6 px-4">
        <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
          {currentSong?.title || "No Song Selected"}
        </h1>
        <p className="text-sm text-[#b3b3b3] font-medium">
          {currentSong?.artist || "Unknown Artist"}
        </p>
      </div>
    </div>
  );
}
