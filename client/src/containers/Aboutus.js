import React from "react"
import {Jumbotron,Button} from 'react-bootstrap'
function About(){
return(<div className="about" style={{width:"100%"}}>
  <br/>
<div style={{width:600,paddingLeft:20,paddingTop:10,boxShadow:"0.3px 0.1px 2.3px 2px rgb(109, 109, 109)",height:320,marginLeft:30,backgroundColor:"whitesmoke",paddingTop:2}}>
  <h1 style={{fontSize:50,marginLeft:0,marginTop:0,color:"#004E7C"}}>About CodeX</h1>
  <br/>
  <br/><hr/>
  <p style={{textAlign:"left"}}>
The purpose of CodeX is to provide an environment which helps to ease the learning process associated with programming abilities.  
CodeX provides a learning environment that consolidates students programming abilities and learning important algorithms by applying it on practical problems.This helps making students adept in competitive coding as well. 
The salient features include a convenient editor. Conduction of weekly coding competitions and a weekly leaderboard that helps in tracking a person’s progress. 
Faculty of Vasavi College Of Engineering Can conduct their academic related programming assignments and evaluate through Codex and assign marks.
   </p>
</div>
<div style={{width:600,paddingLeft:20,paddingTop:10,boxShadow:"0.3px 0.1px 2.3px 2px rgb(109, 109, 109)",height:200,marginLeft:30,backgroundColor:"whitesmoke",paddingTop:2}}>
  <h1 style={{fontSize:50,marginLeft:0,marginTop:0,color:"#004E7C"}}>Founders & Administrators</h1>
  <br/>
  <br/><hr/>
  <h3>🚀 J. Karthik</h3>
  <h3>🚀 L. Rahul</h3>
</div>
</div>);
}
export default About;