import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { BrowserRouter as Router} from "react-router-dom";

import App from './components/app/app';
import {AuthServiceContext, RoomServiceContext} from './components/service-context'
import {AuthService, RoomService} from './services'
import store from "./store";

import './index.sass'
import 'bootstrap/dist/css/bootstrap.min.css';

const authService = new AuthService();
const roomService = new RoomService();

ReactDOM.render(
  <>
    <Provider store={store}>
      <AuthServiceContext.Provider value={authService}>
        <RoomServiceContext.Provider value={roomService}>
          <Router>
            <App />
          </Router>
        </RoomServiceContext.Provider>
      </AuthServiceContext.Provider>
    </Provider>
  </>,
  document.getElementById('root')
);
