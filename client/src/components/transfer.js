import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Card } from "./card";
function Transfer() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState(10.0);
  const [transferTo, setTransferTo] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        `http://breckin-bentchfullstackbankingapplication.tekkycat.com/getbalance`,
        {},
        { withCredentials: true }
      );
      const { status, accounts } = data;
      if (accounts != null) {
        setBalance(accounts.checking.balance);
      }

      return status
        ? console.log(status)
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handleTransfer() {
    if (!validate(transferTo, "Please input a username")) return;
    if (!checkForNumber(transferAmount, "Not a Number")) return;
    axios.post(
      `http://breckin-bentchfullstackbankingapplication.tekkycat.com/transfermoney`,
      { transferAmount: transferAmount, username: transferTo },
      { withCredentials: true }
    ).then(function (res) {
      if(res.data.err !== undefined)
      {
        setResult(res.data.err);
      } else {
        setResult("Money Transferred Successfully!");
      }
      
    });
    setShow(false);
  }

  function clearForm() {
    setTransferAmount(10);
    setShow(true);
    setResult('');
    navigate("/");
  }

  function checkForNumber(field, label) {
    if (isNaN(Number(field))) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  return (
    <Card
      className="center"
      txtcolor="light"
      bgcolor="dark"
      header="Transfer"
      status={status}
      body={
        show ? (
          <>
            Input the username you want to transfer money to:
            <br />
            <br />
            <input type="text" name="transferTo" className="form-control" id="transferTo" placeholder="Enter name" value={transferTo}
              onChange={(e) => setTransferTo(e.currentTarget.value)}
            />
            <br />
            Current Balance: <span style={{ margin: "right" }}>${balance}</span>
            <br />
            <br />
            Transfer Amount:
            <br />
            <input
              type="text  "
              className="form-control"
              id="transferAmount"
              placeholder="20.00"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleTransfer}
            >
              Transfer
            </button>
          </>
        ) : (
          <>
            <h5>{result}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Back to Home
            </button>
          </>
        )
      }
    />
  );
}

export default Transfer;
