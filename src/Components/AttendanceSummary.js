import React, { useState , useEffect} from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';


function AttendanceSummary() {

    const { id } = useParams();

    const [username, setUsername] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhone] = useState('');

    useEffect(() => {
      Axios.get("https://eatsserver.onrender.com/eats/account/"+id)
      .then((res)=>{
          setUsername(res.data.username);
          setDepartment(res.data.department);
          setEmail(res.data.email);
          setPhone(res.data.phoneNo);
      }).catch((err)=>{
          console.log(err);
      })
    }, [id]);

    const months = {
      "January": "jan",
      "February": "feb",
      "March": "mar",
      "April": "apr",
      "May": "may",
      "June": "jun",
      "July": "jul",
      "August": "aug",
      "September": "sept",
      "October": "oct",
      "November": "nov",
      "December": "dec"
    }

    const handleAttendance = (e) => {
      const month = months[e.target.innerHTML];
      window.location.href = "/attendance/"+id+"/"+month;
    }
  
    return (
      <div class="bg-secondary" style={{height:"706px"}}>
          <Navbar id={id} username={username}/>
          <center>
          <h1 style={{textAlign:"center", marginTop:"50px"}}>Attendance Summary</h1>
          <Dropdown style={{width:"250px", textAlign:"left", fontStyle:"italic"}}>
            <Dropdown.Toggle variant="" id="dropdown-basic" style={{fontStyle:"italic"}}>
                Select by month
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={handleAttendance}>January</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>February</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>March</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>April</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>May</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>June</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>July</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>August</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>September</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>October</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>November</Dropdown.Item>
                <Dropdown.Item onClick={handleAttendance}>December</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </center>
      </div>
    );
}

export default AttendanceSummary;
