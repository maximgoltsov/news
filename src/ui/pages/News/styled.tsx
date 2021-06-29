import styled from "styled-components";

export const StyledNewsFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  > div span {
    padding-right: 5px;
  }
  > div:not(:first-child) {
    padding-left: 20px;
  }
`;

export const StyledPagginatorContainer = styled.div`
  text-align: left;
  padding: 5px 0;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid;
  display: inline-block;

  button {
    background-color: transparent;
    border-radius: 10px;
    border: none;
    margin: 0 5px;
    padding: 5px 10px;

    &:hover{
      background-color: black;
      color: white;
    }
  }
`;

export const StyledNewsList = styled.div`
  margin-top: 10px;
  text-align: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const StyledNewsListItem = styled.div`
  box-sizing: border-box;
  border: 1px solid;
  padding: 5px;
  width: 33.3%;

  @media(max-width: 768px) {
    width: 50%;
  }
`;
