import React, { Component } from "react";

import {Card, Typography,CardMedia,CardContent} from '@material-ui/core';




// This will require to npm install axios
import axios from 'axios';
import bcrypt from 'bcryptjs';
 
class ShowEvents extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.state = { 
      events: [
      // { 
    //   username: "",
    //   venue: "",
    //   description: "",
    //   date: "",
    //   startTime: "",
    //   endTime: "",
    // }
  ] 
  }
}


  componentDidMount() {
  console.log('here')
  axios
      .get("http://localhost:5000/event")
      .then((res) => this.setState({
        events: res.data
      })
      )
}
  
  
  render() {
    return (
<div className='Events' style={{display: "flex", flexDirection: "row"}}>
 { this.state.events.map((event) => {
    return(
   
      <Card sx={{ minWidth: 500, mb: 1.5}} style={{width: 1000, textAlign:"center", backgroundColor:"lightblue", marginInline: 20, borderRadius: 10}}>
        

      <CardContent>
     
      
      
        <Typography gutterBottom variant ='h5' component ='div'>
        <b>{'Event: '}</b>
         {event.venue}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
        <b>{'Description: '}</b>
         {event.description}
        <br></br>
      <b>{'posted by: '}</b>
      {event.username}
      <br></br>
      <b>{'Date of Event: '}</b>
      {event.date}
      <br></br>
      <b>{'Event starts at: '}</b>
      {event.startTime}
      <br></br>
      <b>{'Event ends at: '}</b>
      {event.endTime}
        </Typography>
      </CardContent>
     
       
          
        
    </Card>
    );
  })}
</div>

   
    )  
   
}


}
export default ShowEvents
