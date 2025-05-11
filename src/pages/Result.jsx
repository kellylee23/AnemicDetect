import React from "react";

import styled from "styled-components";
// 전체 화면 컨테이너
const Container = styled.div`
  display: flex;
  width: 391px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  padding-top: 100px;
  padding-bottom: 80px;
  overflow-y: auto;
  box-sizing: border-box; /* padding 포함한 높이 계산 */
`;
function Result() {
  return <Container></Container>;
}

export default Result;
