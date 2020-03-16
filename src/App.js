import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, withRouter, BrowserRouter, Redirect } from 'react-router-dom';
import UsersAPIContainer from './components/Users/UsersAPIContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store'
// import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withSuspense } from './hoc/withSuspense';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

// import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileInfo/ProfileContainer'));



class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors );
  }
  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors );
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

            <Route exact path='/' render={() => <Redirect to = {"/profile"} /> } />
            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />

            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer) } />

            <Route path='/users' render={() => <UsersAPIContainer pageTitle={"Самурай"}/>} />
            {/* <Route  path='/login/facebook' render={() => <div>facebook</div>} /> */}
            <Route exact path='/login' render={() => <Login />} />
            <Route  path='*' render={() => <div className={"notfound"}>404 NOT FOUND</div>} />

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
    // <HashRouter>
      <BrowserRouter basename={process.env.PUBLIC_URL}> 
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter> 
  )
}

export default SamuraiJSApp;