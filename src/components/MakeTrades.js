import React, { Component, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Select from 'react-select';

class MakeTrades extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

     
    this.onChangeUserReq = this.onChangeUserReq.bind(this);
    this.onChangeUserTicks = this.onChangeUserTicks.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.getTheirTicks = this.getTheirTicks.bind(this);

    this.state = {
      userReq: "", 
      myTicks: [],
      theirTicks: [],
      sendTicks: [],
      recieveTicks: [],
    }
  }


  componentDidMount() {
    let username = localStorage.getItem("username");
    axios.get("http://localhost:5000/getuserticks/" + username).then(response => {
      let update = response.data.map((option) => {
        let choice = {
          value: option.event, label: option.event
        }
        return(
          choice
        )
      })
      console.log(update)
      this.setState({
        myTicks: update
      })
    }
    )
  }


  onChangeUserReq(e){
    let username = e.target.value;
    axios.get("http://localhost:5000/getuserticks/" + username).then(response => {
      let update = response.data.map((option) => {
        let choice = {
          value: option.event, label: option.event
        }
        return(
          choice
        )
      })
      console.log(update)
      this.setState({
        userReq: username,
        theirTicks: update
      })
    }
    )
  }

  onSubmit() {
    const newPosting = {
      username: localStorage.getItem("username"),
      userReq: this.state.userReq,
      sendTicks: this.state.myTicks,
      recieveTicks: this.state.theirTicks
    }
    axios.post("http://localhost:5000/trade", newPosting).then(response => {
      console.log(response.status)
    })
  }

  onChangeUserTicks() {
    console.log("Noice")
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Trade Central</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>Recipient (username):</label>
              <input
                type="text"
                value={this.state.userReq}
                onChange={this.onChangeUserReq}
            />
            </div>
            <label>You send: </label>
            <Select options={this.state.myTicks}></Select>
            <Select options={this.state.theirTicks}></Select>
            {/* <select value={this.state.myTicks.map((option) => {
                return(
                  <option value={option.event}>{option.event}</option>
                )
              } )} onChange={this.onChangeUserTicks} data-placeholder="Enter a Valid Username" multiple>
              {this.state.myTicks.map((option) => {
                return(
                  <option value={option.event}>{option.event}</option>
                )
              } )}
            </select>
            <label>You recieve: </label>
            <select value={this.state.recieveTicks} onChange={this.onChangeUserTicks} multiple="true">
              {this.state.theirTicks.map((option) => {
                return(
                  <option value={option.event}>{option.event}</option>
                )
              } )}
            </select> */}
            <div className="form-group">
              <input
                type="submit"
                value="Submit Trade"
                className="btn btn-primary"
              />
            </div>
        </form>
      </div>
    );
}
}

export default MakeTrades