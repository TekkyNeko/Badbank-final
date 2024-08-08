import NavBar from "./components/navbar";
import { Routes, Route } from "react-router";
import Login from "./components/login";
import CreateAccount from "./components/createaccount";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Balance from "./components/balance";
import AllData from "./components/alldata";
import Home from "./components/home";
import "./App.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Routes className="container" style={{ padding: "20px" }}>
          <Route path="/" element={<Home />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/balance/" element={<Balance />} />
          <Route path="/alldata/" element={<AllData />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
