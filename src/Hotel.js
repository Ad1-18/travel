import React, {useState, useEffect} from 'react'
import './Hotel.css'
import HotelResult from "./Components/HotelResult.js"
import Room from "./Components/Room.js"
import EnterReview from "./Components/EnterReview.js"

function Hotel(props) {
  const id = props.match.params.id;
  const http = require('follow-redirects').http;
  const _ = require('lodash')
  const [hotel, setHotel] = useState('');
  console.log(id)
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
            console.log("JSONBODY>>",hotel)
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
    const funct = (id)=>{
      console.log("working",id)
    }
  return  (
    <div className = 'hotel'>
      {console.dir({hotel})}
      <div className = 'hotel-info'>
        <HotelResult img = {hotel.image} address = {hotel.location.street+", "+hotel.location.city+", "+hotel.location.state+" "+hotel.location.postcode} name = {hotel.name} desc = {hotel.desc} rating = {4.63} price = {hotel.rooms[0].price}/>
      </div>

    <div className = 'room'>
      <div  id={"a"} onClick = {()=>{console.log(id)}}>
      <Room name = {_.capitalize(hotel.rooms[0].type)+" Room"} desc = {hotel.rooms[0].occupancy+ " guest · 1 bed · Wifi · Pool"} price = {hotel.rooms[0].price} id={"1"}/>
      </div>
      <div onClick = {(id)=>{console.log(id)}}>
      <Room id={"b"} name = {_.capitalize(hotel.rooms[1].type)+" Room"} desc = {hotel.rooms[1].occupancy+ " guest · 2 bed · Breakfast included · Wifi · Pool" }price = {hotel.rooms[1].price} id={"2"}/>
      </div>
      <div onClick = {(id)=>{console.log(id)}} >
      <Room  id={"c"} name = {_.capitalize(hotel.rooms[2].type)} desc = {hotel.rooms[2].occupancy+ "guest · 1 bed · Breakfast included · Wifi · Pool"} price = {hotel.rooms[2].price} id={"3"}/>
    </div>

    <div>
    <EnterReview />
    </div>
    
    </div>


    </div>
    )
}

export default Hotel
