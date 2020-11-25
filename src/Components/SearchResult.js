import React from 'react';
import './SearchResult.css';
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";

//Total is price * size of date range
function SearchResult(
  {img, address, name, desc, rating, price}
) {
    const history = useHistory();
    //make sure you click on the image
  return (
    <div className = 'searchresult'>

      <img src = {img} alt = "" onClick = {() => history.push('/hotel')}/>

      <div className = 'searchresult-info'>

          <div className = 'info-top'>
            <p>{address}</p>
            <h3>{name}</h3>
            <p>_____</p>
            <p>{desc}</p>
          </div>

          <div className = 'info-bottom'>

            <div className = 'searchresult-rating'>
              <StarIcon className = 'searchresult-star' />
              <p><strong>{rating}</strong></p>
            </div>

            <div className = 'searchresult-price'>
              <h2>₹{price}/night</h2>
            </div>

          </div>

      </div>

    </div>
  )
}


export default SearchResult
