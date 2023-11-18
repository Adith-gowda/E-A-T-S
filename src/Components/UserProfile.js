import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';// Import the CSS file for UserProfile
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProfile(){
  
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [department , setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:4000/eats/account/"+id)
    .then((res)=>{
        setUsername(res.data.username);
        setDepartment(res.data.department);
        setEmail(res.data.email);
        setPhoneNo(res.data.phoneNo);
    }).catch((err)=>{
        console.log(err);
    })
  }, [id]);

  return (
    <div class="bg-secondary" style={{height:"706px"}}>
      <Navbar id={id} username={username}/>
      <div class="container-fluid mb-5 profile1 py-5">
          <div class="row justify-content-center">
              <div class="col-md-6 pt-4 px-4 border border-secondary border-1" style={{backgroundColor: "rgba(222, 220, 220, 0.7)"}}>
                  <form>
                      <div class="title d-flex justify-content-center mb-2 text-dark h2"><span class="fw-bold"> Profile</span></div>
                      <div class="form-group my-1">
                          <label for="username" class="fw-bold"> Username :</label>
                          <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" defaultValue={username} readOnly />
                      </div>
                      <div class="form-group my-1">
                          <label for="department" class="fw-bold"> Department :</label>
                          <input type="text" class="form-control" id="department" aria-describedby="departmentHelp" defaultValue={department} readOnly />
                      </div>
                      <div class="form-group my-1">
                          <label for="email" class="fw-bold"> Email :</label>
                          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" defaultValue={email} readOnly />
                      </div>
                      <div class="form-group my-1">
                          <label for="phoneno" class="fw-bold"> PhoneNo :</label>
                          <input type="text" class="form-control" id="phoneno" defaultValue={phoneNo} readOnly />
                      </div>
                      <center class="my-3">
                          <Link to="/"><div className="btn btn-danger me-3 my-md-0 my-2">Log Out</div></Link>
                          <Link to={"/editProfile/"+id}><div className="btn btn-secondary">Edit Profile</div></Link>
                      </center>
                  </form>
              </div>
          </div>
      </div>
    </div>
  );
};

export default UserProfile;
