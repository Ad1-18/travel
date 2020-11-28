import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import './Login.css';
import {Link} from "react-router-dom";
import { useAlert } from 'react-alert';
import { useStateValue } from './StateProvider.js';

function Login() {

    const [{}, dispatch] = useStateValue();
    const http = require('follow-redirects').http;
    const _ = require('lodash')
    const alert = useAlert();
    const history = useHistory();
    const options = {
        'method': 'POST',
        'hostname': 'localhost',
        'port': 5000,
        'path': '/api/signin',
        'headers': {
            'Content-Type': 'application/json'
        },
        'maxRedirects': 20
    }; 

    

    const req = http.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
            console.log(chunk)
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            const bodyString = JSON.parse(body)
            console.log(bodyString)
            const userID = bodyString.message?bodyString.message._id:null
            console.log(userID);
            if (res.statusCode!==200){
                alert.show(_.lowerCase(body.toString()))
            }
            else{
                alert.show("You have been logged in!")
                addUser(userID)
                history.push("/")
            }
        });
    });
    const addUser = (userID) => {
        dispatch({
            type: 'SET_USER',
            item: {
                email: formData.email,
                password: formData.password,
                id: userID
        }, });
    };
    const initialFormData = Object.freeze({
        email: "",
        password: ""
      });
    const [formData,setFormData] = useState(initialFormData)
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value.trim()})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const postData = JSON.stringify({"email":formData.email,"password":formData.password});

        req.write(postData);

        req.end();
    }

    return (
        <div className="login">
                <Link to="/">
                    <div className = "logo">
                        <img className="login__logo" src ='./images/logo.png' alt=""/>
                    </div>
                </Link>
                    <div className="login__info">
                        <input onChange={handleChange} name="email" placeholder="E-mail address" autoFocus={true}></input>
                        <input onChange={handleChange} name="password"  placeholder="Password"></input>
                        <button className= "btn btn-primary login__button" onClick={handleSubmit}>Login</button>
                        <Link to="/signup">
                            <button className= "btn btn-primary login__button">Sign Up</button>
                        </Link>
                    </div>
        </div>
    )
}

export default Login
