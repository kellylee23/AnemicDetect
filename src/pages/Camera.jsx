import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { BsFillCameraFill } from "react-icons/bs";
import { GrPowerCycle } from "react-icons/gr";

// 전체 화면 래퍼
const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  margin: 0 auto;
  background: #ffffff;
  font-family: "Inter", sans-serif;
`;

// 상단 텍스트
const Title = styled.div`
  position: absolute;
  width: 68px;
  height: 19px;
  left: 50px;
  top: 129px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

// 캡처 영역 박스
const CaptureBox = styled.div`
  position: absolute;
  width: 275px;
  height: 381px;
  left: 50px;
  top: 170px;
  border: 3px solid #000000;
  border-radius: 20px;
  overflow: hidden;
`;

// 카메라 컴포넌트 감싸는 div
const StyledWebcam = styled(Webcam)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 카메라 아이콘
const CameraIcon = styled(BsFillCameraFill)`
  position: absolute;
  width: 45px;
  height: 45px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #656ebd;
  cursor: pointer;
`;

// 하단 캡쳐 버튼
const SideCircle = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  left: 260px;
  top: 604px;
  background: rgba(217, 217, 217, 0.3);
  border-radius: 50%;
`;

const BottomCircleOuter = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 140px;
  top: 597px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
`;

const BottomCircleInner = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  left: 147px;
  top: 604px;
  background: rgba(222, 217, 217, 0.3);
  border-radius: 50%;
`;

const Change = styled(GrPowerCycle)`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  cursor: pointer;
`;

const CapturedImage = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  border: 2px solid #000;
`;

const PermissionText = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: facingMode } } })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, [facingMode]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <Wrapper>
      <Title>CAMERA</Title>
      <CaptureBox>
        {hasPermission === false ? (
          <PermissionText>
            카메라 접근 권한이 거부되었습니다.
            <br />
            브라우저 설정에서 권한을 허용해주세요.
          </PermissionText>
        ) : hasPermission === null ? (
          <PermissionText>카메라 권한을 요청 중입니다...</PermissionText>
        ) : (
          <StyledWebcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: { exact: facingMode } }}
          />
        )}
      </CaptureBox>

      <BottomCircleOuter />
      <BottomCircleInner onClick={capture}>
        <CameraIcon />
      </BottomCircleInner>

      {imgSrc && <CapturedImage src={imgSrc} alt="Captured" />}
      <SideCircle>
        <Change onClick={toggleFacingMode} />
      </SideCircle>
    </Wrapper>
  );
}

export default Camera;
