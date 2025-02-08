import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import DetalhesNoticia from "./pages/DetalhesNoticia";
import Noticias from "./pages/Noticias";
import Todas from "./pages/Todas";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/criar" element={<DetalhesNoticia />} />
          <Route path="/gerenciar" element={<Noticias />} />
          <Route path="/lupas" element={<Todas />} />
         </Routes>
         <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
