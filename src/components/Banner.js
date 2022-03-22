import React from "react";

import { Button } from "../elements";

const Banner = () =>{
    return(
        <div>
            <Button
            is_width="100px"
            is_margin="0 50px 0 0"
            _onClick={()=>{
                window.open("https://forms.gle/AxysJH5XHe66kKDn8",'_blank' )
            }}
            >
                배너가 들어갈 공간입니다
            </Button>
        </div>
    )
};
export default Banner;