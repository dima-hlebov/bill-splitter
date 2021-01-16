import React from 'react';
import { Switch, Route} from "react-router-dom";

import Header from '../header/header';
import Burger from '../burger/burger';
import Footer from '../footer/footer';
import {HomePage, LoginPage, SingUpPage, RoomsPage, RoomPage, InvitePage} from '../pages';

import './app.sass';

function App() {
  return (
    <div className="app" id="outer-container">
      <Burger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="page-wrap" id="page-wrap">
        <Header/>
        <div className="content-wrap">
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route path="/sign-in">
              <LoginPage/>
            </Route>
            <Route path="/sign-up">
              <SingUpPage/>
            </Route>
            <Route exact path="/rooms">
              <RoomsPage/>
            </Route>
            <Route exact path="/rooms/:id">
              <RoomPage/>
            </Route>
            <Route exact path="/rooms/:id/invite">
              <InvitePage/>
            </Route>
          </Switch>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
