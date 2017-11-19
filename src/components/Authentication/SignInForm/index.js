import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import classNames from 'classnames';

import './SignInForm.css';

const form = 'sign-in-form';
const $ = window.jQuery;
const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'required';
    } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'invalid';
    }
    if (!values.password) {
        errors.password = 'required';
    }
    return errors;
};

class SignInForm extends React.Component {
    static renderInput({ input, placeholder, type, errors, meta: { touched, error } }) {
        const getEClass = key => `invalid-feedback ${touched && error === key ? 'visible d-block' : 'hidden d-none'}`;
        return (
            <div className="form-group">
                <input
                    {...input}
                    placeholder={placeholder}
                    type={type}
                    className={classNames('form-control', { [touched && error ? 'is-invalid' : 'is-valid']: touched })}
                    autoComplete="off"
                />
                {errors.map(e => <div className={getEClass(e.key)} key={e.key}>{e.message}</div>)}
            </div>
        );
    }

    constructor(props) {
        super(props);

        this.formErrors = {
            incorrectPasswordUser: this.props.t('form:signIn.errors.incorrectPasswordUser'),
        };

        this.emailErrors = [{
            key: 'required',
            message: this.props.t('form:signIn.errors.email.required'),
        }, {
            key: 'invalid',
            message: this.props.t('form:signIn.errors.email.invalid'),
        }];

        this.passwordErrors = [{
            key: 'required',
            message: this.props.t('form:signIn.errors.password.required'),
        }, {
            key: 'invalid',
            message: this.props.t('form:signIn.errors.password.invalid'),
        }];
    }


    renderFormError() {
        const error = this.formErrors[this.props.error];
        return error && <div className="alert alert-danger" role="alert"><i className="fa fa-warning" /> {error}</div>;
    }

    render() {
        const { handleSubmit, pristine, submitting, t } = this.props;

        return (
            <form id={form} onSubmit={handleSubmit}>
                <Field
                    component={SignInForm.renderInput}
                    name="email"
                    type="email"
                    placeholder="Email"
                    errors={this.emailErrors}
                />
                <Field
                    component={SignInForm.renderInput}
                    name="password"
                    type="password"
                    placeholder="Password"
                    errors={this.passwordErrors}
                />
                {this.renderFormError()}
                <div className="text-right">
                    <a
                        className="forgot-password"
                        data-dismiss="modal"
                        href="#"
                        onClick={() => setTimeout(() => $('#modal-home-forgot-password').modal('show'), 400)}
                    >
                        {t('form:signIn.link.forgotPassword')}
                    </a>
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                        {!submitting
                            ? <span><i className="fa fa-sign-in" /> {t('form:signIn.button.default')}</span>
                            : <span><i className="fa fa-spinner fa-spin" /> {t('form:signIn.state.isSigningIn')}.</span>
                        }
                    </button>
                </div>
            </form>
        );
    }
}

SignInForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

SignInForm.defaultProps = {
    error: null,
};

export default translate(['common', 'form'])(reduxForm({ form, validate })(SignInForm));
