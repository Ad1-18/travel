import React, { useState } from 'react'
import './Banner.css'
import DatePicker from "./DatePicker.js"
//import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";


function Banner() {
  //const history = useHistory();
  const [showsearch, setshowsearch] = useState (false);

  return  (
    <div className = 'banner'>

      {/* <div className = 'banner-search'>
        {showsearch && <DatePicker />}

        <Button onClick={() => setshowsearch(!showsearch)} className = 'banner-search-button' variant = 'outlined'> {showsearch ? <h4> <strong> Close </strong> </h4> : <h4> <strong> Search Dates </strong> </h4>} </Button>
      </div> */}

      <div className = 'banner-text'>
        <h1>Relaxation that lightens your mind, not your wallet.</h1>
        <h5>The best prices for travellers on-the-go.<br/> Hotels that assure a quality stay and world-class facilities.</h5>
      </div>

    </div>
        )
}

export default Banner
