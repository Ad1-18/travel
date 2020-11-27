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
            const bodyString = body.toString();
            const jsonbody = JSON.parse(body)
            if(jsonbody.length===3){
              handleChange(jsonbody);
            }
            console.log(bodyString);
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
      <p>Loading</p>
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
          src = "https://s3.amazonaws.com/luxe-prod-website/images/Panor-glam-a__Seven_swank_rooms_w.2e16d0ba.fill-1200x600.jpg"
          title = {recomm[0].name}
          desc = {recomm[0].desc}
          price = {"₹"+recomm[0].rooms[0].price}
          id = {recomm[0]._id}
        />
        </Link>
        <Link to={"/hotel/"+recomm[1]._id}>
        <Card
          src = "https://bstatic.com/xdata/images/xphoto/1182x887/63486802.jpg?k=6140686925115e16214dd4a6b7ccfdc268e0ea1b38eb7a769ed593fb5bd6f2a2&o=?size=S"
          title = {recomm[1].name}
          desc = {recomm[1].desc}
          price = {"₹"+recomm[1].rooms[0].price}
          id = {recomm[1]._id}
        />
        </Link>
        <Link to={"/hotel/"+recomm[2]._id}>
        <Card
          src = "https://cf.bstatic.com/images/hotel/max1024x768/153/153006731.jpg"
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
