import React, {useState} from "react"
import './Signup.css';
import {Link} from "react-router-dom";
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";

function Signup() {
    const http = require('follow-redirects').http;
    const _ = require('lodash')
    const alert = useAlert();
    const history = useHistory();
    const options = {
        'method': 'POST',
        'hostname': 'localhost',
        'port': 5000,
        'path': '/api/signup',
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
                alert.show("Signup Successful!")
                history.push("/");
            }
        });
    });

    const initialFormData = Object.freeze({
        email: "",
        password: "",
        fName: "",
        lName: "",
        password_confirmation: ""
      });
    const [formData,setFormData] = useState(initialFormData)
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value.trim()})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const postData = JSON.stringify({"email":formData.email,"password":formData.password,"password_confirmation":formData.password_confirmation,"firstName":formData.fName,"lastName":formData.lName});

        req.write(postData);

        req.end();
    }

    return (
        <div className="signup">
                <Link to="/">
                    <div className = "logo">
                        <img className="signup__logo" src ='./images/logo.png' alt=""/>
                    </div>
                </Link>
                    <div className="signup__info">
                        <input onChange={handleChange} name="fName" placeholder="First Name" autoFocus={true}></input>
                        <input onChange={handleChange} name="lName" placeholder="Last Name" ></input>
                        <input onChange={handleChange} name="email" placeholder="E-mail address" ></input>
                        <input onChange={handleChange} name="password"  placeholder="Password"></input>
                        <input onChange={handleChange} name="password_confirmation"  placeholder="Confirm Password"></input>
                        <button className= "btn btn-primary signup__button" onClick={handleSubmit}>Signup</button>
                    </div>
        </div>
    )
}

export default Signup
