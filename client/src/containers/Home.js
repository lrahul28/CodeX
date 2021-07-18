import React from 'react';
import ControlledCarousel from '../components/Corosel';
import QuoteSection from '../components/Quote';
import Content from './Content'
function Home(props){
    return (
    <div className="carousel" style={{height:1200}}>
          <ControlledCarousel />
            <br/><br/>
            <Content />
            <QuoteSection />
            <br/>
             
         </div>
    );
}

export default Home;