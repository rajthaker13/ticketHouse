import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';
 
class Login extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      username: "",
      password: "",
    };
  }
 

 
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
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
    const userPost = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(userPost);
 
   axios
      .post("http://localhost:5000/login", userPost)
      .then((res) => {
        if(res.status == 200) {
          localStorage.setItem("token", res.data._id);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("firstName", res.data.first_name);
          localStorage.setItem("lastName", res.data.last_name);
        }
        else{
          alert("Incorrect username or password");
        }
      });
 
    // We will empty the state after posting the data to the database
    this.setState({
      username: "",
      password: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
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
                value="Log In"
                className="btn btn-primary"
              />
            </div>
        </form>
      </div>
    );
  }
}

export default Login