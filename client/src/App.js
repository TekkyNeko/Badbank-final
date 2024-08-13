import NavBar from "./components/navbar";
import { Routes, Route } from "react-router";
import Login from "./components/login";
import CreateAccount from "./components/createaccount";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Balance from "./components/balance";
import Transfer from "./components/transfer";
import Home from "./components/home";
import "./App.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Routes className="container" style={{ padding: "20px" }}>
          <Route path="/" element={<Home />} />
          <Route path="/loginPage/" element={<Login />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/depositPage/" element={<Deposit />} />
          <Route path="/withdrawPage/" element={<Withdraw />} />
          <Route path="/balance/" element={<Balance />} />
          <Route path="/transfer/" element={<Transfer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
