import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Aws from "./pages/Aws/Aws";
import Grains from "./pages/Grains/Grains";
import MacLike from "./pages/MacLike/MacLike";
import MusicPlayer from "./pages/MusicPlayer/MusicPlayer";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aws" element={<Aws />} />
        <Route path="grains" element={<Grains />} />
        <Route path="mac-like" element={<MacLike />} />
        <Route path="music-player" element={<MusicPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}
