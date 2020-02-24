import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/ProfileInfo/Profile';
import { Route, Switch } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';

import UsersAPIContainer from './components/Users/UsersAPIContainer';



const App = () => {



  return (
    // <Router>

    <div className='app-wrapper'>
      <Header />
      <Navbar />


      <div className="app-wrapper-content">
        <Switch>
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/profile' render={() => <Profile />} />
          <Route path='/users' render={() => <UsersAPIContainer /> } />
        </Switch>
      </div>

    </div>

    /* // </Router> */

  )
}


export default App;