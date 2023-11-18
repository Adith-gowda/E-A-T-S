import React from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

function Attendance(){

    const { id , month } = useParams();
    const [details , setDetails] = useState([]);
    const [monthdata , setMonthdata] = useState([]);
    let totalworkhours = 0;
    let totalworkdays = 0;

    useEffect(() => {
        Axios.get("http://localhost:4000/eats/account/"+id)
        .then((res)=>{
            setDetails(res.data);
            setMonthdata(res.data[month]);
        }).catch((err)=>{
            console.log(err);
        })
        }
    , [id]);


    const months = {
        "jan": "January",
        "feb": "February",
        "mar": "March",
        "apr": "April",
        "may": "May",
        "jun": "June",
        "jul": "July",
        "aug": "August",
        "sept": "September",
        "oct": "October",
        "nov": "November",
        "dec": "December"
    }

    const monthnum = {
        "jan":1,
        "feb":2,
        "mar":3,
        "apr":4,
        "may":5,
        "jun":6,
        "jul":7,
        "aug":8,
        "sept":9,
        "oct":10,
        "nov":11,
        "dec":12
    }

    const calculateTotalWorkHours = (checkin, checkout) => {
        const checkinTime = new Date(`1970-01-01T${checkin}`);
        const checkoutTime = new Date(`1970-01-01T${checkout}`);
    
        const timeDifference = checkoutTime - checkinTime;
        const totalWorkHours = timeDifference / (1000 * 60 * 60);
        
        if(totalWorkHours < 0){
            return 0;
        }
        else{
            totalworkhours = totalworkhours + totalWorkHours;
        }
        return totalWorkHours;
    };

    const handlepresent = () => {
        totalworkdays = totalworkdays + 1;
    }

    return(
        <div>
            <div class="bg-primary d-flex justify-content-between py-3 px-3">
                <h3 class="text-light text-center">Attendance of {months[month]} Month</h3>
                <Link to={"/attendance-summary/"+id} class="text-light text-decoration-none btn btn-danger">Back</Link>
            </div>

            <div class="container-lg">
                <table class="table table-striped table-hover table-bordered text-center">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Department</th>
                            <th scope="col">Check In</th>
                            <th scope="col">Check Out</th>
                            <th scope="col">Work Hours (hrs)</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthdata.map((val)=>{
                            if(val.day <= new Date().getDate()){
                            return(
                                <tr>
                                    <td>{val.day}-{monthnum[month]}-{new Date().getFullYear()}</td>
                                    <td>{details.department}</td>
                                    <td>{val.checkin}</td>
                                    <td>{val.checkout}</td>
                                    <td>{calculateTotalWorkHours(val.checkin,val.checkout).toFixed(3)}</td>
                                    <td>
                                        {
                                            val.checkin === "00:00:00" ? 
                                            <div>{val.checkout === "00:00:00" ? <div class="btn btn-danger">Absent</div> : <div></div>}</div>
                                            : 
                                            <div>{
                                                val.checkout === "00:00:00" ? <div class="btn btn-warning">Didnt Check Out</div> :<div>{handlepresent()}<div class="btn btn-success">Present</div></div>
                                            }</div>
                                        }
                                    </td>
                                </tr>
                            )}
                        })}
                    </tbody>
                </table>
            </div>

            <hr class="border border-dark"></hr>
            
            <div class="container-lg my-5">
                <div class="h3 text-center my-3">Attendance Analysis</div>
                <table class="table table-hover table-bordered text-center">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">No. of working days</th>
                            <th scope="col">No. of days present</th>
                            <th scope="col">No. of days absent</th>
                            <th scope="col">Count of working hours</th>
                            <th scope="col">Attendance Percentage</th>
                        </tr>
                        <tr>
                            <td>{new Date().getDate()}</td>
                            <td>{totalworkdays}</td>
                            <td>{new Date().getDate()-totalworkdays}</td>
                            <td>{totalworkhours.toFixed(3)}</td>
                            <td>{((totalworkdays/new Date().getDate())*100).toFixed(2)}%</td>
                        </tr>
                    </thead>
                </table>
            </div>

            <hr class="border border-dark"></hr>

        </div>
    );
}

export default Attendance;