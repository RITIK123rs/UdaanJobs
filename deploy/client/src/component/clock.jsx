import { useEffect, useState } from "react"
import { dateFormat } from "../utils/dateFormat";
import "./clock.css";

export default function Clock(){
const[time, setTime]= useState("");
const[day, setDate]= useState("");

 const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

function getTime(){
    const date= new Date();
    const sec=date.getSeconds().toString().padStart(2,"0");
    const mins=date.getMinutes().toString().padStart(2,"0");
    let hrs= date.getHours();
    const amPm= hrs >=12 ? "PM" : "AM";
    hrs=(hrs%12).toString().padStart(2,"0");

    const currentDate= dateFormat(date.getTime());
    const currentDay=days[date.getDay()];
    setTime(`${hrs}:${mins}:${sec} ${amPm}`);
    setDate(`${currentDay}, ${currentDate}`);
}

useEffect(()=>{
    getTime();
    setInterval(()=>{ getTime() },1000)
},[])


    return(
        <>
        <div className="clock d-flex flex-column me-3" >
            <span className="clockTime">{time}</span>
            <span className="clockDate">{day}</span>
        </div>
        </>
    )
}