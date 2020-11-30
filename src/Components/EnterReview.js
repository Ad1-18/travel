import './EnterReview.css'
import ReactStars from "react-rating-stars-component";
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {useStateValue} from "./StateProvider.js";
import { useAlert } from 'react-alert';

function EnterReview({hotel}) {

  const hotelID = hotel._id;
  const hotelData = hotel;
  const [{user}, dispatch] = useStateValue();
  const [review, setReview]= useState('');
  const [rating, setRating]= useState('');
  const [char, setChar] = useState('250');
  const http = require('follow-redirects').http;
    const _ = require('lodash')
    const alert = useAlert();
    const history = useHistory();
    const options = {
        'method': 'POST',
        'hostname': 'localhost',
        'port': 5000,
        'path': '/hotel/review/add',
        'headers': {
            'Content-Type': 'application/json'
        },
        'maxRedirects': 20
    }; 

    

    const req = http.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            if (res.statusCode!==200){
                alert.show(_.lowerCase(body.toString()))
            }
            else{
                alert.show("Review posted successfull!")
            }
        });
    });
  const handleReview= (e)=> {
    setReview(e.target.value);
    if (review){
        setChar(250-review.length)
    }
  }
  const postReview = (e) => {
    e.preventDefault()
    if (user===null){
      history.push("/login")
      return
    }
    const postData = JSON.stringify({"hotelId":hotelID,"userId":user.id,"review":review, "rating":rating });
    let post = true;
    for (let i=0; i<hotelData.reviews.length; i++){
      if (hotelData.reviews[i].userId==user.id){
        alert.show("You have already posted a review")
        post = false;
        break;
      }
    }
    if( post===true){
        req.write(postData);
        req.end();
    }

  }
  const stars = {
    size: 50,
    count: 5,
    color: "grey",
    activeColor: "#48bf91",
    value: 7.5,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fas fa-star" />,
    onChange: newValue => {
      setRating(newValue);
    }
  };
  return  (
    <div className = 'review'>
        <h3>Leave a review here!</h3>
        
        <ReactStars {...stars}></ReactStars>
        <div>
        <textarea className="review__text" onChange={handleReview} name = 'review' placeholder = "Enter a review for the hotel" type = 'text' />
        <p className="chars__left">{char + " characters left"}</p>
        <button id="rev" className="review__post btn btn-success btn-lg" type="review" onClick={postReview}>Post</button>
        </div>
      </div>
    )
};

export default EnterReview
