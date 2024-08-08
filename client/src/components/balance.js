import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Card } from "./card";
function Balance() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [displayedBalance, setDisplayedBalance] = useState("Checking");
  const [checkBalance, setCheckBalance] = useState(0);
  const [saveBalance, setSaveBalance] = useState(0);
  const [currentBal, setCurrentBal] = useState(0);

  useEffect(() => {
    console.log("Displayed Balance:" + displayedBalance);
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
        setCurrentBal(accounts.checking.balance)
      }

      return status
        ? console.log(status)
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleDropdown = (e) => {
    setDisplayedBalance(e.target.value);
    if(e.target.value === "Checking") {
      setCurrentBal(checkBalance);
    }
    else {
      setCurrentBal(saveBalance);
    }
  };

  return (
    <Card
      className="center"
      txtcolor="light"
      bgcolor="dark"
      header="Current Balances"
      body={
        <>
          <select
            style={{textAlign: "center"}}
            className="form-select"
            aria-label="Checking"
            onChange={handleDropdown}
            value={displayedBalance}
          >
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
          </select> <br/>
          <h1>{displayedBalance} Account:</h1>
          <h2>${currentBal}</h2> <br />
        </>
      }
    />
  );
}

export default Balance;
