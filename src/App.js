import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';

import { Route, Switch } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';

import UsersAPIContainer from './components/Users/UsersAPIContainer';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';



const App = () => {



  return (
    // <Router>

    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />


      <div className="app-wrapper-content">
        <Switch>
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/users' render={() => <UsersAPIContainer /> } />
          <Route path='/login' render={() => <Login /> } />

        </Switch>
      </div>

    </div>

    /* // </Router> */

  )
}


export default App;