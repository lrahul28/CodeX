import React from "react";
import './leaderboard.css';
import axios from 'axios'
import io from 'socket.io-client'
class Leaderboard extends React.Component {
  render() {
    var data = this.props.data || [],
      rows = [];
    var rows = new Array(data.length > 10 ? 10 : data.length)
      .fill(0)
      .map((z, i) => {
        var id = data[i].userId,
          un = data[i].userName.split(' ')[1]||data[i].userName.split(' ')[0],
          qs= data[i].questions,
          tm=data[i].time,
          en = data[i].earnings;
          /*oc = () => {
            window.open(
              "http://www.rewards1.com/forums-profile.php?user_id=" + id,
              "_blank"
            );
          };*/
        return (
          <li key={i} >
            <img
              src={"http://www.rewards1.com/uploads/avatar/" + id + ".jpg"}
              onError={(e) =>
                (e.target.src =
                  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")
              }
            />
            <mark>{un}</mark>
            <small>{en.toFixed(2)}</small>
          </li>
        );
      });
    return (
      <div className="l1">
        <div class="loader initial">
          <div class="spinner">
            <div class="spinner-circle"></div>
            <div class="spinner-circle"></div>
          </div>
        </div>
        <div class="scroller">
          <div id="app1"></div>
        </div>
        <div className="leaderboard">
          <h1>{this.props.title || "Leaderboard"}</h1>
          <ol>{rows}</ol>
        </div>
      </div>
    );
  }
}

class LeaderboardMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    /*var socket = this.connect('wss://r1-contest-api.herokuapp.com', event => {
			this.update(JSON.parse(event.data));
		});*/
  }
  componentDidMount() {
    var socket=io('http://localhost:5000')
    console.log(socket)
    socket.on('get',(lb)=>{
      console.log("DATA")
      console.log(lb)
      const t=lb.map((lb1)=>{
        return {userId: lb1.user, userName: lb1.username, questions: 3 , time: '1 Hr' , earnings: lb1.points}
      })
      setTimeout(
     () =>
      this.update(t
        
        //{ userId: lb[0].user, userName: lb[0].username, questions: 3 , time: '1 Hr' , earnings: lb[0].points },
        //{ userId: lb[1].user, userName: lb[1].username, questions: 3 , time: '1 Hr' , earnings: lb[1].points },
      
      ),
        500
      );  
    })
  }

  update(data) {
    this.setState({ data: data });
  }

  render() {
    return <Leaderboard title="Top Performers of the Week" data={this.state.data} />;
  }

  componentDidUpdate() {
    var loader = document.getElementsByClassName("loader")[0];
      loader.classList.remove("initial");
    loader.style.opacity = 0;
    loader.style.visibility = "hidden";
  }
}
export default LeaderboardMain;