import React from "react";
import { useLocation } from "react-router-dom";

function Capture() {
  const location = useLocation();
  const croppedImages = location.state?.croppedImages || [];

  return (
    <div>
      <h2>전처리된 손톱 이미지 결과</h2>
      {croppedImages.length === 0 ? (
        <p>이미지가 없습니다.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {croppedImages.map((url, index) => (
            <img key={index} src={url} alt={`손톱 ${index + 1}`} width="150" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Capture;
