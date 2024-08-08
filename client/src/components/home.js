import { Card } from "./card";
import { useCookies } from "react-cookie";
import axios from "axios";
import {useState, useEffect} from "react"
function Home(){
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState('');
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
      setUsername(user);
      return status
       ? console.log(status) : (removeCookie('token', {path:'/'}))
    };
    verifyCookie()
  }, [cookies, removeCookie]);
  const Logout  = () => {
    removeCookie('token',{path:'/'});
    window.location.reload();
  }
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title={loggedIn ? (`Welcome to the Bank ${username}!`):(`Welcome to the bank Guest!`)}
      text="You can move around using the navigation bar."
      body={<><img src="/bank.png" className="img-fluid" alt="Responsive img"/>
      <br/>
      <button className="btn btn-primary" onClick={Logout}>Logout</button>
      </>}
    />    
  );  
}

export default Home;
