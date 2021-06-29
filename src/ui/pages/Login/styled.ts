import styled from "styled-components";

export const StyledFormInput = styled.div`
  padding: 5px 0;

  input {
    border: 1px solid;
    border-radius: 10px;
    padding: 3px 10px;
  } 

  > div {
    display: inline-block;
    width: 75px;
  }
`;

export const StyledLoginFormContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLoginForm = styled.form`
  height: min-content;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(1, 1, 1, 0.2);

  button {
    background-color: transparent;
    font-size: 15px;
    border: 1px solid;
    border-radius: 10px;
    padding: 2px 10px;

    &:hover {
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
`;