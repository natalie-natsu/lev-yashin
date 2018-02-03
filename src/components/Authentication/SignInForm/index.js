import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import handleSignInError from './handleError';
import { routes } from '../../../helpers/routes';
import { getEndpoint, headers } from '../../../helpers/endpoint';
import { failSignIn, requestSignIn, successSignIn } from '../../../actions/authentication';

import Form from './form';

const $ = window.jQuery;

class SignInForm extends React.Component {
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
                } else {
                    dispatch(successSignIn(json, this.props.scope));
                    if (this.props.scope === routes.home) { $('#modal-home-login').modal('hide'); }
                }
            });
    }

    render() {
        const { form: Component } = this.props;
        return (
            <div className="form-container">
                <Component onSubmit={values => this.signIn(values)} />
            </div>
        );
    }
}

SignInForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.func,
    scope: PropTypes.string,
};

SignInForm.defaultProps = {
    form: Form,
    scope: undefined,
};

export default connect(
    () => ({}),
    dispatch => ({ dispatch }),
)(SignInForm);
