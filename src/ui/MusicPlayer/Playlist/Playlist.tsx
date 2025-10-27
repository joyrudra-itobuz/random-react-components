import { useMusicPlayer } from "../../../hooks/musicPlayer/useMusicPlayer";

export default function Playlist() {
  const { songs, currentSongIndex, selectSong } = useMusicPlayer();

  return (
    <div className="bg-[#121212] rounded-lg p-4 mt-4">
      <h3 className="text-lg font-bold text-white mb-4">Queue</h3>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => selectSong(index)}
            className={`p-2 rounded-md cursor-pointer transition-all duration-200 group ${
              index === currentSongIndex ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#282828] rounded flex items-center justify-center flex-shrink-0">
                {index === currentSongIndex ? (
                  <svg
                    className="w-3 h-3 text-[#1db954]"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                ) : (
                  <span className="text-[#b3b3b3] text-xs font-medium">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    index === currentSongIndex ? "text-[#1db954]" : "text-white"
                  }`}
                >
                  {song.title}
                </p>
                <p className="text-xs text-[#b3b3b3] truncate">{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
