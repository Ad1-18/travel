import React from 'react';
import './SearchResult.css';
import StarIcon from "@material-ui/icons/Star";

//Total is price * size of date range
function SearchResult(
  {img, address, name, desc, rating, price}
) {

  return (
    <div className = 'searchresult'>

      <img src = {img} alt = "" />

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
              <h2>{price}</h2>
            </div>

          </div>

      </div>

    </div>
  )
}


export default SearchResult
