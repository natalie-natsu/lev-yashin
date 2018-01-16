import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import { fetchProfile } from '../../actions/entities/user';
import { routes } from '../../helpers/routes';
import './Me.scss';

import NoMatch from '../NoMatch';
import Read from './Read';
import Update from './Update';
import ResetPassword from './ResetPassword';

class Me extends React.Component {
    componentDidMount() {
        if (this.shouldFetchProfile()) { this.props.dispatch(fetchProfile(routes.me)); }
    }

    componentDidUpdate() {
        if (this.shouldFetchProfile()) { this.props.dispatch(fetchProfile(routes.me)); }
    }

    shouldFetchProfile() {
        const { credentials, page } = this.props;
        return !page.isFetching && (page.needRefresh || !credentials.profile.email);
    }

    render() {
        return (
            <div id="me">
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

Me.propTypes = {
    credentials: PropTypes.shape({
        _id: PropTypes.string,
        token: PropTypes.string,
        profile: PropTypes.shape({
            email: PropTypes.string,
            userName: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            phoneNumber: PropTypes.string,
            picture: PropTypes.string,
        }),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    page: PropTypes.shape({
        error: PropTypes.bool,
        isFetching: PropTypes.bool,
        needRefresh: PropTypes.bool,
        lastResponse: PropTypes.object,
        updatedAt: PropTypes.number,
    }).isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({ credentials: state.credentials, page: state.pages.Me }),
    dispatch => ({ dispatch }),
)(Me));
