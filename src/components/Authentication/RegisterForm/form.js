import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/fontawesome-free-solid';

import { renderFormError, renderInput } from '../../Form';
import './RegisterForm.css';

const form = 'register-form';
const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'invalid';
    }

    if (!values.password) {
        errors.password = 'required';
    } else if (values.password.length < 6) {
        errors.password = 'invalid';
    }

    if (!values.passwordRepeat) {
        errors.passwordRepeat = 'required';
    } else if (values.password !== values.passwordRepeat) {
        errors.passwordRepeat = 'differs';
    }

    return errors;
};

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.formErrors = {
            notPrecise: 'request:error.notPrecise',
            badRequest: 'form:register.errors.badRequest',
        };

        this.emailErrors = [
            { key: 'required', message: 'form:register.errors.email.required' },
            { key: 'invalid', message: 'form:register.errors.email.invalid' },
            { key: 'alreadyUsed', message: 'form:register.errors.email.alreadyTaken' },
        ];
        this.passwordErrors = [
            { key: 'required', message: 'form:register.errors.password.required' },
            { key: 'invalid', message: 'form:register.errors.password.invalid' },
        ];
        this.passwordRepeatErrors = [
            { key: 'required', message: 'form:register.errors.passwordRepeat.required' },
            { key: 'invalid', message: 'form:register.errors.passwordRepeat.invalid' },
            { key: 'differs', message: 'form:register.errors.passwordRepeat.differs' },
        ];
    }

    render() {
        const { error, handleSubmit, pristine, submitting, t } = this.props;
        return (
            <form id={form} onSubmit={handleSubmit}>
                <Field
                    component={renderInput}
                    formControl={{ id: 'email' }}
                    label="form:register.input.email.label"
                    name="email"
                    type="email"
                    placeholder="form:register.input.email.placeholder"
                    errors={this.emailErrors}
                />
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            component={renderInput}
                            formControl={{ id: 'password' }}
                            label="form:register.input.password.label"
                            name="password"
                            type="password"
                            placeholder="form:register.input.password.placeholder"
                            errors={this.passwordErrors}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            component={renderInput}
                            formControl={{ id: 'passwordRepeat' }}
                            label="form:register.input.passwordRepeat.label"
                            name="passwordRepeat"
                            type="password"
                            placeholder="form:register.input.passwordRepeat.placeholder"
                            errors={this.passwordRepeatErrors}
                        />
                    </div>
                </div>
                {renderFormError(this.formErrors, error)}
                <div className="action text-right">
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting || error}>
                        <span className="submit-label">
                            <FontAwesomeIcon icon={submitting ? faSpinner : faPaperPlane} spin={submitting} />
                            {t(`form:register.${submitting ? 'state.isRegistering' : 'button.save'}`)}
                        </span>
                    </button>
                </div>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
    error: null,
};

export default translate(['common', 'form', 'request'])(reduxForm({ form, validate })(RegisterForm));
