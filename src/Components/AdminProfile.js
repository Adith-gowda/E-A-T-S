import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';// Import the CSS file for UserProfile
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminProfile(){
  
  const { id } = useParams();
  const [adminname, setUsername] = useState('');
  const [adminage , setAge] = useState('');
  const [adminemail, setEmail] = useState('');
  const [adminphone, setPhoneNo] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:4000/eats/adminaccount/"+id)
    .then((res)=>{
        setUsername(res.data.adminname);
        setAge(res.data.adminage);
        setEmail(res.data.adminemail);
        setPhoneNo(res.data.adminphone);
    }).catch((err)=>{
        console.log(err);
    })
  }, [id]);

  return (
    <div class="bg-secondary" style={{height:"706px"}}>
      <AdminNav id={id} adminname={adminname}/>
      <div class="container-fluid mb-5 profile1 py-5">
          <div class="row justify-content-center">
              <div class="col-md-6 pt-4 px-4 border border-secondary border-1" style={{backgroundColor: "rgba(222, 220, 220, 0.7)"}}>
                  <form>
                      <div class="title d-flex justify-content-center mb-2 text-dark h2"><span class="fw-bold">Admin Profile</span></div>
                      <div class="form-group my-1">
                          <label for="adminname" class="fw-bold"> Adminname :</label>
                          <input type="text" class="form-control" id="adminname" aria-describedby="usernameHelp" defaultValue={adminname} readOnly />
                      </div>
                      <div class="form-group my-1">
                          <label for="adminage" class="fw-bold"> Age :</label>
                          <input type="text" class="form-control" id="adminage" aria-describedby="departmentHelp" defaultValue={adminage} readOnly />
                      </div>
                      <div class="form-group my-1">
                          <label for="adminemail" class="fw-bold"> Email :</label>
                          <input type="email" class="form-control" id="adminemail" aria-describedby="emailHelp" defaultValue={adminemail} readOnly />
                      </div>
                      <div class="form-group my-1">
                          <label for="adminphone" class="fw-bold"> PhoneNo :</label>
                          <input type="text" class="form-control" id="adminphone" defaultValue={adminphone} readOnly />
                      </div>
                      <center class="my-3">
                          <Link to="/"><div className="btn btn-danger me-3 my-md-0 my-2">Log Out</div></Link>
                      </center>
                  </form>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminProfile;
