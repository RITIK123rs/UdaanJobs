import React from "react";
import AmazonImg from "../assets/homepage/Amazon.png";
import FigmaImg from "../assets/homepage/Figma.png";
import GoogleImg from "../assets/homepage/Google.png";
import MetaImg from "../assets/homepage/Meta.png";
import MicrosoftImg from "../assets/homepage/Microsoft.png";
import NetflixImg from "../assets/homepage/Netflix.png";
import OracleImg from "../assets/homepage/Oracle.png";
import PinterestImg from "../assets/homepage/Pinterest.png";
import SpotifyImg from "../assets/homepage/Spotify.png";
import WalmartImg from "../assets/homepage/Walmart.png";

function ScrollBox() {
  return (
    <div className="ScrollBox ">
      <h1 className="titleHeading text-center mb-5 text-white fw-bold">
        Trusted By <span className="yellowText">1000+ Companies</span>
      </h1>
      <div className="scrollContainer mt-4 d-flex position-relative overflow-hidden ">
        <div className="logoImgBox" style={{ "--position": 1 }}>
          <img src={AmazonImg} alt="Amazon" />
        </div>

        <div className="logoImgBox" style={{ "--position": 2 }}>
          <img src={FigmaImg} alt="Figma" />
        </div>

        <div className="logoImgBox" style={{ "--position": 3 }}>
          <img src={GoogleImg} alt="Google" />
        </div>

        <div className="logoImgBox" style={{ "--position": 4 }}>
          <img src={MetaImg} alt="Meta" />
        </div>

        <div className="logoImgBox" style={{ "--position": 5 }}>
          <img src={MicrosoftImg} alt="Microsoft" />
        </div>

        <div className="logoImgBox" style={{ "--position": 6 }}>
          <img src={NetflixImg} alt="Netflix" />
        </div>

        <div className="logoImgBox" style={{ "--position": 7 }}>
          <img src={OracleImg} alt="Oracle" />
        </div>

        <div className="logoImgBox" style={{ "--position": 8 }}>
          <img src={PinterestImg} alt="Pinterest" />
        </div>

        <div className="logoImgBox" style={{ "--position": 9 }}>
          <img src={SpotifyImg} alt="Spotify" />
        </div>

        <div className="logoImgBox" style={{ "--position": 10 }}>
          <img src={WalmartImg} alt="Walmart" />
        </div>
      </div>
    </div>
  );
}

export default ScrollBox;
