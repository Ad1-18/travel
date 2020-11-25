import React from 'react'
import './Room.css'

//name, description, price
function Room({ name, desc, price }) {

  return  (
    <div className = 'room'>
      <div className = 'room-info'>
        <h2>{name}</h2>
        <h4>{desc}</h4>
        <h3>₹{price}/night</h3>
      </div>
    </div>
    )
};

export default Room
