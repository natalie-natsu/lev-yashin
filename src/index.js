import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import 'bootstrap';
import './style/fonts';

import reducers from './reducers';
import App from './components/App';
import Loader from './components/Loader';

const middleWares = [thunk];
if (process.env.NODE_ENV === 'development') {
    middleWares.push(createLogger());
}

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
        persistStore(store, { whitelist: ['app', 'authentication'] }, () => {
            this.setState({ rehydrated: true });
        });
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
