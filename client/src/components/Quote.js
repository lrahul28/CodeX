import { repeat } from 'lodash';
import React from 'react';
export default function QuoteSection(){
    const repeat=(i)=>{
        var buffer=[];
        while(i--!==0){
            buffer.push(React.createElement('br'));
        }
        return buffer;
    }
    const quote=()=> { 
        console.log("Quote")
      let arr=['The first programmer in the world was a woman. Her name was Ada Lovelace and she worked on an analytical engine back in the 1,800’s'
        ,'Just as we said before, recent studies have shown that over 70% of coding jobs are in fields outside of technology.',
        'The first computer virus was created in 1983.',
        'The first computer game was created in 1961.',
        'The word computer “bug” was inspired by a real bug. It was founded by Grace Hopper in 1947.',
        'Nowadays, there are over 700 different programming languages. All experts recommend for kids to start with a visual editor and a blockly based programming language for them to learn in a smoother and easier way.',
        'The first programming language (per sé) was called Fortran, and it was created in the ’50s.',
        'Almost any powered with electricity needs to be coded. Can you imagine?!',
        'Since many programming languages share the same structure, it is easy for students to learn a new programming language once they have already mastered one before.',
        'Computers run on binary code, which means that their software is written using only 1s and 0s.',
        'Learning coding has stunning cognitive-related benefits, such as problem-solving, computational thinking, analytical thinking, creative thinking, leadership-related skills, and even teamwork.',
        'In the near future knowing how to code will be as necessary as knowing how to write is today. Yes, regardless of the field or career your students decide for their future.']
     
        return arr[Math.floor(Math.random() * arr.length)];

    }  
    return (
        <div className="jumbotron" >
        <h1 style={{fontSize:40,fontFamily:"serif",color:"#4a4e4d"}}>CODEX FACT..!!</h1>
        <br/><br/><br/><br/>
    <p style={{fontFamily:"revert",fontSize:23, wordWrap: "break-word"}}>{quote()}</p>
     
      </div>
        );
}