import React from 'react';
import { IoStar } from "react-icons/io5";
import img1 from "../assets/homepage/avatar.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
function Comment() {
  return (
    <div className='commentBox container-lg mt-5'>
      <h1 className="titleHeading text-center text-white fw-bold">
        What People <span className="yellowText">Say About Us</span>
      </h1>
      <p className='subTitleHeading fs-3 mt-3 text-center text-white'>Join thousands of professionals sharing their experiences and insights</p>
      <div className='contentBox d-flex align-items-center mt-5 pt-3'>
        <button className='swiper-button-prev-custom me-2 cardButton rounded-circle text-center d-flex justify-content-center align-items-center iconBox'>
          <FaAnglesLeft  className='cardButtonIcon w-100 h-100' />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1206: { slidesPerView: 3, spaceBetween: 20 },
          }}
          loop={true}
          className='mySwiper'
        >
         <SwiperSlide>
              <div className='cardBox text-white rounded-4 '>
                <div className='d-flex'>
                    <div className='imgBox rounded-circle overflow-hidden'>
                        <img src={img1} alt="" className='w-100 h-100 ' />
                    </div>
                    <div className='my-auto pt-2 ms-3'>
                        <h4 className='fw-bold m-0 mb-1'>Riya Sharma</h4>
                        <p className='yellowText'>Frontend Developer</p>
                    </div>
                </div>
                <p className='mt-3'>"I landed a remote React developer position through HireConnect in just 10 days!
        The platform’s job filters and skill-matching feature made the process effortless."</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='cardBox text-white rounded-4 '>
                <div className='d-flex'>
                    <div className='imgBox rounded-circle overflow-hidden'>
                        <img src={img1} alt="" className='w-100 h-100 ' />
                    </div>
                    <div className='my-auto pt-2 ms-3'>
                        <h4 className='fw-bold m-0 mb-1'>Aman Verma</h4>
                        <p className='yellowText'>HR Manager, PixelCorp</p>
                    </div>
                </div>
                <p className='mt-3'>"Posting jobs on HireConnect was incredibly smooth. We received over 50 quality applicants
        within a week, and the dashboard made shortlisting easy."</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='cardBox text-white rounded-4 '>
                <div className='d-flex'>
                    <div className='imgBox rounded-circle overflow-hidden'>
                        <img src={img1} alt="" className='w-100 h-100 ' />
                    </div>
                    <div className='my-auto pt-2 ms-3'>
                        <h4 className='fw-bold m-0 mb-1'>Sneha Patel</h4>
                        <p className='yellowText'>Graphic Designer</p>
                    </div>
                </div>
                <p className='mt-3'>"The site helped me connect with multiple startups looking for creative freelancers.
        I got three new projects within a month!"</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='cardBox text-white rounded-4 '>
                <div className='d-flex'>
                    <div className='imgBox rounded-circle overflow-hidden'>
                        <img src={img1} alt="" className='w-100 h-100 ' />
                    </div>
                    <div className='my-auto pt-2 ms-3'>
                        <h4 className='fw-bold m-0 mb-1'>Rahul Mehta</h4>
                        <p className='yellowText'>Backend Engineer</p>
                    </div>
                </div>
                <p className='mt-3'>"I love how easy it is to update my profile and get matched to relevant openings. 
        Got hired at a startup that perfectly fits my skillset!"</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='cardBox text-white rounded-4 '>
                <div className='d-flex'>
                    <div className='imgBox rounded-circle overflow-hidden'>
                        <img src={img1} alt="" className='w-100 h-100 ' />
                    </div>
                    <div className='my-auto pt-2 ms-3'>
                        <h4 className='fw-bold m-0 mb-1'>Ananya Gupta</h4>
                        <p className='yellowText'>Recruiter, TechVista</p>
                    </div>
                </div>
                <p className='mt-3'>"We’ve hired two amazing developers through this site. The candidate quality and
        resume filtering features are top-notch."</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='cardBox text-white rounded-4 '>
                <div className='d-flex'>
                    <div className='imgBox rounded-circle overflow-hidden'>
                        <img src={img1} alt="" className='w-100 h-100 ' />
                    </div>
                    <div className='my-auto pt-2 ms-3'>
                        <h4 className='fw-bold m-0 mb-1'>Vikram Singh</h4>
                        <p className='yellowText'>Full-Stack Developer</p>
                    </div>
                </div>
                <p className='mt-3'>"I love how easy it is to update my profile and get matched to relevant openings. 
        Got hired at a startup that perfectly fits my skillset!"</p>
              </div>
            </SwiperSlide>

        </Swiper>

        <button className='swiper-button-next-custom ms-2 cardButton rounded-circle text-center d-flex justify-content-center align-items-center iconBox'>
          <FaAnglesRight className='cardButtonIcon w-100 h-100' />
        </button>
      </div>
    </div>
  )
}

export default Comment
