import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Aws from "./pages/Aws/Aws";
import Grains from "./pages/Grains/Grains";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aws" element={<Aws />} />
        <Route path="grains" element={<Grains />} />
      </Routes>
    </BrowserRouter>
  );
}
