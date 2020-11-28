import React, {useState, useEffect} from 'react'
import './Hotel.css'
import HotelResult from "./Components/HotelResult.js"
import Room from "./Components/Room.js"

function Hotel(props) {
  const id = props.match.params.id;
  const http = require('follow-redirects').http;
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
            const bodyString = body.toString();
            const jsonbody = JSON.parse(body)
            handleChange(jsonbody);
          });
        });
      },[])
    const handleChange=(jsonbody)=>{
      setHotel(jsonbody);
    }
  return  (
    <div className = 'hotel'>
      {console.dir({hotel})}
      <div className = 'hotel-info'>
        <HotelResult img = {hotel.image} address = {hotel.location.street+", "+hotel.location.city+", "+hotel.location.state+" "+hotel.location.postcode} name = {hotel.name} desc = {hotel.desc} rating = {4.63} price = {hotel.rooms[0].price}/>
      </div>

    <div className = 'room'>
      <Room name = {hotel.room[0].type+"Room"} desc = "1 guest · 1 bed · Wifi · Pool" price = {hotel.rooms[0].price}/>

      <Room name = {hotel.room[1].type+"Room"} desc = "2 guest · 2 bed · Breakfast included · Wifi · Pool" price = {hotel.rooms[1].price}/>

      <Room name = {hotel.room[0].type} desc = "2 guest · 1 bed · Breakfast included · Wifi · Pool" price = {hotel.rooms[2].price}/>
    </div>



    </div>
    )
}

export default Hotel
