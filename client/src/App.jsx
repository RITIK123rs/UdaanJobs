import { useState } from 'react'
import './App.css'
import HomePage from './homePage/HomePage';
import LoginPage from './loginPage/loginPage';
import JobSeekerPage from './jobseekerPage/jobseekerPage';
import RecruiterPage from './recruiterPage/recruiterPage';
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";

function App() {

  const [messageList, setMessageList]=useState([]);

  const addMessageBox= (type,message)=>{
    const id=new Date();
    console.log(id);
    setMessageList((old)=>[...old,{"id":id,"type":type,"message":message}]);
    setTimeout(()=>{
      setMessageList((old)=> old.filter((msg)=> msg.id!=id));
    },4400);
    
  }
  
  return (
    <>
    <div className='mainMessageBox'>
      {
        messageList.map((data)=>{
          if(data.type=='check'){
            return(<div className='subMessageBox check'>< FaCheckCircle className='check icon' /><span className='textMessage'>{data.message}</span></div>);
          }
          else if(data.type=="xMark"){
            return(<div className='subMessageBox xMark'>< FaCircleXmark className='xMark icon' /><span className='textMessage'>{data.message}</span></div>);
          }
          else{
            return(<div className='subMessageBox Warning'>< RiErrorWarningFill className='Warning icon' /><span className='textMessage'>{data.message}</span></div>);
          }
        })
      }
    </div>

    
    {/* <HomePage /> */}
    {/* <LoginPage /> */}
    < JobSeekerPage addMessageBox={addMessageBox} />
    < RecruiterPage addMessageBox={addMessageBox} />
    </>
  )
}

export default App
