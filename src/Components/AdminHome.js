import React from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState , useEffect } from 'react';
import AdminNav from './AdminNav';

function AdminHome() {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [userdata, setUserData] = useState([]);

    useEffect(() => {
        Axios.get("https://eatsserver.onrender.com/eats/adminaccount/"+id)
        .then((res)=>{
            setData(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, [id])

    useEffect(() => {
        Axios.get("https://eatsserver.onrender.com/eats/")
        .then((res)=>{
            setUserData(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        Axios.delete("https://eatsserver.onrender.com/eats/delete-user/"+e.target.id)
        .then((res)=>{
            alert("Employee Deleted");
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
        })
    }


    return (
        <div>
            <AdminNav id={id} adminname={data.adminname} />
            {
                userdata.map((user)=>{
                    return (
                        <div class="container-lg my-5">
                            <div class="row justify-content-center">
                                <div class="col-md-6 py-4 px-4 mb-5 border border-secondary border-1" style={{backgroundColor: "gray"}}>
                                    <form>
                                        <div class="form-group my-2">
                                            <label for="username" class="fw-bold"> Username :</label>
                                            <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" defaultValue={user.username} readOnly />
                                        </div>
                                        <div class="form-group my-2">
                                            <label for="department" class="fw-bold"> Department :</label>
                                            <input type="text" class="form-control" id="department" defaultValue={user.department} readOnly />
                                        </div>
                                        <div class="form-group my-2">
                                            <label for="email" class="fw-bold"> Email :</label>
                                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" defaultValue={user.email} readOnly/>
                                        </div>
                                        <div class="form-group my-2">
                                            <label for="phoneno" class="fw-bold"> PhoneNo :</label>
                                            <input type="text" class="form-control" id="phoneno" defaultValue={user.phoneNo} readOnly />
                                        </div>
                                        <div className="btn btn-danger my-2 d-flex justify-content-center" onClick={handleDelete} id={user._id}>Delete this User</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default AdminHome;