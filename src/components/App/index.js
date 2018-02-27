import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'flag-icon-css/css/flag-icon.min.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import { validateFirstVisit } from '../../actions/app';
import { signOut } from '../../actions/authentication';
import { successFetchUser } from '../../actions/entities/user';
import { getHeaders, wsConnect, wsDisconnect } from '../../helpers/nes';
import { routes } from '../../helpers/routes';
import { localeTo } from '../../helpers/locales';

import './App.scss';
import Layout from '../Layout';
import FirstVisit from '../FirstVisit';

import PrivateRoute from '../PrivateRoute';
import NotAllowed from '../../pages/NotAllowed';
import NoMatch from '../../pages/NoMatch';
import Home from '../../pages/Home';
import Auth from '../../pages/Auth';
import Me from '../../pages/Me';
import Game from '../../pages/Game';
import GameCreate from '../../pages/Game/Create';
import Calendar from '../../pages/Calendar';
import Match from '../../pages/Match';

const $ = window.jQuery;

class App extends React.Component {
    componentDidMount() {
        const { credentials, dispatch, app } = this.props;

        moment.locale(localeTo(app.locale, 'moment'));

        if (credentials.token) {
            wsConnect(getHeaders(credentials));
            dispatch(successFetchUser(credentials, 'APP_DID_MOUNT'));
        }

        if (!this.props.app.firstVisit) {
            const firstVisitModal = $('#modal-first-visit');
            firstVisitModal.modal('show');
            firstVisitModal.on('hidden.bs.modal', () => this.props.dispatch(validateFirstVisit()));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { locale } = nextProps.app;
        if (locale !== this.props.app.locale) {
            moment.locale(localeTo(locale, 'moment'));
        }
    }

    componentWillUnmount() {
        const { token } = this.props.credentials;
        if (token) { wsDisconnect(); }
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
                                <PrivateRoute path={routes.game.create} component={GameCreate} />
                                <PrivateRoute path={routes.game.read} component={Game} />
                                <Route exact path={routes.calendar} component={Calendar} />
                                <Route exact path={routes.match} component={Match} />
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
    app: PropTypes.shape({ firstVisit: PropTypes.bool, locale: PropTypes.string }).isRequired,
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect(
    state => ({ app: state.app, credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(App);
