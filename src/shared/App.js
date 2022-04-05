import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

const Login = lazy(() => import('../page/Login'));
const Main = lazy(() => import('../page/Main'));
const Waiting = lazy(() => import('../page/Waiting'));
const GameStart = lazy(() => import('../page/GameStart'));
const Result = lazy(() => import('../page/Result'));


function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ConnectedRouter history={history}>
          <Route path="/main" exact component={Main} />
          <Route path="/" exact component={Login} />
          <Route path="/waiting/:roomNum" exact component={Waiting} />
          {/* <Route path="/game/:roomNum" exact component={Game} /> */}
          <Route path="/game/:roomNum" exact component={GameStart} />
          <Route path='/game/result/:roomNum' exact component={Result} />
        </ConnectedRouter>
      </Suspense>
    </>
  );
}
export default App;