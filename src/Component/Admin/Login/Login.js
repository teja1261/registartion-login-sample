import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Wrapper from "../../../Helpers/Wrapper";
import { loginAuth } from "src/Services/loginAuth";
import { RotatingLines } from "react-loader-spinner";
import Cookies from "js-cookie";
import Input from "../../UI/Input/Input";

import style from "./Login.module.css";

const Login = (props) => {
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const onChangeUsername = (event) => {
    setEmail(event.target.value);
    setError();
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setError();
  };

  const onSubmitSuccess = (jwtTkoken, username) => {
    const { history } = props;

    Cookies.set("jwt_token", jwtTkoken, {
      expires: 365,
      path: "/",
    });

    localStorage.setItem("username", username);
    history.replace("/");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);
    const loginRequest = await loginAuth(email, password);
    if (loginRequest.ok) {
      const dataRes = await loginRequest.json();
      setLoader(false);
      onSubmitSuccess(dataRes.token, dataRes.data.fullName);
    } else {
      setLoader(false);
      setError(loginRequest.statusText);
    }
  };

  const onCancelCall = () => {
    setEmail("");
    setError();
    setPassword("");
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      {loader === true ? (
        <div className="login-form-container">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div className={style.Login}>
          <h1>Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={submitHandler}>
            <Input
              type="email"
              name="email"
              label="Email address"
              id="email"
              placeholder="Enter email"
              text="We'll never share your email with anyone else."
              isText="true"
              onChange={onChangeUsername}
              value={email}
            />

            <Input
              type="password"
              label="Password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChangePassword}
              value={password}
            />

            <button
              className={style.new_button}
              variant="primary"
              type="submit"
            >
              Submit
            </button>
            <button
              className={style.new_button}
              variant="primary"
              onClick={onCancelCall}
            >
              Cancel
            </button>
            <br />
            <br />
            <br />
            <p style={{ display: "inline" }}>Don't have an account? </p>
            <a className={style.Link} href="/signup">
              Register
            </a>
            <br />
            <a className={style.Link} href="/forget-password">
              Forget Password ?
            </a>
          </form>
        </div>
      )}
    </Wrapper>
  );
};

export default Login;
