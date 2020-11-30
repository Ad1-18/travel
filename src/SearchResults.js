import React, {useState,useEffect} from 'react';
import './SearchResults.css';
import {Link} from "react-router-dom";
//SearchResult.js not the same as SearchResults.js
import SearchResult from "./Components/SearchResult.js"
import Navbar from "./Components/Navbar.js"


function SearchResults(props)  {
  const query = props.match.params.query;
  const http = require('follow-redirects').http;
  const [searchHotel, setSearchHotel]= useState('')
  useEffect(() => {
    const options = {
      'hostname': 'localhost',
      'port': 5000,
      'path': '/search/'+query,
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
          const searchHotels = JSON.parse(body)
          console.log(searchHotels)
          handleSearch(searchHotels);
        });
      });
    }, []);
    const handleSearch = (searchHotels) =>{
      setSearchHotel(searchHotels)
  }
  console.log(searchHotel)
 console.log("helllo>>",query)
  if (searchHotel.length==0){
    return(
      <div>
      <Navbar />
      <div className = 'searchresults'>

      <div className = 'searchresults-info'>
        <h2>Search Results</h2>
      </div>
      <h1>Oops, we couldn't find any match for that!</h1>
      </div>
      </div>
    )
  }
  else{
  return (
    <div>
      <Navbar />
    <div className = 'searchresults'>
      <div className = 'searchresults-info'>
        <h1>Search Results</h1>
      </div>
      {searchHotel.map(el => (
      <Link to={"/hotel/"+el._id}>
      <SearchResult 
        img = {el.image} 
        address = {el.location.city}
        name = {el.name} 
        desc = {el.desc} 
       price = {el.rooms[0].price}/></Link>)
      )}

    </div>
    </div>
  )}
}


export default SearchResults
