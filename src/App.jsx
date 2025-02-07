import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import DetalhesNoticia from "./pages/DetalhesNoticia";
import Noticias from "./pages/Noticias";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/d" element={<DetalhesNoticia />} />
          <Route path="/de" element={<Noticias />} />
         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
