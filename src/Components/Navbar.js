import React, { useState } from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
function Navbar() {
    const[searchItem, setSearchItem] = useState("");
    const handleChange= (e) => {
        setSearchItem({...searchItem, [e.target.name]: e.target.value.trim()});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchItem);
    }
    return (
        <div>
            <div className = "navbar" >
                <Link to="/">
                    <div className = "logo">
                        <img className="navbar__logo" src ='./images/logo.png' alt=""/>
                    </div>
                </Link>
                    <div className="navbar__search">
                        <input className="search__bar" name="searchItem" type="text" placeholder="Search for Hotels" onChange={handleChange} autoComplete="true"></input>
                        <button type= "submit" onClick={handleSubmit} name="submit"><i className="search__icon fas fa-search-location"></i></button>
                    </div>
            </div>
        </div>
    );
}

export default Navbar
