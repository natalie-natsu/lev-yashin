import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faUserCircle } from '@fortawesome/fontawesome-free-regular';

import { failSignIn, requestSignIn, successSignIn } from '../../../actions/authentication';
import { getEndpoint, headers } from '../../../helpers/endpoint';
import { routes } from '../../../helpers/routes';

import SideAction from '../../../components/MainHeader/SideAction';
import SignInForm from '../../../components/Authentication/SignInForm';


function handleSignInError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'Invalid email.': submissionError.email = 'incorrect'; break;
        case 'Invalid password.': submissionError.password = 'incorrect'; break;
        default: submissionError._error = 'badRequest';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}

class SignIn extends React.Component {
    signIn(values) {
        if (!values) { return false; }

        const { dispatch } = this.props;
        dispatch(requestSignIn());
        return fetch(getEndpoint('signIn'), {
            method: 'POST',
            headers,
            body: JSON.stringify(values),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    dispatch(failSignIn());
                    throw new SubmissionError(handleSignInError(json));
                } else { dispatch(successSignIn(json, routes.auth.signIn)); }
            });
    }

    render() {
        const { credentials, location, t } = this.props;
        const { from } = location.state || { from: { pathname: routes.home } };

        if (credentials.token) { return <Redirect to={from} />; }

        return (
            <div id="sign-in">
                <SideAction>
                    <div className="mx-2 mx-sm-3">
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => this.props.history.push(routes.auth.register)}
                        >
                            <FontAwesomeIcon icon={faEdit} /> {t('form:signIn.link.register')}
                        </button>
                    </div>
                </SideAction>
                <div className="container">
                    <h3>
                        <FontAwesomeIcon icon={faUserCircle} />&nbsp;
                        {t('form:signIn.labelledBy')}
                    </h3>
                    <hr />
                    <SignInForm onSubmit={values => this.signIn(values)} />
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        }),
    }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'form', 'page', 'route'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(SignIn));
