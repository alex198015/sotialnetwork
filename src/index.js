
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
// import store from './redux/redux-store'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import SamuraiJSApp from './App';



// let rerenderEntireTree = () => {
    ReactDOM.render(
        <SamuraiJSApp />, document.getElementById('root'));

// }
// rerenderEntireTree();

// store.subscribe(() => {
    
//       rerenderEntireTree();
//      });

// rerenderEntireTree(store.getState())

// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireTree(state)
// })

serviceWorker.unregister();