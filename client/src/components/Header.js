import React from "react";
import NavBar from "./Nav_Bar";

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <NavBar />
            </div>
        );
    }
}

export default Header;