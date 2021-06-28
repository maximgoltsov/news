import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../../app-context";
import { newsUrl } from "../../../constants/routes";

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

  return (<div style={{ textAlign: "center" }}>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Login:
          <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" name="name" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>);
}

export default LoginPage;