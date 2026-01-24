import React from 'react';
import avatarImg from "../assets/homepage/avatar.png";
import avatar1Img from "../assets/homepage/avatar2.png";
import avatar2Img from "../assets/homepage/avatar3.jpg";
import boyImg from "../assets/Boy.png";


function AvatarHeader(display) {
  return (
      <div className={`col-md-6  d-flex position-relative justify-content-center ${display.property}`}>
            <div className="avatarBox position-absolute rounded-3 ">
              <h6 className="text-white text-center mt-1 fw-bold">10K+ got job</h6>
              <div className="d-flex justify-content-center mt-2" >
                <div className="rounded-circle ms-0  avatarImgBox overflow-hidden">
                  <img src={avatarImg}  className="w-100 h-100" alt="" />
                </div>
                <div className="rounded-circle  avatarImgBox overflow-hidden">
                  <img src={avatar1Img}  className="w-100 h-100" alt="" />
                </div>
                <div className="rounded-circle  avatarImgBox overflow-hidden">
                  <img src={avatar2Img} className="w-100 h-100" alt="" />
                </div>
                <div className="rounded-circle  avatarImgBox overflow-hidden bg-secondary d-flex align-items-center">
                  <h6 className="text-white fw-bold avatarCount ">+6k</h6>
                </div>
              </div>
            </div>
            <img src={boyImg} className="avatarBoy" alt="boy" width="100%" />
          </div>
  )
}

export default AvatarHeader
