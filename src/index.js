import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createFilter } from 'redux-persist-transform-filter';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createRavenMiddleware from 'raven-for-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Raven from 'raven-js';

import 'bootstrap';
import './style/fonts';

import { vanillaPromise, readyStatePromise } from './middlewares/promise';
import reducers from './reducers';
import App from './components/App';
import Loader from './components/Loader';

Raven.config('https://f303676216684f9682cef9a377eb8e81@sentry.io/289608').install();

const middleWares = [thunk];
if (process.env.NODE_ENV === 'development') {
    middleWares.push(createLogger());
}

// Should be pushed after redux-logger.
middleWares.concat([vanillaPromise, readyStatePromise, createRavenMiddleware()]);

const store = createStore(
    reducers,
    compose(
        autoRehydrate(),
        applyMiddleware(...middleWares),
    ),
);

class AppProvider extends React.Component {
    constructor() {
        super();
        this.state = { rehydrated: false };
    }

    componentWillMount() {
        // store only a subset of the state of entities
        const saveSubsetFilter = createFilter(
            'entities',
            ['groups', 'matches', 'teams'],
        );

        persistStore(store, {
            whitelist: ['app', 'calendar', 'credentials', 'entities'],
            transforms: [saveSubsetFilter],
        }, () => { this.setState({ rehydrated: true }); });
    }

    render() {
        if (!this.state.rehydrated) { return <Loader />; }

        return <Provider store={store}><App /></Provider>;
    }
}

ReactDOM.render(
    <AppProvider />,
    document.getElementById('root'),
);

export { store as default };
