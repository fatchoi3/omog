import React from "react";

import { history } from "../redux/configureStore";

import Button from "../elements/Button"
import Roomlist from "../components/Roomlist";
import UsersInfo from "../components/UsersInfo";

const Main = ()=>{
    
    return(
        <>
        <UsersInfo/>
        <Roomlist/>
        <Button 
        is_width="100px"
        is_height="50px"
        _onClick={()=>{
             history.push("/game");
        }}>게임 </Button>
        </>
    );
};

export default Main;