import React from "react";

import { history } from "../redux/configureStore";

import Button from "../elements/Button"
import OmockBase from "../components/OmockBase";

const Main = ()=>{
    
    return(
        <>
        <OmockBase/>
        <Button 
        is_width="100px"
        is_height="50px"
        _onClick={()=>{
             history.push("/test");
             console.log("가자")
        }}>채팅 </Button>
        </>
    );
};

export default Main;