import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer';
import { logger } from 'redux-logger';

let rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sidebar:sidebarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form: formReducer,
    appPage: appReducer

});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware,logger)));



// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore 
window.__store__ = store;


export default store;