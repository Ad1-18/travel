import React from 'react'
import './Room.css'

//name, description, price
function Room({ name, desc, price,id }) {
  const roomSelect = () => {
    const el = document.getElementsByClassName("selected")
    while (el[0] &&el[0].id!=id) {
        el[0].classList.remove("selected")
    }
    
    document.getElementById(id).classList.toggle("selected")
  }

  return  (
    <div  className = 'room' >
      <div id={id} className = 'room-info' onClick={roomSelect}>
        <h2>{name}</h2>
        <h4>{desc}</h4>
        <h3>₹{price}/night</h3>
      </div>
    </div>
    )
};

export default Room
