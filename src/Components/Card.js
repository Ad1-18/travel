import React from 'react'
import './Card.css'

//source, title, description, price
function Card({ src, title, desc, price }) {

  return  (
    <div className = 'card'>
      <img src = {src} alt = "" />
      <div className = 'card-info'>
        <h2>{title}</h2>
        <h4>{desc}</h4>
        <h3>{price}</h3>
      </div>
    </div>
    )
};

export default Card
