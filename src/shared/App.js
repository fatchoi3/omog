import React from "react";
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


// const socketWait = io.connect("http://localhost:4001");
// const socketGame = io.connect("http://15.164.103.116/game");
// const socketGame = io.connect("http://localhost:4001/game");


function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/main" exact component={Main} />
        <Route path="/" exact component={Login} />
        {/* <Route path="/waiting/:roomNum" exact render={() => <Waiting socket={socketWait} />} /> */}
        <Route path="/waiting/:roomNum" exact component={Waiting} />
        <Route path="/game/:roomNum" exact component={Game} />
        {/* <Route path="/game/:gameNum" exact render={() => <Game socket={socketGame}  exact component={Game}/>} /> */}
        <Route path="/test" exact component={Omog} />
        <Route path='/game/result/:roomNum' exact component={Result} />
      </ConnectedRouter>
    </>
  );
}
export default App;