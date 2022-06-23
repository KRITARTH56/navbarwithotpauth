import "./App.css";
import { Navbar } from "./components/navbar";
import { Switch, Route } from "react-router-dom";
import MobileInput from "./components/otp-auth/MobileInput";
import UserDetails from "./components/otp-auth/UserDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/DD" exact component={MobileInput} />
        <Route path="/userdetails" component={UserDetails} />
      </Switch>
    </div>
  );
}

export default App;
