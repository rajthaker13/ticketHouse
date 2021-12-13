import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Ticket House
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/uploadevent">
                  Register Event
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/uploadticket">
                  Upload Ticket
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/showevents">
                  Show Events
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/auctionhouse">
                  Auction House
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/maketrades">
                  Trade Central
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/gettrades">
                  Trade Info
                </NavLink>
              </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
 
export default Navbar;
