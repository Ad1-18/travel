import React, {useState} from "react"
import './Login.css';
import {Link} from "react-router-dom";
import { useAlert } from 'react-alert'

function Login() {
    const http = require('follow-redirects').http;
    const _ = require('lodash')
    const alert = useAlert();
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
        });

        res.on("end", function (chunk) {
            const body = Buffer.concat(chunks);
            const bodyString = body.toString()
            console.log(bodyString);
            if (res.statusCode!==200){
                alert.show(_.lowerCase(bodyString))
            }
            else{
                alert.show("You have been logged in!")
            }
        });
    });

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
