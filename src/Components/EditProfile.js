import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function EditProfile(){
    const {id} = useParams();

    const [username, setUsername] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    useEffect(()=>{
        Axios.get("https://eatsserver.onrender.com/eats/account/"+id)
        .then((res)=>{
            setUsername(res.data.username);
            setDepartment(res.data.department);
            setEmail(res.data.email);
            setPhoneNo(res.data.phoneNo);
        }).catch((err)=>{
            console.log(err);
        })
    },[id])

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {username:username,department:department,email:email,phoneNo:phoneNo}
        Axios.put("https://eatsserver.onrender.com/eats/update-user/"+id,data)
        .then((res)=>{
            alert("record updated successfully");
            window.location.href="/user-profile/"+id;
        })
        .catch((err)=>{alert(err)});
    }

    const handleBack = () =>{
        window.location.href="/user-profile/"+id;
    }

    return(
        <div class="bg-dark my-5 py-3">
                <div class="container-lg my-5">
                    <div class="row justify-content-center">
                    <div class="title d-flex justify-content-center mb-2 text-light h2"><span class="fw-bold"> Edit Profile</span></div>
                        <div class="col-lg-6 col-md-4 pt-4 px-4 border border-secondary border-1" style={{backgroundColor: "rgba(222, 220, 220, 0.427)"}}>
                            <form onSubmit={handleSubmit}>
                                <div class="form-group my-2">
                                    <label for="username"> Username :</label>
                                    <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" value={username} onChange={event => setUsername(event.target.value)}/>
                                </div>
                                <div class="form-group my-2">
                                    <label for="department"> Department:</label>
                                    <input type="text" class="form-control" id="department" aria-describedby="departmentHelp" value={department} onChange={event => setDepartment(event.target.value)}/>
                                </div>
                                <div class="form-group my-2">
                                    <label for="email"> Email :</label>
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={event => setEmail(event.target.value)}/>
                                </div>
                                <div class="form-group my-2">
                                    <label for="phoneno"> PhoneNo :</label>
                                    <input type="text" class="form-control" id="phoneno" value={phoneNo} onChange={event => setPhoneNo(event.target.value)} />
                                </div>
                                <center class="my-3">
                                    <button type="submit" class="btn btn-success">Save Changes</button>
                                    <button type="button" class="btn btn-danger mx-3 my-2" onClick={handleBack}>Cancel</button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default EditProfile;