import { useState } from "react";
import { Card } from "./card";
function Withdraw(){
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

  function handleWithdraw(){
    
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
      header="Withdraw"
      status={status}
      body={show ? (  
              <>
              Current Balance: <span style={{margin: "right"}}>${balance}</span> <br/>
              <br/>
              Withdraw Amount:<br/>
              <input type="number" className="form-control" id="withdrawAmount" placeholder="20.00" value={balance} onChange={e => setBalance(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Withdraw Again</button>
              </>
            )}
    />  
  )
}

export default Withdraw;