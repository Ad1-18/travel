import React, {useState, useEffect} from 'react'
import './Hotel.css'
import HotelResult from "./Components/HotelResult.js"
import Room from "./Components/Room.js"
import EnterReview from "./Components/EnterReview.js"
import Review from "./Components/Review.js"


function Hotel(props) {
  const id = props.match.params.id;
  const http = require('follow-redirects').http;
  const _ = require('lodash')
  const [hotel, setHotel] = useState('');
  const [room, setRoom] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const array = []
  let avgReview=0;
  useEffect(()=>{
      const options = {
        'hostname': 'localhost',
        'port': 5000,
        'path': '/hotel/' +id,
        'headers': {
            'Content-Type': 'application/json'
          },
        'maxRedirects': 20
      };
      http.get(options, function (res) {
        const chunks = [];
        console.log('statusCode:', res.statusCode);
        res.on('data', function (chunk) {
            chunks.push(chunk);
            });

        res.on("end", function (chunk) {
            const body = Buffer.concat(chunks);
            const jsonbody = JSON.parse(body)
            handleChange(jsonbody);
          });
        });
      },[])
    const handleChange=(jsonbody)=>{
      setHotel(jsonbody);
    }
    while (!hotel){
      return (
        <div className = 'home'>
        <p>Loading</p>
      </div>
      )
    }
    const funct = (e)=>{
      if (e.target.id!==room && e.target.parentElement.id!==room){
        const roomID = e.target.id||e.target.parentElement.id
        setRoom(roomID)
        setRoomPrice(hotel.rooms[roomID].price)
      }
      else{
        setRoom("None")
        setRoomPrice(hotel.rooms[0].price)
      }
    }
    let c = 0
    for (let i=0; i<hotel.rooms.length; i++){
      if (i==0|| hotel.rooms[i].type!=array[c-1].type){
        array.push(hotel.rooms[i])
        c = c + 1;
      }
    }
    for (let i=0; i<hotel.reviews.length; i++ ){
      avgReview = avgReview + (hotel.reviews[i].rating/hotel.reviews.length)
    }
  return  (
    <div className = 'hotel'>
      {console.dir({hotel})}
      <div className = 'hotel-info'>
        <HotelResult hotelid={hotel._id} id={array[room]?.number||array[room]} img = {hotel.image} address = {hotel.location.street+", "+hotel.location.city+", "+hotel.location.state+" "+hotel.location.postcode} name = {hotel.name} desc = {hotel.desc} rating = {avgReview} price = {roomPrice||hotel.rooms[0].price}/>
      </div>

    <div className = 'heading'>
      Pick your preferred room.
    </div>

    <div className = 'room'>
      <div onClick = {funct}>
      <Room name = {_.capitalize(array[0].type)} desc = {array[0].occupancy+ " guest"} price = {array[0].price} id={"0"}/>
      </div>
      <div onClick = {funct}>
      <Room name = {_.capitalize(array[1].type)} desc = {array[1].occupancy+ " guest" }price = {array[1].price} id={"1"}/>
      </div>
      <div onClick = {funct} >
      <Room   name = {_.capitalize(array[2].type)} desc = {array[2].occupancy+ " guest"} price = {array[2].price} id={"2"}/>
      </div>
    </div>
    <div className= 'room'>
<<<<<<< HEAD
=======

    <h3 className="review__heading">Reviews-</h3>

>>>>>>> 33cf578963b0555bc653ae10c992c8de00cc0b8e

    <div className = 'heading'>
      Reviews
    </div>

<<<<<<< HEAD
=======

>>>>>>> 33cf578963b0555bc653ae10c992c8de00cc0b8e
        {hotel.reviews.map(el => (
            <Review
            hotel1={el}
            hotel1ID={hotel._id}
          />
        ))}
    </div>
    <EnterReview hotel={hotel}/>

    </div>
    )
}

export default Hotel
