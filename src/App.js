import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar.js";
import Login from "./Components/Login.js";
import About from "./Components/About.js";
import Home from "./Components/Home.js";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path ="/login">
          <Login />
        </Route>
        <Route path="/about">
          <Navbar />
          <About />
        </Route>
        <Route path="/">
          <Navbar />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
