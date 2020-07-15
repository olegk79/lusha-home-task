import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store'

//import React from "react";

import UsersList from "./UsersList";
import AddUser from "./AddUser";


export default ({ }) => (
  <Provider store={store}>
      <HashRouter>
          <Switch>
              <Route exact path='/users' component={UsersList} />
              <Route exact path='/addUser' component={AddUser} />
              <Redirect from='/' to='/users' />
          </Switch>
      </HashRouter>
  </Provider>
);
