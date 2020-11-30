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
  return  (
    <div className = 'hotel'>
      {console.dir({hotel})}
      <div className = 'hotel-info'>
        <HotelResult id={room} img = {hotel.image} address = {hotel.location.street+", "+hotel.location.city+", "+hotel.location.state+" "+hotel.location.postcode} name = {hotel.name} desc = {hotel.desc} rating = {4.63} price = {roomPrice||hotel.rooms[0].price}/>
      </div>

    <div className = 'room'>
      <div onClick = {funct}>
      <Room name = {_.capitalize(hotel.rooms[0].type)} desc = {hotel.rooms[0].occupancy+ " guest · 1 bed · Wifi · Pool"} price = {hotel.rooms[0].price} id={"0"}/>
      </div>
      <div onClick = {funct}>
      <Room  name = {_.capitalize(hotel.rooms[1].type)} desc = {hotel.rooms[1].occupancy+ " guest · 2 bed · Breakfast included · Wifi · Pool" }price = {hotel.rooms[1].price} id={"1"}/>
      </div>
      <div onClick = {funct} >
      <Room   name = {_.capitalize(hotel.rooms[2].type)} desc = {hotel.rooms[2].occupancy+ "guest · 1 bed · Breakfast included · Wifi · Pool"} price = {hotel.rooms[2].price} id={"2"}/>
      </div>
    </div>
    <div className= 'room'>
    <h3 className="review__heading">Reviews-</h3>
        {hotel.reviews.map(el => (
            <Review
            hotel={el}
          />
        ))}
    </div>
    <EnterReview hotel={hotel}/>

    </div>
    )
}

export default Hotel
