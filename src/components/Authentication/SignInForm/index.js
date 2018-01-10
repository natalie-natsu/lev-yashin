import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import classNames from 'classnames';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faSignInAlt, faSpinner } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import './SignInForm.css';

const $ = window.jQuery;

const form = 'sign-in-form';
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

    static handleLinkClick() {
        $('#modal-home-login').modal('hide');
    }

    constructor(props) {
        super(props);

        this.formErrors = {
            notPrecise: this.props.t('request:error.notPrecise'),
            badRequest: this.props.t('form:signIn.errors.badRequest'),
        };

        this.emailErrors = [{
            key: 'required',
            message: this.props.t('form:signIn.errors.email.required'),
        }, {
            key: 'invalid',
            message: this.props.t('form:signIn.errors.email.invalid'),
        }, {
            key: 'incorrect',
            message: this.props.t('form:signIn.errors.email.incorrect'),
        }];

        this.passwordErrors = [{
            key: 'required',
            message: this.props.t('form:signIn.errors.password.required'),
        }, {
            key: 'invalid',
            message: this.props.t('form:signIn.errors.password.invalid'),
        }, {
            key: 'incorrect',
            message: this.props.t('form:signIn.errors.password.incorrect'),
        }];
    }


    renderFormError() {
        const error = this.formErrors[this.props.error];
        return error && (
            <div className="alert alert-danger" role="alert">
                <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
            </div>
        );
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
                <div className="d-inline-block">
                    <Link
                        className="forgot-password"
                        to={routes.user.forgotPassword}
                        onClick={() => SignInForm.handleLinkClick()}
                    >
                        {t('form:signIn.link.forgotPassword')}
                    </Link><br />
                    <Link
                        className="register"
                        to={routes.user.register}
                        onClick={() => SignInForm.handleLinkClick()}
                    >
                        {t('form:signIn.link.register')}
                    </Link>
                </div>
                <button type="submit" className="btn btn-success float-right" disabled={pristine || submitting}>
                    {!submitting
                        ? <span><FontAwesomeIcon icon={faSignInAlt} /> {t('form:signIn.button.default')}</span>
                        : <span><FontAwesomeIcon icon={faSpinner} spin /> {t('form:signIn.state.isSigningIn')}</span>
                    }
                </button>
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

export default translate(['common', 'form', 'request'])(reduxForm({ form, validate })(SignInForm));
