import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";


import Main from "../page/Main";
import Login from "../page/Login";
// import Game from "../page/Game5";
import Waiting from '../page/Waiting';
import Result from '../page/Result';
import GameStart from "../page/GameStart";


function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/main" exact component={Main} />
        <Route path="/" exact component={Login} />
        <Route path="/waiting/:roomNum" exact component={Waiting} />
        {/* <Route path="/game/:roomNum" exact component={Game} /> */}
        <Route path="/game/:roomNum" exact component={GameStart} />
        <Route path='/game/result/:roomNum' exact component={Result} />
      </ConnectedRouter>
    </>
  );
}
export default App;