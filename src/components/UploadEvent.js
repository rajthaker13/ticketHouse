import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';
 
class UploadEvent extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    
    this.onChangeVenue = this.onChangeVenue.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

 
    this.state = {
      venue: "",
      description: "",
      date: new Date().toLocaleDateString(),
      startTime: new Date().toLocaleTimeString(),
      endTime: new Date().toLocaleTimeString(),
    };
  }
 
  // These methods will update the state properties.
  onChangeVenue(e) {
    this.setState({
      venue: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
 
  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangeStartTime(e) {
    this.setState({
      startTime: e.target.value,
    });
  }

  onChangeEndTime(e) {
    this.setState({
      endTime: e.target.value,
    });
  }

 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    console.log(token);

    axios.get("http://localhost:5000/get/" + token).then(res => {
      const newPosting = {
        username: res.data.username,
        venue: this.state.venue,
        description: this.state.description,
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      };
  
   
      axios
        .post("http://localhost:5000/event/add", newPosting)
        .then((res) => {
          this.setState({
            venue: "",
            description: "",
            date: new Date().toLocaleDateString(),
            startTime: new Date().toLocaleTimeString(),
            endTime: new Date().toLocaleTimeString(),
        });
        });
    })
    
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.

 
    // We will empty the state after posting the data to the database
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Register a new Event!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Venue: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.venue}
              onChange={this.onChangeVenue}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
              <input
                type="date"
                value={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          <div className="form-group">
            <label>Start Time: </label>
              <input
                type="time"
                value={this.state.startTime}
                onChange={this.onChangeStartTime}
              />
           </div>       
           <div className="form-group">
            <label>End Time: </label>
              <input
                type="time"
                value={this.state.endTime}
                onChange={this.onChangeEndTime}
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

export default UploadEvent