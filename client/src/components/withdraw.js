import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Card } from "./card";
function Withdraw() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [displayedBalance, setDisplayedBalance] = useState("checking");
  const [balance, setBalance] = useState(0);
  const [checkBalance, setCheckBalance] = useState(0);
  const [saveBalance, setSaveBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(10.00);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000/getbalance",
        {},
        { withCredentials: true }
      );
      const { status, accounts } = data;
      if (accounts != null) {
        setCheckBalance(accounts.checking.balance);
        setSaveBalance(accounts.savings.balance);
        setBalance(accounts.checking.balance);
      }

      return status
        ? console.log(status)
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  async function handleWithdraw() {
    if(!checkForNumber(withdrawAmount, "Not a Number")) return;
    axios.post("http://localhost:4000/withdraw", {accountType: displayedBalance, withdrawAmount: withdrawAmount}, {withCredentials: true})
    .then(function (res) {
      setResult(res.data.status)
    });
    
    setShow(false);
    
    
  }
  
  function clearForm() {
    setWithdrawAmount(10);
    setShow(true);
    window.location.reload();
  }
  const handleDropdown = (e) => {
    setDisplayedBalance(e.target.value);
    if (e.target.value === "checking") {
      setBalance(checkBalance);
    } else {
      setBalance(saveBalance);
    }
  };

  function checkForNumber(field, label) {
    if(isNaN(Number(field))) {
      setStatus('Error: ' + label)
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  return (
    <Card
      className="center"
      txtcolor="light"
      bgcolor="dark"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            <select
              style={{ textAlign: "center" }}
              className="form-select"
              aria-label="Checking"
              onChange={handleDropdown}
              value={displayedBalance}
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
            <br />
            Current Balance: <span style={{ margin: "right" }}>${balance}</span>
            <br />
            <br />
            Withdraw Amount:
            <br />
            <input
              type="text"
              className="form-control"
              id="withdrawAmount"
              placeholder="20.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            <h5>{result}</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Withdraw Again
            </button>
          </>
        )
      }
    />
  );
}

export default Withdraw;
