import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {BrowserRouter, Route} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Main from "../page/Main";
import Login from "../page/Login";
import Game from "../page/Game";


// const ENDPOINT = "http://127.0.0.1:4001";
function App() {
 
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  // }, []);

  return (
    <React.Fragment>
        <ConnectedRouter  history={history}>
        {/* <p>
      It'zs <time dateTime={response}>{response}</time>
    </p> */}
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/game" exact component={Game} />
        </ConnectedRouter>

    </React.Fragment>
  );
}
export default App;