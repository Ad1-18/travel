import React from 'react';
import './SearchResults.css';
//SearchResult.js not the same as SearchResults.js
import SearchResult from "./Components/SearchResult.js"


function SearchResults()  {

  return (
    <div className = 'searchresults'>

      <div className = 'searchresults-info'>
        <p>(number) hotels  ·  (startDate) to (endDate)  ·  (number) guests</p>
        <h1>Search Results</h1>
      </div>

      <SearchResult img = "https://media.istockphoto.com/photos/hotel-room-suite-with-view-picture-id627892060?k=6&m=627892060&s=612x612&w=0&h=lVIi3QTDsZ1UDnMAjuy8ob9Zm6sBPCZ84x_e_OUl7Wk=" address = "72 Rue de Turbigo, 75003 Paris, France" name = "Hotel Lumière de la Seine" desc = "Breakfast · Wifi · Pool" rating = {4.63} price = {15627}/>

      <SearchResult img = "https://media-cdn.tripadvisor.com/media/photo-s/0e/50/f1/ab/superior-room-twin.jpg" address = "72 Rue de Turbigo, 75003 Paris, France" name = "Hotel Florence" desc = "Breakfast · Wifi" rating = {4.5} price = {15627}/>

      <SearchResult img = "https://media.istockphoto.com/photos/hotel-room-suite-with-view-picture-id627892060?k=6&m=627892060&s=612x612&w=0&h=lVIi3QTDsZ1UDnMAjuy8ob9Zm6sBPCZ84x_e_OUl7Wk=" address = "72 Rue de Turbigo, 75003 Paris, France" name = "Hotel Lumière de la Seine" desc = "Breakfast · Wifi · Pool" rating = {4.63} price = {15627}/>

    </div>
  )
}


export default SearchResults
