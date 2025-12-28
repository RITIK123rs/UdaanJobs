import React from "react";
import AvatarHeader from "./avatarHeader";


function Header() {
  return (
    <>
      <div className="container-lg header mt-4">
        <div className="row">
          <AvatarHeader property="d-block d-md-none" />
          <div className="col-md-6 pt-2 pb-5 d-flex align-items-center text-white">
            <span className="content text-center text-md-start">
            <h1 className="title fw-bold">Your <span className="yellowText">Next Career</span><br /> Move Starts Here</h1>
            <p className="subtitle mt-4 pe-3">
              Discover thousands of opportunities that match your skills and
              ambitions. Start your career journey with just a click, apply
              easily, and manage everything in one place to make your career
              path simple, smart, and successful
            </p>
            <button className="text-white px-4 py-2 mt-2 rounded-5 fw-bold border-0">Get Started Now</button>
            </span>
          </div>
          <AvatarHeader property="d-none d-md-block" />
        </div>
      </div>

    </>
  );
}

export default Header;
