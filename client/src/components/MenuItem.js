import React from 'react';
import {FaPoll,FaRocket,FaHome,FaLaptopCode,FaAddressCard,FaSignInAlt, FaUserPlus} from "react-icons/fa"
export let MenuItems=[
    {
        title: "Home",
        url: "/",
        cName:"nav-link",
        icon:<FaHome/>
    },
    {
        title: "LeaderBoard",
        url: "/leaderboard",
        cName:"nav-link",
        icon:<FaPoll/>
    },
    {
        title: "CodeX Editor",
        url: "/editor",
        cName:"nav-link",
        icon:<FaLaptopCode/>
    },
    {
        title: "AboutUs",
        url: "/aboutus",
        cName:"nav-link",
        icon:<FaRocket  />
    },
    {
        title: "DashBoard",
        url: "",
        cName: "nav-link",
        icon: <FaHome />
    }

]
export default MenuItems;