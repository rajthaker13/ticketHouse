import React, { Component, useEffect, useState } from "react";
// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';
import {Card, Button} from '@material-ui/core';
import Countdown from "./Countdown";
 
class AuctionHouse extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.getEventName = this.getEventName.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBid = this.handleBid.bind(this);
    this.state = {
        listings: [],
        bid: 0,
        bidButtonText: "Bid",
    }

  }


componentDidMount() {
    axios.get("http://localhost:5000/posting").then(res => this.setState({
        listings: res.data,
    }))
}

handleClick(id) {
    const newPosting = {
        bid: this.state.bid
    }
    axios.post("http://localhost:5000/bid/" + id, newPosting).then(res => {
         console.log(res);
    })
}

getEventName(id) {
    axios.post("http://localhost:5000/getEvent/" + id).then(res => {
        return res.venue
    })
}

handleBid(e) {
    this.setState({
        bid: e.target.value,
    })
}



   render() {
    return (
            <div style={{display: "flex", flexDirection: "row"}}>
             { this.state.listings.map((listing) => {
                 let seconds = listing.duration;
                 let id = listing._id;
                if(listing.duration == 0) {
                    return
                } else {
                return(
                  <Card sx={{ minWidth: 500, mb: 1.5}} style={{width: 1000, textAlign:"center", backgroundColor:"red", marginInline: 20, borderRadius: 10}}>
                   <b>{'Event: '}</b>
                     {listing.event}
                    <br></br>
                    <p><small>
                    <b>{'Time Left: '}</b>
                     <Countdown seconds={seconds} id={id}></Countdown>
                    <br></br>
                  <b>{'Current Bid: '}</b>
                  {listing.starting_price}
                  <br></br>
                  <b>{'Posted by: '}</b>
                  {listing.username}
                  <br></br>
                  <div>
                
                <input type="number" value={this.state.bid == undefined ? listing.starting_price: this.state.bid} onChange={this.handleBid} />
                <br></br>
                  <Button style={{backgroundColor: "blue"}} onClick={this.handleClick(id)}>Bid</Button>
                  </div>
                      </small></p>
                    
                </Card>
                    
                );}
              })}
            </div>
    )
}
}

export default AuctionHouse