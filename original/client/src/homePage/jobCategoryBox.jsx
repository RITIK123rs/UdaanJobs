import React from 'react';
import cardImg1 from "../assets/homepage/megaphone.png";
import cardImg2 from "../assets/homepage/web-development.png";
import cardImg3 from "../assets/homepage/pencil-scale.png";
import cardImg4 from "../assets/homepage/ux-designer.png";
import cardImg5 from "../assets/homepage/content-writing.png";
import cardImg6 from "../assets/homepage/data-entry.png";
import cardImg7 from "../assets/homepage/increase.png";
import cardImg8 from "../assets/homepage/income.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaAngleLeft,FaAngleRight  } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

function JobCategoryBox() {
    const cardData = [
  {
    img: cardImg1,
    title: "Digital Marketing",
    description: "Promote brands online with marketing strategies",
    jobsAvailable: "500+ Jobs Available"
  },
  {
    img: cardImg2,
    title: "Web Development",
    description: "Build and maintain websites for clients",
    jobsAvailable: "300+ Jobs Available"
  },
  {
    img: cardImg3,
    title: "Arts & Design",
    description: "Create visual content for branding and media",
    jobsAvailable: "200+ Jobs Available"
  },
  {
    img: cardImg4,
    title: "UI/UX Designer",
    description: "Design user interfaces and enhance user experience",
    jobsAvailable: "250+ Jobs Available"
  },
  {
    img: cardImg5,
    title: "Content Writing",
    description: "Write and edit content for various platforms",
    jobsAvailable: "180+ Jobs Available"
  },
  {
    img: cardImg6,
    title: "Data Entry",
    description: "Input data into systems accurately and efficiently",
    jobsAvailable: "400+ Jobs Available"
  },
  {
    img: cardImg7,
    title: "Sales",
    description: "Sell products and services to customers",
    jobsAvailable: "350+ Jobs Available"
  },
  {
    img: cardImg8,
    title: "Finance",
    description: "Manage financial records and transactions",
    jobsAvailable: "220+ Jobs Available"
  }
];

  return (
    <div className='JobCategoryBox container-xl'>
        <h1 className="titleHeading text-center text-white fw-bold">
        Browse <span className="yellowText">Job Category</span>
      </h1>
      <p className='subTitleHeading fs-3 mt-3 text-center text-white'>Explore diverse job opportunities, tailored to your skills.
Start your career journey today!</p>
      <div className='scrollCardBox d-flex align-items-center'>
        <button className='swiper-button-prev-custom me-2 cardButton rounded-circle text-center d-flex justify-content-center align-items-center'><FaAngleLeft className='cardButtonIcon me-2 ' /></button>
         <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        breakpoints={{
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  }}
        loop={true}
        className="mySwiper"
      >
        {
            cardData.map((element, index) => (
                <SwiperSlide>
          <div key={index} className='cardBox text-white d-flex flex-column justify-content-center align-items-center p-2 pt-4 rounded-4'>
            <div className='imageBox overflow-hidden rounded-circle cardImgBox'>
                <img src={element.img} alt="" className='w-100 h-100' />
            </div>
            <h5 className='mt-4 mb-1 fw-bold fs-4'>{element.title}</h5>
            <p className='text-center m-0 p-3'>{element.description}</p>
<p className='mt-0 yellowText fw-bold fs-5 '>{element.jobsAvailable}</p>
          </div>
        </SwiperSlide>
            ))
        }
        
        
      </Swiper>
      <button className='swiper-button-next-custom ms-2 cardButton rounded-circle text-center d-flex justify-content-center align-items-center'><FaAngleRight className='cardButtonIcon ms-1' /></button>
      </div>
    </div>
  )
}

export default JobCategoryBox;
