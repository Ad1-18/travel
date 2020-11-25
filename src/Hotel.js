import React from 'react'
import './Hotel.css'
import HotelResult from "./Components/HotelResult.js"
import Room from "./Components/Room.js"

function Hotel() {
  return  (
    <div className = 'hotel'>
      <div className = 'hotel-info'>
        <HotelResult img = "https://media.istockphoto.com/photos/hotel-room-suite-with-view-picture-id627892060?k=6&m=627892060&s=612x612&w=0&h=lVIi3QTDsZ1UDnMAjuy8ob9Zm6sBPCZ84x_e_OUl7Wk=" address = "72 Rue de Turbigo, 75003 Paris, France" name = "Hotel Lumière de la Seine" desc = "Close to Airport · Wifi · Pool" rating = {4.63} price = {15627}/>
      </div>

    <div className = 'room'>
      <Room name = "Single Room" desc = "1 guest · 1 bed · Wifi · Pool" price = {15627}/>

      <Room name = "Double Room" desc = "2 guest · 2 bed · Breakfast included · Wifi · Pool" price = {15998}/>

      <Room name = "Suite" desc = "2 guest · 1 bed · Breakfast included · Wifi · Pool" price = {16427}/>
    </div>



    </div>
    )
}

export default Hotel
