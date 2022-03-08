import axios from "axios";

const apis =  axios.create({
    //baseURL: "http://localhost:3003/"
    baseURL: "http://15.164.103.116/"
    
})

export default apis;