import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Actions } from 'react-native-router-flux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import reducers from './reducers';
import Router from './Router';
import { LOGIN_USER_SUCCESS } from './actions/types';

class App extends Component {
    constructor() {
        super();
        this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    }
    componentDidMount() {
        const config = {
            apiKey: 'AIzaSyDEdS4ezM1Iu4lsvbZBtZiHhzR8Kg_dFkU',
            authDomain: 'manager-97b9c.firebaseapp.com',
            databaseURL: 'https://manager-97b9c.firebaseio.com',
            projectId: 'manager-97b9c',
            storageBucket: 'manager-97b9c.appspot.com',
            messagingSenderId: '288468044507'
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.store.dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: user
                });
                Actions.main();
            }
        });
    }
    render() {

        return (
            <Provider store={this.store}>
                <Router />
            </Provider>
        );
    }
}

export default App;