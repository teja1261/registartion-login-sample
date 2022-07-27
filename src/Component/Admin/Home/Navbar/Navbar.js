import React, { useState, useEffect, useRef } from "react";

import style from "./Navbar.module.css";

const Overlay = (props) => {
  return (
    <div className={`${style.overlay}`}>
      <div className={`${style.header}`}>
        <p>
          <span className={`${style.usern} usern`} id="username">
            {props.userDetail.name}
          </span>
          <br />
          <small id="usermail">{props.userDetail.email}</small>
        </p>
        <p className={`${style.signout} signout`}>
          <a
            className={`${style.link} link`}
            href="#signout"
            onClick={props.logout}
          >
            Signout
          </a>
          <i className={`${style.fas} fas fa-sign-out-alt`}></i>
        </p>
      </div>
    </div>
  );
};

const NavBar = (props) => {
  const [isOverlay, setIsOverlay] = useState(false);
  let user = JSON.parse(localStorage.getItem("userDetail"));

  useEffect(() => {
    console.log("Navbar", props.userDetail);
    console.log("Navbar", user);
  }, []);

  const overlayHandler = () => {
    setIsOverlay((prevState) => {
      return !prevState;
    });
  };


  return (
    <div className={style.header}>
      <div className={`${style.prfl_img} prfl_img`}>
        <div className={`${style.inner_div} inner_div`}>
          <p>WELCOME</p>
          <p className={`${style.usern} usern`} id="username">
            {/* {userDetail !== null ? userDetail.name : null} */}
            {props.userDetail === null ? user.name : props.userDetail.name}
            {/* Sanjay */}
          </p>
        </div>
        <button
          type="button"
          onClick={overlayHandler}
          className={`${style.btn} btn`}
        >
          <img
            className={`${style.img_fluid} img_fluid`}
            src={
              props.userDetail === null
                ? user.profile_image
                : props.userDetail.profile_image
            }
            alt="profile img"
          />
        </button>
        {isOverlay && (
          <Overlay logout={props.logout} userDetail={props.userDetail} />
        )}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
