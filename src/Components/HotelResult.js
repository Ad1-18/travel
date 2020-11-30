import React, {useState} from 'react';
import './HotelResult.css';
import { useHistory } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Total is price * size of date range
function HotelResult(
  {img, address, name, desc, rating, price, id}
) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();
  console.log("ROOM ID>>", id)
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(startDate.getFullYear(),startDate.getMilliseconds())
  }
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
            {
                        Array(Math.floor(rating))
                        .fill()
                        .map(()=> (
                          <StarIcon className = 'hotelresult-star' />
                        ))
            }
              <p><strong>{rating}</strong></p>
            </div>

            <div className = 'hotelresult-price'>
              <div className = 'hotelresult-book'>
                <Button onClick = {() => history.push('/')}>
                  <h5><strong>Book Now</strong></h5>
                  </Button>
                  <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
              </div>
              <h2>₹{price}/night</h2>
            </div>
          </div>



      </div>

    </div>
  )
}


export default HotelResult
