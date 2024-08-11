import { useState } from "react";
import { Card } from "./card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function CreateAccount(){
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password:"",
    username: ""
  });
  const {email, password, username} = inputValue;
  const handleOnChange = (e) => {
    const {name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    console.log(err);
  }
  const handleSuccess = (msg) => {
    console.log(msg);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };


  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  return (
    <Card
      className="center"
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <form onSubmit={handleSubmit}>
              Username<br/>
              <input type="text" name="username" className="form-control" id="username" placeholder="Enter name" value={username} onChange={handleOnChange} /><br/>
              Email address<br/>
              <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={handleOnChange}/><br/>
              Password<br/>
              <input type="password" name="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handleOnChange}/><br/>
              <button type="submit" className="btn btn-light">Create Account</button>
              </form>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light">Add another account</button>
              </>
            )}
    />  
  )
}

export default CreateAccount;