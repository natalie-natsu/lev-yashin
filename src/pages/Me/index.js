import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../../helpers/routes';
import './Me.scss';

import NoMatch from '../NoMatch';
import Header from './Header';
import Read from './Read';
import Update from './Update';
import ResetPassword from './ResetPassword';

// eslint-disable-next-line react/prefer-stateless-function
class Me extends React.Component {
    render() {
        return (
            <div id="me">
                <Route path={routes.me.exact} component={Header} />
                <Switch>
                    <Route exact path={routes.me.exact} component={Read} />
                    <Route path={routes.me.update} component={Update} />
                    <Route path={routes.me.resetPassword} component={ResetPassword} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default translate(['common', 'page'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(Me));
