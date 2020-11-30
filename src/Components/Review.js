import React from 'react'
import ReactStars from "react-rating-stars-component";

function Review({hotel}){
    console.log("HOTELL>",hotel)
    const rating = parseInt(hotel.rating)
    console.log(rating)
    const userRating = {
        size: 20,
        value: rating,
        edit: false
      };
    return (<div className = 'review'>
    <h3></h3>
    
    <ReactStars {...userRating}></ReactStars>
    <div>
    <p>{hotel.review}</p>
    <p className="name"><em> -{hotel.userId}</em></p>
    </div>
  </div>
    )
}


export default Review
