import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setLoggedIn(false);
      }
      const { data } = await axios.post(
        "http://breckin-bentchfullstackbankingapplication.tekkycat.com",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status ? console.log(status) : removeCookie("token");
    };
    verifyCookie();
  }, [cookies, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
    window.location.reload()
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            src="/bank.png"
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          BadBank
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/deposit/">
                    Deposit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/withdraw/">
                    Withdraw
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/balance/">
                    Balance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/transfer/">
                    Transfer
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item text-end">
                  <Link className="nav-link" to="/CreateAccount/">
                    Create Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login/">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {loggedIn ? (
          <>
          <span className="nav-item d-flex">
          <button className="nav-link" style={{ padding: "0px 20px 0px 0px" }} onClick={Logout}>
            Logout
          </button>
        </span>
        <span
          className="d-flex nav-item"
          style={{ paddingRight: "20px" }}
        >
          {username}
        </span>
          </>
        ) : (<></>)}
      </nav>
    </>
  );
}

export default NavBar;
