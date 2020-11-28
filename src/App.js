
import './App.css';
import Navbar from "./Components/Navbar.js";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js"
import About from "./Components/About.js";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Home';
import SearchResults from './SearchResults';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import Hotel from './Hotel';
const options = {
  timeout: 2000,
  transition: transitions.FADE
}
function App()  {
  return (

    <div className = "app">
      <AlertProvider template={AlertTemplate} {...options} >

        <Router>
          <Switch>
            <Route path ="/login">
              <Login />
            </Route>
            <Route path ="/signup">
              <Signup />
            </Route>
            <Route path="/about">
              <Navbar />
              <About />
            </Route>
            <Route path = "/search">
                <SearchResults />
            </Route>
            <Route path="/hotel/:id" render={(props) => <Hotel {...props} />}>
              {/* <Hotel id= /> */}
            </Route>
            <Route path = "/">
              <Navbar />
              <Home />
            </Route>
          </Switch>

        </Router>
      </AlertProvider>
    </div>
  );
}


export default App;
