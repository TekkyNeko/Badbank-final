import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    const verifyCookie = async () => {
      if(!cookies.token) {
        setLoggedIn(false);
      }
      const {data} = await axios.post(
        "http://localhost:4000",
        {},
        {withCredentials: true}
      );
      const {status, user} = data;
      return status
       ? console.log(status) : (removeCookie("token"))
    };
    verifyCookie()
  }, [cookies, removeCookie]);
  const Logout = () => {
    removeCookie("token");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
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
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/CreateAccount/">
                Create Account
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login/">
                Login
              </Link>
            </li>
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
                  <Link className="nav-link" to="/alldata/">
                    AllData
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={Logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
