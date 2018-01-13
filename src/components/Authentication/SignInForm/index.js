import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import { renderFormError, renderInput } from '../../Form';
import './SignInForm.css';

const $ = window.jQuery;

const form = 'sign-in-form';
const validate = (values) => {
    const errors = {};

    if (!values.email) { errors.email = 'required'; }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) { errors.email = 'invalid'; }

    if (!values.password) { errors.password = 'required'; }
    return errors;
};

class SignInForm extends React.Component {
    static handleLinkClick() {
        $('#modal-home-login').modal('hide');
    }

    constructor(props) {
        super(props);

        this.formErrors = {
            notPrecise: 'request:error.notPrecise',
            badRequest: 'form:signIn.errors.badRequest',
        };

        this.emailErrors = [
            { key: 'required', message: 'form:signIn.errors.email.required' },
            { key: 'invalid', message: 'form:signIn.errors.email.invalid' },
            { key: 'incorrect', message: 'form:signIn.errors.email.incorrect' },
        ];
        this.passwordErrors = [
            { key: 'required', message: 'form:signIn.errors.password.required' },
            { key: 'invalid', message: 'form:signIn.errors.password.invalid' },
            { key: 'incorrect', message: 'form:signIn.errors.password.incorrect' },
        ];
    }

    render() {
        const { error, handleSubmit, pristine, submitting, t } = this.props;
        return (
            <form id={form} onSubmit={handleSubmit}>
                <Field
                    component={renderInput}
                    name="email"
                    type="email"
                    placeholder={t('form:signIn.input.email.placeholder')}
                    errors={this.emailErrors}
                />
                <Field
                    component={renderInput}
                    name="password"
                    type="password"
                    placeholder={t('form:signIn.input.password.placeholder')}
                    errors={this.passwordErrors}
                />
                {renderFormError(this.formErrors, error)}
                <div className="d-inline-block">
                    <Link
                        className="forgot-password"
                        to={routes.auth.forgotPassword}
                        onClick={() => SignInForm.handleLinkClick()}
                    >
                        {t('form:signIn.link.forgotPassword')}
                    </Link><br />
                    <Link
                        className="register"
                        to={routes.auth.register}
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
