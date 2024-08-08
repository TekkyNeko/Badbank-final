import { useState } from "react";
import { Card } from "./card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Deposit(){
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(0);

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleDeposit(){
    
    setShow(false);
  }    

  function clearForm(){
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      className="center"
      txtcolor="light"
      bgcolor="dark"
      header="Deposit"
      status={status}
      body={show ? (  
              <>
              Current Balance: <span style={{margin: "right"}}>{balance}</span> <br/>
              <br/>
              Deposit Amount:<br/>
              <input type="number" className="form-control" id="depositAmount" placeholder="20.00" value={balance} onChange={e => setBalance(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Deposit Again</button>
              </>
            )}
    />  
  )
}

export default Deposit;