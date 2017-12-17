import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import 'flag-icon-css/css/flag-icon.min.css';
import i18n from './i18n';

import { signOut } from '../../actions/authentication';
import { validateFirstVisit } from '../../actions/app';

import './App.scss';
import Home from '../../pages/Home';
import Layout from '../Layout';
import FirstVisit from '../FirstVisit';
import NoMatch from '../../pages/NoMatch';

const $ = window.jQuery;

class App extends React.Component {
    componentDidMount() {
        if (!this.props.app.firstVisit) {
            const firstVisitModal = $('#modal-first-visit');
            firstVisitModal.modal('show');
            firstVisitModal.on('hidden.bs.modal', () => this.props.dispatch(validateFirstVisit()));
        }
    }

    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <div id="app">
                    <BrowserRouter>
                        <Switch>
                            <Layout signOut={() => this.props.dispatch(signOut())}>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Layout>
                        </Switch>
                    </BrowserRouter>
                    <FirstVisit />
                </div>
            </I18nextProvider>
        );
    }
}

App.propTypes = {
    app: Proptypes.shape({ firstVisit: Proptypes.bool }).isRequired,
    dispatch: Proptypes.func.isRequired,
};

export default connect(
    state => ({ app: state.app }),
    dispatch => ({ dispatch }),
)(App);
