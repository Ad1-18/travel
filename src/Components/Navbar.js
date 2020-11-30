import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import { useStateValue } from "./StateProvider.js";

function Navbar() {
    const[{user,},dispatch] = useStateValue();
    const http = require('follow-redirects').http;
    const[searchItem, setSearchItem] = useState("");
    const[user_det, setUserDet] = useState("");
    useEffect(()=>{
        if (user!=null ){
          const options = {
            'hostname': 'localhost',
            'port': 5000,
            'path': '/user/' +user.id,
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
                console.dir({jsonbody})
                User_det(jsonbody);
              });
            });
         };
      },[]);
    
    const User_det = (jsonbody)=>{
        setUserDet({...user_det, fName:jsonbody.firstName, lName:jsonbody.lastName} )
    }
    const handleChange= (e) => {
        setSearchItem({...searchItem, [e.target.name]: e.target.value.trim()});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchItem);
    }
    const logout = () => {
        dispatch({
            type: 'REM_USER'
         });
    };
    return (
        <div>
            <div className = "navbar" >
                <Link to="/">
                    <div className = "logo">
                        <img className="navbar__logo" src ='./images/logo.png' alt=""/>
                    </div>
                </Link>
                {console.log("user IS>>",user)}
                <div className="navbar__search">
                        <input className="search__bar" name="searchItem" type="text" placeholder="Search for Hotels" onChange={handleChange} autoComplete="true"></input>
                        <button type= "submit" onClick={handleSubmit} name="submit"><i className="search__icon fas fa-search-location"></i></button>
                </div>
                <div className = "navbar__buttons">
                    <Link to ="/bookings">
                        <div className="buttons__bookings">
                            <strong>Bookings</strong>
                        </div>
                    </Link>
                    <Link to={!user?"/login":"/"}>
                        <div className="buttons__login">
                            <Link to = {user?"/user/"+user.id:"/"}>
                                <strong className="hello__user">Hello {user_det?.fName}</strong>
                            </Link>
                                <strong  className="sign__user" onClick={logout}>{user?'Sign Out':'Sign in'}</strong>
                            {/* <p style={{fontSize: "0.75rem"}}>Signup</p> */}
                        </div>
                    </Link>
                    <Link to ="/about">
                        <div className = "buttons__about">
                            <strong>About Us</strong>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar

