import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "./card";
function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
  const handleSuccess = (msg) => {
    console.log(msg);
  };

  const handleError = (msg) => {
    console.log(msg);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...setInputValue,
      email: "",
      password: "",
    });
  };

  function clearForm() {
    setShow(true);
  }

  return (
    <Card
      className="center"
      txtcolor="light"
      bgcolor="dark"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={handleOnChange}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={handleOnChange}
              />
              <br />
              <button type="submit" className="btn btn-light">
                Login
              </button>
            </form>
            <div>
              Don't have an account? <Link to={"/CreateAccount"}>Sign Up</Link>
            </div>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Logout
            </button>
          </>
        )
      }
    />
  );
}

export default Login;
