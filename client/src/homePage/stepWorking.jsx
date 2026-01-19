import React from 'react';
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";
import girlImg from  "../assets/homepage/Girl.png"

function StepWorking() {
  return (
    <div className='stepWorkingBox container'>
      <h1 className="titleHeading text-center text-white fw-bold">
        How It<span className="yellowText"> Works</span>
      </h1>
      <p className='subTitleHeading fs-3 mt-3 text-center text-white'>Follow simple steps to explore opportunities and secure your ideal career</p>
      <div className='content mt-5'>
        <div className='row'>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <img src={girlImg} className='girlImg w-100 h-100' alt="" />
          </div>
          <div className="col-lg-6 pt-xl-5">
            <div className='stepBox d-flex'>
                <div className='iconBox overflow-hidden rounded-circle'><MdPersonAddAlt1 className='w-100 h-100' /></div>
                <div className='text-white ms-3'>
                  <h4 className='fw-bold stepHead'>Login or Sign Up</h4>
                  <p className='stepBody'>Create your account or log in to start your job journey quickly and securely</p>
                </div>
            </div>
            <div className='stepBox d-flex'>
                <div className='iconBox overflow-hidden rounded-circle d-flex justify-content-center'><FaSearch className='searchIcon' /></div>
                <div className='text-white ms-3'>
                  <h4 className='fw-bold stepHead'>Search Jobs</h4>
                  <p className='stepBody'>Explore thousands of opportunities tailored to your skills and preferences</p>
                </div>
            </div>
            <div className='stepBox d-flex'>
                <div className='iconBox overflow-hidden rounded-circle'><RiVerifiedBadgeFill className='w-100 h-100' /></div>
                <div className='text-white ms-3'>
                  <h4 className='fw-bold stepHead'>Apply with Ease</h4>
                  <p className='stepBody'>Submit your resume and cover letter directly through our platform</p>
                </div>
            </div>
            <div className='stepBox d-flex'>
                <div className='iconBox overflow-hidden rounded-circle'><FaHandshake className='w-100 h-100' /></div>
                <div className='text-white ms-3'>
                  <h4 className='fw-bold stepHead'>Get Hired</h4>
                  <p className='stepBody'>Connect with employers and start your new job with confidence.</p>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepWorking;
