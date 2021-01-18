import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signInWithGoogle } from "../helpers/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e) => {
    const type = e.target.name;
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      try {
        await signIn(email, password).then((res) => console.log(res));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-wrap">
        <h1 className="title">로그인</h1>
        <form className="sign-form" onSubmit={handleOnSubmit}>
          <div>
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              name="email"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              name="password"
              value={password}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <button type="submit">로그인</button>
          </div>
          <div className="hr-ligthgray"></div>
          <div>
            <button
              type="button"
              className="sign-social-btn google-login"
              onClick={handleGoogleSignIn}
            />
          </div>
        </form>
        <hr></hr>
        <p>
          회원이 아니신가? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
