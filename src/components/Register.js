import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';
 
class Register extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value,
    });
  }
 
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();


 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      email: this.state.email,
      password: bcrypt.hashSync(this.state.password)
    };
    console.log(newperson)
 
    axios
      .post("http://localhost:5000/user/add", newperson)
      .then((res) => console.log(res));
 
    // We will empty the state after posting the data to the database
    this.setState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create new User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.first_name}
              onChange={this.onChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.last_name}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
              <input
                type="text"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
            <label>Username: </label>
              <input
                type="text"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group">
            <label>Password: </label>
              <input
                type="text"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create person"
                className="btn btn-primary"
              />
            </div>
        </form>
      </div>
    );
  }
}

export default Register