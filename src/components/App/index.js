import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import 'flag-icon-css/css/flag-icon.min.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import { signOut } from '../../actions/authentication';
import { validateFirstVisit } from '../../actions/app';
import { routes } from '../../helpers/routes';

import './App.scss';
import Layout from '../Layout';
import FirstVisit from '../FirstVisit';

import PrivateRoute from '../PrivateRoute';
import NotAllowed from '../../pages/NotAllowed';
import NoMatch from '../../pages/NoMatch';
import Home from '../../pages/Home';
import Auth from '../../pages/Auth';
import Me from '../../pages/Me';

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
                    <ToastContainer />
                    <BrowserRouter>
                        <Layout signOut={() => this.props.dispatch(signOut())}>
                            <Switch>
                                <Route exact path={routes.home} component={Home} />
                                <Route path={routes.auth.exact} component={Auth} />
                                <PrivateRoute path={routes.me.exact} component={Me} />
                                <Route path={routes.notAllowed} component={NotAllowed} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Layout>
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
