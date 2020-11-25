import React from 'react';
import './HotelResult.css';
import { useHistory } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";

//Total is price * size of date range
function HotelResult(
  {img, address, name, desc, rating, price}
) {
  const history = useHistory();

  return (
    <div className = 'hotelresult'>

      <img src = {img} alt = "" />

      <div className = 'hotelresult-info'>

          <div className = 'info-top'>
            <p>{address}</p>
            <h3><strong>{name}</strong></h3>
            <p>_____</p>
            <p>{desc}</p>
          </div>

          <div className = 'info-bottom'>

            <div className = 'hotelresult-rating'>
              <StarIcon className = 'hotelresult-star' />
              <p><strong>{rating}</strong></p>
            </div>

            <div className = 'hotelresult-price'>
              <div className = 'hotelresult-book'>
                <Button onClick = {() => history.push('/')}>
                  <h5><strong>Book Now</strong></h5>
                </Button>
              </div>
              <h2>₹{price}/night</h2>
            </div>

          </div>



      </div>

    </div>
  )
}


export default HotelResult
