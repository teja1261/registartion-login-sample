import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Cookies from "js-cookie";
import "./header.css";

const Header = (props) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const username = localStorage.getItem("username");

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    localStorage.clear();
    const { history } = props;
    history.replace("/login");
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <ul className="nav-menu">
          <NavLink
            to="/"
            className="nav-link"
            activeStyle={{ textDecoration: "underline" }}
            exact
          >
            <li>Home</li>
          </NavLink>
        </ul>
      </div>
      <div className="avatar-logo-container">
        <div>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            <span className="header-logout">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default withRouter(Header);
