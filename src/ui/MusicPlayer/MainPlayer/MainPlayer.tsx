import AlbumCover from "../AlbumCover/AlbumCover";
import Controls from "../Controls/Controls";
import Playlist from "../Playlist/Playlist";

export default function MainPlayer() {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Player Card - Spotify Style */}
      <div className="bg-gradient-to-b from-[#1e3264] to-[#121212] rounded-lg p-6 shadow-2xl">
        <div className="flex flex-col items-center">
          <AlbumCover />
          <Controls />
        </div>
      </div>

      {/* Playlist */}
      <Playlist />
    </div>
  );
}
