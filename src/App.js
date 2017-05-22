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
            apiKey: 'API_KEY',
            authDomain: 'FIREBASE_DOMAIN',
            databaseURL: 'DATABASE_URL',
            projectId: 'PROJECT_ID',
            storageBucket: 'STORAGE_BUCKET',
            messagingSenderId: 'MESSAGING_SENDER_ID'
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