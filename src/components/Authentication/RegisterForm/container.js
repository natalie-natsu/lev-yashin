import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import handleRegisterContainerError from './handleError';
import { getEndpoint, headers } from '../../../helpers/endpoint';
import { failRegister, requestRegister, successRegister } from '../../../actions/authentication';

import Form from './index';

class RegisterForm extends React.Component {
    register(values) {
        if (!values) { return false; }

        const { dispatch } = this.props;
        dispatch(requestRegister());
        return fetch(getEndpoint('register'), {
            method: 'POST',
            headers,
            body: JSON.stringify({ email: values.email, password: values.password }),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    dispatch(failRegister());
                    throw new SubmissionError(handleRegisterContainerError(json));
                } else { dispatch(successRegister(json, this.props.scope)); }
            });
    }

    render() {
        const { form: Component } = this.props;
        return (
            <div id="register-form-container">
                <Component onSubmit={values => this.register(values)} />
            </div>
        );
    }
}

RegisterForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.element,
    scope: PropTypes.string,
};

RegisterForm.defaultProps = {
    form: Form,
    scope: undefined,
};

export default connect(
    () => ({}),
    dispatch => ({ dispatch }),
)(RegisterForm);
