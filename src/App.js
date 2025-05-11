import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import GlobalStyle from "./styles/Globalstyles";
import Navbar from "./components/Navbar";
import React from "react";

import Camera from "./pages/Camera";
import Capture from "./pages/Capture";
import Result from "./pages/Result";

// import Webcam from "react-webcam";
// import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <div className="app-container">
        <Navbar />
        <Routes>
          {/* 메인페이지 - 카메라 */}
          <Route path="/" element={<Camera />} />

          {/* 캡쳐화면 */}
          <Route path="/capture" element={<Capture />} />

          {/* 결과 페이지 */}
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
