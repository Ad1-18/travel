import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar.js";
import Home from './Home';
import SearchResults from './SearchResults';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App()  {
  return (

    <div className = "app">
    <Router>

      <Navbar />

      <Switch>
        <Route path = "/search">
            <SearchResults />
        </Route>
        <Route path = "/">
          <Home />
        </Route>
      </Switch>

    </Router>
    </div>
  );
}


export default App;
