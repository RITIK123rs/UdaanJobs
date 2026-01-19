import React from 'react';

function AvatarHeader(display) {
  return (
      <div className={`col-md-6  d-flex position-relative justify-content-center ${display.property}`}>
            <div className="avatarBox position-absolute rounded-3 ">
              <h6 className="text-white text-center mt-1 fw-bold">10K+ got job</h6>
              <div className="d-flex justify-content-center mt-2" >
                <div className="rounded-circle ms-0  avatarImgBox overflow-hidden">
                  <img src="/avatar.png"  className="w-100 h-100" alt="" />
                </div>
                <div className="rounded-circle  avatarImgBox overflow-hidden">
                  <img src="/avatar2.png"  className="w-100 h-100" alt="" />
                </div>
                <div className="rounded-circle  avatarImgBox overflow-hidden">
                  <img src="/avatar3.jpg" className="w-100 h-100" alt="" />
                </div>
                <div className="rounded-circle  avatarImgBox overflow-hidden bg-secondary d-flex align-items-center">
                  <h6 className="text-white fw-bold avatarCount ">+6k</h6>
                </div>
              </div>
            </div>
            <img src="/Boy.png" className="avatarBoy" alt="boy" width="100%" />
          </div>
  )
}

export default AvatarHeader
