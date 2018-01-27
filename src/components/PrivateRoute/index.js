import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../helpers/routes';

const PrivateRoute = ({ component: Component, componentProps, credentials, condition, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            condition(credentials)
                ? <Component {...props} {...componentProps} />
                : <Redirect
                    to={{
                        pathname: credentials.token ? routes.notAllowed : routes.auth.signIn,
                        // eslint-disable-next-line react/prop-types
                        state: { from: props.location },
                    }}
                />
        )}
    />
);

PrivateRoute.propTypes = {
    condition: PropTypes.func,
    component: PropTypes.func.isRequired,
    componentProps: PropTypes.objectOf(PropTypes.any),
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
    componentProps: {},
    condition: credentials => credentials.token,
};

export default connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(PrivateRoute);
