import React from "react";

function SubscribeBox() {
  return (
    <div className="subscribeBox container">
      <h1 className="heading text-center text-white fw-bold">
        Never Wants to Miss Any <span className="yellowText">Job News?</span>
      </h1>
      <div className="emailBox d-flex flex-column flex-sm-row justify-content-center align-items-center mt-4 gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 fs-5 fw-medium border-0 rounded-3 "
        />
        <button className="fw-bold fs-5 text-white border-0 px-4 py-2 rounded-3 ">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default SubscribeBox;
