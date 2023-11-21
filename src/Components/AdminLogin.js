import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function AdminLogin(){

    const [adminemail, setEmail] = useState('');
    const [adminpassword, setPassword] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault()
        const data = {adminemail,adminpassword};
        Axios.post("https://eatsserver.onrender.com/eats/login-admin",data)
        .then((res)=>{
            if(res.data === "Your not the admin"){
                alert("Your not the admin");
            }else if(res.data === "password incorrect"){
                alert("Your password is incorrect");
            }
            else{
                alert("AdminLogin successful");
                const id = res.data;
                window.location.href = "/AdminHome/"+id;
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
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" value={adminemail} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input type="password" value={adminpassword} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className='btn btn-success me-2 ms-5'>Log In</button>
                    <Link to="/" class="btn btn-danger mx-2">User</Link>
                </form>
                <hr />
            </div> 
        </div>
    
    );
};

export default AdminLogin;