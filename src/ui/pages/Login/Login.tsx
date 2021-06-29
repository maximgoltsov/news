import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../../app-context";
import { newsUrl } from "../../../constants/routes";
import { StyledFormInput, StyledLoginForm, StyledLoginFormContainer } from "./styled";

const LoginPage: React.FC = () => {
  const { api } = useAppContext();
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const loginResult = api.user.login(login, password);
    if (loginResult) history.push(newsUrl);
    else {
      setLogin("");
      setPassword("");
    }
  }

  return (
    <StyledLoginFormContainer>
      <StyledLoginForm onSubmit={handleSubmit}>
        <StyledFormInput>
          <div>Login</div>
          <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" name="name" />
        </StyledFormInput>
        <StyledFormInput>
          <div>Password</div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
        </StyledFormInput>
        <div>
          <button type="submit">Submit</button>
        </div>
      </StyledLoginForm>
    </StyledLoginFormContainer>
  );
}

export default LoginPage;