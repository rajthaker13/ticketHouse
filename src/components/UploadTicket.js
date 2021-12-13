import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';
const session = require("express-session");
 
class UploadTicket extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

 
    this.state = {
      event: "",
      duration: 0,
      starting_price: 0,
      allEvents: [],
    };
  }
 
  // These methods will update the state properties.
  onChangeEvent(e) {
    this.setState({
      event: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
 
  onChangePrice(e) {
    this.setState({
      starting_price: e.target.value,
    });
  }

  componentDidMount() {
    axios.get("http://localhost:5000/event").then(res => this.setState({
      allEvents: res.data,
    }))

  }

 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    axios.get("http://localhost:5000/get/" + token).then(res => {
      const newPosting = {
        username: res.data.username,
        event: this.state.event,
        duration: this.state.duration * 60,
        starting_price: this.state.starting_price
      };
  
   
      axios
        .post("http://localhost:5000/posting/add", newPosting)
        .then((res) => {
          this.setState({
            event: "",
            duration: 0,
            starting_price: 0,
        });
        });
    })
    // We will empty the state after posting the data to the database
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Post a New Ticket Sale</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Event </label>
            <select value={this.state.event} onChange={this.onChangeEvent}>
              {this.state.allEvents.map((option) => {
                let optionString = option.venue + " " + option.date
                return(
                  <option value={optionString}>{optionString}</option>
                )
              } )}
            </select>
          </div>
          <div className="form-group">
            <label>Duration (minutes): </label>
            <input
              type="number"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Start Price:  </label>
              <input
                type="number"
                value={this.state.starting_price}
                onChange={this.onChangePrice}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Upload Posting"
                className="btn btn-primary"
              />
            </div>
        </form>
      </div>
    );
  }
}

export default UploadTicket