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
import Result from '../page/Result';

const socketWait = io.connect("http://15.164.103.116/waiting");
// const socketWait = io.connect("http://localhost:4001");

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/main" exact component={Main} />
        <Route path="/" exact component={Login} />
        <Route path="/waiting/:roomNum" exact render={() => <Waiting socket={socketWait} />} />
        {/* <Route path="/waiting/:roomNum" exact component={Waiting} /> */}
        <Route path="/game/:roomNum" exact component={Game} />
        <Route path="/test" exact component={Omog} />
        <Route path='/game/result/:roomNum' exact component={Result} />
      </ConnectedRouter>
    </React.Fragment>
  );
}
export default App;