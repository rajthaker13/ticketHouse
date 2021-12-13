import React, { Component } from "react";

import {Card, Button} from '@material-ui/core';
// This will require to npm install axios
import axios from 'axios';

 
class GetTrades extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onDeleteTrade = this.onDeleteTrade.bind(this);

    this.state = { 
        tradeRequests:[],
        pendingTrades:[]

  }
}
    onAccept(tradeInfo) {
        const id = tradeInfo.id;
        const newPosting = {
            username: tradeInfo.username,
            userReq: tradeInfo.userReq,
            sendTicks: tradeInfo.sendTicks,
            recieveTicks: tradeInfo.recieveTicks
          }
          axios.post("http://localhost:5000/acceptTrade/" + id, newPosting).then(response => {
            console.log(response.status)
          })
        


    }
    onDeleteTrade(id) {
        axios.delete("http://localhost:5000/getTradeReqs/" + id).then(res => {
            console.log(res);
        })

    }



  componentDidMount() {
      let newPosting = {
          username: localStorage.getItem("username"),
      }
 axios
      .post("http://localhost:5000/getTradeReqs", newPosting)
      .then((res) => {
          let updateTradeReqs = res.data;
          axios
          .post("http://localhost:5000/getPendingTrades", newPosting)
          .then((response) => {
            let updatePendingTrades = response.data
            this.setState({
                tradeRequests: updateTradeReqs,
                pendingTrades: updatePendingTrades
            })
          }
          )

      }
      )
}



  
  
  render() {
    return (
        <div>
        <div className='TradeReqs'>
        { this.state.tradeRequests.map((trade) => {
        let tradeInfo = {
            id: trade._id,
            username: trade.username,
            userReq: localStorage.getItem("username"),
            sendTicks: JSON.stringify(trade.sendTicks[0]["value"]),
            recieveTicks: JSON.stringify(trade.recieveTicks[0]["value"])
        }
           return(
             <Card sx={{ minWidth: 1000, mb: 1.5}}>
             
              <b>{'You were offered: '}</b>
                {JSON.stringify(trade.recieveTicks[0]["value"])}
               <br></br>
               <p><small>
               <b>{'For: '}</b>
               {JSON.stringify(trade.sendTicks[0]["value"])}
               <br></br>
             <b>{'From: '}</b>
             {trade.username}
             <br></br>
            </small></p>
            <Button onClick={this.onAccept(tradeInfo)}>Accept</Button>
            <Button onClick={this.onDeleteTrade(tradeInfo.id)}>Decline</Button>
           </Card>
           );
         })}
       </div>
       <br></br>
       <div className='PendingTrades'>
        { this.state.pendingTrades.map((trade) => {
        let id = trade._id;
           return(
             <Card sx={{ minWidth: 1000, mb: 1.5}}>
             
              <b>{'You offered: '}</b>
                {JSON.stringify(trade.sendTicks[0]["value"])}
               <br></br>
               <p><small>
               <b>{'For: '}</b>
               {JSON.stringify(trade.recieveTicks[0]["value"])}
               <br></br>
             <b>{'To: '}</b>
             {trade.userReq}
             <br></br>
            </small></p>
            <Button onClick={this.onDeleteTrade(id)}>Cancel Trade</Button>
               
           </Card>
           );
         })}
       </div>
       </div>
    )  
   
}


}
export default GetTrades
