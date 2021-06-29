import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  height: 100vh;

  @media(max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledAppContent = styled.div`
  flex-grow: 1;
  padding: 10px 20px;
`;