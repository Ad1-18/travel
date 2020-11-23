import React from 'react'
import './Home.css'
import Banner from "./Components/Banner.js"
import Card from "./Components/Card.js"

function Home() {
  return  (
    <div className = 'home'>
      <Banner />
      <div className = 'home-cards'>
        <Card
          src = "https://s3.amazonaws.com/luxe-prod-website/images/Panor-glam-a__Seven_swank_rooms_w.2e16d0ba.fill-1200x600.jpg"
          title = "Penthouse in Dubai"
          desc = "Enjoy the luxurious Dubai skyline in a room with a view."
          price = "₹4,677/night"
        />
        <Card
          src = "https://bstatic.com/xdata/images/xphoto/1182x887/63486802.jpg?k=6140686925115e16214dd4a6b7ccfdc268e0ea1b38eb7a769ed593fb5bd6f2a2&o=?size=S"
          title = "Villa + Pool in Goa"
          desc = "Great amenities and privacy, right by the beach."
          price = "₹1,312/night"
        />
        <Card
          src = "https://cf.bstatic.com/images/hotel/max1024x768/153/153006731.jpg"
          title = "Modern Living in Amsterdam"
          desc = "Stay well-connected and explore this unique city with comfort."
          price = "₹2,014/night"
        />
      </div>
    </div>
    )
}

export default Home
