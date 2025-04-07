import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: "environment" } } })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  if (hasPermission === null) {
    return <div>카메라 권한을 요청 중입니다...</div>;
  }
  if (hasPermission === false) {
    return (
      <div>
        카메라 접근 권한이 거부되었습니다. 브라우저 설정에서 권한을
        허용해주세요.
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Webcam Capture</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        videoConstraints={{ facingMode: { exact: "environment" } }}
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <div>
          <h2>Captured Photo:</h2>
          <img src={imgSrc} alt="captured" />
        </div>
      )}
    </div>
  );
}

export default App;
