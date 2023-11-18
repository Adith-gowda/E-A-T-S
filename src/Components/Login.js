import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault()
        const data = {email,password};
        Axios.post("http://localhost:4000/eats/login-user",data)
        .then((res)=>{
            if(res.data === "user not registered"){
                alert("Your not our employee");
            }else if(res.data === "password incorrect"){
                alert("Your password is incorrect");
            }
            else{
                alert("Employee Login successful");
                const id = res.data;
                window.location.href = "/dashboard/"+id;
            }
        }).catch((err)=>{
            console.log(err);
        })

        setEmail("");
        setPassword("");
    }


    return ( 
        <div  className="login-container">
            <div className="background-image"></div>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className='btn btn-success'>Log In</button>
                    <Link to="/signup">
                        <button className="btn btn-primary mx-2">Sign up</button>
                    </Link>
                    <Link to="/Admin" class="btn btn-danger">Admin</Link>
                </form>
                <hr />
            </div> 
        </div>
    
    );
};

export default Login;