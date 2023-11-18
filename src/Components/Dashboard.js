import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import AttendanceCalendar from './Calendar/AttendanceCalendar';

function Dashboard(){

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    //
    const {id} = useParams();
    const [username, setUsername] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString( 'en-US', { hour: '2-digit', minute: '2-digit' , second: '2-digit' , hour12: false}));
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isPresent, setIsPresent] = useState(false);

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"]; 


    useEffect(() => {
      Axios.get("http://localhost:4000/eats/checkIn/"+id)
      .then((res)=>{
        // console.log(res.data[months[currentMonth]][currentDay-1].checkin);
        if(res.data[months[currentMonth]][currentDay-1].checkin !== "00:00:00"){
            setIsPresent(true);
        }
        else{
          setIsPresent(false);
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
    , [id, currentDay, currentMonth, months]);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
      return () => clearInterval(intervalId);
    }, []); 



    const handleMonthChange = (newMonth, newYear) => {
      setSelectedMonth(newMonth);
      setSelectedYear(newYear);
      // Additional logic to handle month change if needed
    };

    useEffect(() => {
      Axios.get("http://localhost:4000/eats/account/"+id)
      .then((res)=>{
          setUsername(res.data.username);
      }).catch((err)=>{
          console.log(err);
      })
    }, [id]);


    const handleCheckIn = () => {
      const data = {day: currentDay, month: months[currentMonth], checkin: currentTime};
      Axios.put("http://localhost:4000/eats/checkIn/"+id, data)
        .then((res)=>{
          if(res.data === "already checked in")
          {
            alert("You have already checked in");
          }
          else{
            alert("Checked in successfully");
          }
        }).catch((err)=>{
          console.log(err);
        })
    }

    const handleCheckOut = () => {
      const data = {day: currentDay, month: months[currentMonth], checkout: currentTime};
      Axios.put("http://localhost:4000/eats/checkOut/"+id, data)
        .then((res)=>{
          if(res.data === "already checked out")
          {
            alert("You have already checked out");
          }
          else{
            alert("Checked out successfully");
          }
        }).catch((err)=>{
          console.log(err);
        })
    }

    return (
      <div className="dashboard-container">
        <div className="bg-image"></div>
        <Navbar id={id} username={username}/>
        <div className="calendar-container">
          <AttendanceCalendar
            year={selectedYear}
            month={selectedMonth}
            onPrevMonth={() => handleMonthChange(selectedMonth - 1, selectedYear)}
            onNextMonth={() => handleMonthChange(selectedMonth + 1, selectedYear)}
            onMonthChange={handleMonthChange}
          />
        </div>

        <div class="text-center text-light">
          <h1>Current Date and Time</h1>
          <p>{`Day: ${currentDay}, Month: ${currentMonth+1}, Year: ${currentYear}`}</p>
          <p>{`Time: ${currentTime}`}</p>
        </div>

        <div class="d-flex justify-content-center">
            { isPresent ? <button class="btn btn-danger" onClick={handleCheckOut}>Check Out</button> : <button class="btn btn-success" onClick={handleCheckIn}>Check In</button> }        </div>
        
      </div>
    );
};

export default Dashboard;
