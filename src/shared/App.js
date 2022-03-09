import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import io from "socket.io-client";

import Main from "../page/Main";
import Login from "../page/Login";
import Game from "../page/Game";
import Omog from "../components/Omog";
import Waiting from '../page/Waiting';

// http://15.164.103.116/
const socket = io.connect("http://localhost:4001/");

function App() {


  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/main" exact component={Main} />
        <Route path="/" exact component={Login} />
        <Route path="/waiting/:roomNum" exact render={() => <Waiting socket={socket} />} />
        <Route path="/game" exact component={Game} />
        <Route path="/test" exact component={Omog} />
      </ConnectedRouter>
    </React.Fragment>
  );
}
export default App;