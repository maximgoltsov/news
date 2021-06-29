import styled from "styled-components";

export const StyledSideBar = styled.div`
  width: 200px;
  background-color: antiquewhite;
  padding: 10px 0;
  text-align: center;
`;

export const StylesBarList = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    padding: 2px 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;