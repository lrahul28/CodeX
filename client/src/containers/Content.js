import React from 'react'
const pic1=require('../assets/img/learn.png')
const pic2=require('../assets/img/prac.png')
const pic3=require('../assets/img/code.png')
function Content(){
    return(<div>
        <div style={{height:400,marginLeft:25,width:1200,backgroundColor:"transparent"}}>
    <div style={{height:300,width:350,backgroundColor:"#29bdc1",float:"left"}}>
<h4 style={{fontSize:50,paddingTop:80}}> LEARN </h4>
<img src={pic1} style={{width:140,alignContent:"center"}}></img>
    </div>

  
    <div style={{height:300,width:350,backgroundColor:"#407294",marginLeft:80,float:"left"}}>
<h4 style={{fontSize:50,paddingTop:80}}> PRACTICE </h4>
<img src={pic2} style={{width:140,alignContent:"center"}}></img>

    </div>
    <div style={{height:300,width:350,backgroundColor:"burlywood",marginLeft:70,float:"left"}}>
<h4 style={{fontSize:50,paddingTop:80}}> CODE</h4>
<img src={pic3} style={{width:140,alignContent:"center"}}></img>

    </div>
  
    

         </div>
    </div>)
}
export default Content;