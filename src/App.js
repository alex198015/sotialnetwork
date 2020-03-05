import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';

import { Route, Switch, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
// import {getAuthUserData} from './redux/auth-reducer'
import UsersAPIContainer from './components/Users/UsersAPIContainer';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';


class App extends React.Component {

  componentDidMount(){   
    this.props.initializeApp()    
}

  render() {
    if (!this.props.initialized){
      return <Preloader/>
    }
    
    return (
      // <Router>

      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />


        <div className="app-wrapper-content">
          <Switch>
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/users' render={() => <UsersAPIContainer />} />
            <Route path='/login' render={() => <Login />} />

          </Switch>
        </div>

      </div>

      /* // </Router> */

    )
  }
}
const mapStateToProps = (state) => {
  return{
    initialized: state.appPage.initialized
  }
}

export default compose(
  connect(mapStateToProps, {initializeApp}),
  withRouter
)(App)