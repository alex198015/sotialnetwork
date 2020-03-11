import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import UsersAPIContainer from './components/Users/UsersAPIContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store'
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withSuspense } from './hoc/withSuspense';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

// import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileInfo/ProfileContainer'));



class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      // <Router>

      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />


        <div className="app-wrapper-content">
          <Switch>


            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />

            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer) } />

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
  return {
    initialized: state.appPage.initialized
  }
}

// export default compose(
//   connect(mapStateToProps, {initializeApp}),
//   withRouter
// )(App)
let AppContainer = compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App)

let SamuraiJSApp = (props) => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default SamuraiJSApp;