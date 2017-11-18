import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

import './SignInForm.css';

const form = 'sign-in-form';
const $ = window.jQuery;

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'required'
    } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'invalid-email'
    }
    if (!values.password) {
        errors.password = 'required'
    }
    return errors
};

const formErrors = {
    incorrectPasswordUser: `Email or password are not correct`,
};

const emailErrors = [{
    key: 'required',
    message: `Email is required`,
}, {
    key: 'invalid-email',
    message: `Email is invalid`,
}];

const passwordErrors = [ {
    key: 'required',
    message: `Password is required`,
}, {
    key: 'invalid-password',
    message: `Password is invalid`,
}];

class SignInForm extends React.Component {
    renderInput = ({input, placeholder, type, errors, icon, meta: {touched, error}}) => (
        <div className="form-group">
            <input
                {...input}
                placeholder={placeholder}
                type={type}
                className={classNames('form-control', { [touched && error ? 'is-invalid' : 'is-valid']: touched })}
                autoComplete="off"
            />
            {errors.map((e, i) => (
                <div
                    className={`invalid-feedback ${touched && error === e.key ? 'visible d-block' : 'hidden d-none'}`}
                    key={i}
                >
                    {e.message}
                </div>
            ))}
        </div>
    );

    renderFormError() {
        const error = formErrors[this.props.error];
        return error && <div className="alert alert-danger" role="alert"><i className="fa fa-warning"/> {error}</div>;
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;

        return (
            <form id={form} onSubmit={handleSubmit}>
                <Field
                    component={this.renderInput}
                    name="email"
                    type="email"
                    placeholder="Email"
                    errors={emailErrors}
                />
                <Field
                    component={this.renderInput}
                    name="password"
                    type="password"
                    placeholder="Password"
                    errors={passwordErrors}
                />
                {this.renderFormError()}
                <div className="text-right">
                    <a
                        className="forgot-password"
                        data-dismiss="modal"
                        onClick={() => setTimeout(() => $('#modal-home-forgot-password').modal('show'), 400)}
                    >
                        Forgot password ?
                    </a>
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                        {!submitting
                            ? <span><i className="fa fa-sign-in"/> Sign in</span>
                            : <span><i className="fa fa-spinner fa-spin"/> Signing in...</span>
                        }
                    </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({ form, validate })(SignInForm);
