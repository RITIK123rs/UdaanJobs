import React, {useState} from "react";
import AvatarHeader from "./avatarHeader";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
function Header() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getStarted=async ()=>{
    setLoading(true)
    const token=localStorage.getItem("token");
    console.log(token);
    if(!token){
      // console.log("/login");
      navigate("/login");
      return;
    }
    
    let userType="login"
    await fetch(`${API_URL}/home`,{
      headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data.isLogin);
      if(data.isLogin){
        userType=data.userType
        // console.log(userType);
      }
    })
    .catch(error => console.log(error));

    // console.log(userType);
    navigate(`/${userType}`);
    setLoading(false);
    return;
  }

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
            <button onClick={getStarted} disabled={loading} className="text-white px-4 py-2 mt-2 rounded-5 fw-bold border-0">
              {loading ? (
                <span class="loader mt-1" style={{ width: "20px", height:"20px" }} ></span>
              ) : "Get Started Now" }
              </button>
            </span>
          </div>
          <AvatarHeader property="d-none d-md-block" />
        </div>
      </div>

    </>
  );
}

export default Header;
