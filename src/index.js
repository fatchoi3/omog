import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './shared/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';

import store from './redux/configureStore';

Sentry.init({
  // 모든환경에 설정할 경우
  dsn: "https://e5bc7edf21f14314a818feafbd051df1@o1189446.ingest.sentry.io/6310171x",
  // production환경만 설정할 경우
  // dsn: process.env.NODE_ENV === "production"
  //     ? "https://xxxxxxxxxxxxxxxxxxxxxxxxxxx@xxxxxx.ingest.sentry.io/xxxxx"
  //     : false,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
