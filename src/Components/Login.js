import React, {useState} from "react"
import './Login.css';
import {Link} from "react-router-dom";
function Login() {
    var http = require('follow-redirects').http;

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
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
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
                    </div>
        </div>
    )
}

export default Login
