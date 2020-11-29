import React, {useState, useEffect} from "react"
import './Home.css'
import Banner from "./Components/Banner.js"
import Card from "./Components/Card.js"
import {Link} from "react-router-dom";
import { useStateValue } from "./Components/StateProvider.js";

function Home() {
  const [{user},dispatch] = useStateValue();
  const http = require('follow-redirects').http;
  const [recomm, setRecomm] = useState('');
  useEffect(()=>{
    if (user!=null ){

      console.log("USER IS>>>",user)
      const options = {
        'hostname': 'localhost',
        'port': 5000,
        'path': '/user/rec/' +user.id,
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
            if(jsonbody.length===3){
              handleChange(jsonbody);
            }
          });
        });
     };
  },[])

    const handleChange = (jsonbody)=>{
      setRecomm(jsonbody)
      }
  if (!recomm){
    return (
      <div className = 'home'>
      <Banner />
      <p>No recommendations yet!</p>
    </div>

    )
  }
  return  (
    <div className = 'home'>
      <Banner />
      {console.dir({recomm})}

      <div className = 'home-cards'>
        <Link to={"/hotel/"+recomm[0]._id}>
        <Card
          src = {recomm[0].image}
          title = {recomm[0].name}
          desc = {recomm[0].desc}
          price = {"₹"+recomm[0].rooms[0].price}
          id = {recomm[0]._id}
        />
        </Link>
        <Link to={"/hotel/"+recomm[1]._id}>
        <Card
          src = {recomm[1].image}
          title = {recomm[1].name}
          desc = {recomm[1].desc}
          price = {"₹"+recomm[1].rooms[0].price}
          id = {recomm[1]._id}
        />
        </Link>
        <Link to={"/hotel/"+recomm[2]._id}>
        <Card
          src = {recomm[2].image}
          title = {recomm[2].name}
          desc = {recomm[2].desc}
          price = {"₹"+recomm[2].rooms[0].price}
          id = {recomm[2]._id}
        />
        </Link>
      </div>
    </div>
    )
}

export default Home
