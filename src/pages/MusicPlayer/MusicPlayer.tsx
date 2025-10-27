import MainPlayer from "../../ui/MusicPlayer/MainPlayer/MainPlayer";
import { MusicPlayerProvider } from "../../context/musicPlayer/context";

export default function MusicPlayer() {
  return (
    <MusicPlayerProvider>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <MainPlayer />
      </div>
    </MusicPlayerProvider>
  );
}
