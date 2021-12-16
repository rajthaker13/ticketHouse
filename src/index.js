import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import {Navigation, Home, About, Contact, Footer, Login, Navbar, Register, UploadTicket, UploadEvent, ShowEvents, AuctionHouse, MakeTrades, GetTrades} from './components'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/uploadticket" element={<UploadTicket/>}/>
      <Route path="uploadevent" element={<UploadEvent/>}/>
      <Route path ="/showevents" element={<ShowEvents/>}/>
      <Route path="/auctionhouse" element={<AuctionHouse/>}/>
      <Route path="/maketrades" element={<MakeTrades/>}/>
      <Route path="/gettrades" element={<GetTrades/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
