import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Card } from "./card";
function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [displayedBalance, setDisplayedBalance] = useState("checking");
  const [balance, setBalance] = useState(0);
  const [checkBalance, setCheckBalance] = useState(0);
  const [saveBalance, setSaveBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(10.00);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/getbalance`,
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

  async function handleDeposit() {
    if(!checkForNumber(depositAmount, "Not a Number")) return;
    axios.post(`${process.env.REACT_APP_SERVER_URL}/deposit`, {accountType: displayedBalance, depositAmount: depositAmount}, {withCredentials: true});
    setShow(false);
  }
  
  function clearForm() {
    setDepositAmount(10);
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
      header="Deposit"
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
            Deposit Amount:
            <br />
            <input
              type="text"
              className="form-control"
              id="depositAmount"
              placeholder="20.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Deposit Again
            </button>
          </>
        )
      }
    />
  );
}

export default Deposit;
