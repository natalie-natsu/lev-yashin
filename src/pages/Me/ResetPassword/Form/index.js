import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/fontawesome-free-solid';

import { renderFormError, renderInput } from '../../../../components/Form';

const form = 'reset-password-form';
const validate = (values) => {
    const errors = {};

    if (!values.oldPassword) {
        errors.oldPassword = 'required';
    }

    if (!values.newPassword) {
        errors.newPassword = 'required';
    } else if (values.newPassword.length < 6) {
        errors.newPassword = 'invalid';
    }

    if (!values.passwordRepeat) {
        errors.passwordRepeat = 'required';
    } else if (values.newPassword !== values.passwordRepeat) {
        errors.passwordRepeat = 'differs';
    }

    return errors;
};

class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.formErrors = {
            notPrecise: 'request:error.notPrecise',
            badRequest: 'form:resetPassword.errors.badRequest',
        };

        this.oldPasswordErrors = [
            { key: 'required', message: 'form:resetPassword.errors.oldPassword.required' },
            { key: 'incorrect', message: 'form:resetPassword.errors.oldPassword.incorrect' },
        ];
        this.newPasswordErrors = [
            { key: 'required', message: 'form:resetPassword.errors.newPassword.required' },
            { key: 'invalid', message: 'form:resetPassword.errors.newPassword.invalid' },
        ];
        this.passwordRepeatErrors = [
            { key: 'required', message: 'form:resetPassword.errors.passwordRepeat.required' },
            { key: 'differs', message: 'form:resetPassword.errors.passwordRepeat.differs' },
        ];
    }

    renderSubmitLabel() {
        const { submitting, t } = this.props;

        if (submitting) {
            return (
                <span className="submit-label">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    {t('form:resetPassword.state.isSaving')}
                </span>
            );
        }

        return (
            <span className="submit-label">
                <FontAwesomeIcon icon={faPaperPlane} />
                {t('form:resetPassword.button.save')}
            </span>
        );
    }

    render() {
        const { error, handleSubmit, pristine, submitting } = this.props;
        return (
            <form id={form} onSubmit={handleSubmit}>
                <Field
                    component={renderInput}
                    formControl={{ id: 'oldPassword' }}
                    label="form:resetPassword.input.oldPassword.label"
                    name="oldPassword"
                    type="password"
                    errors={this.oldPasswordErrors}
                />
                <Field
                    component={renderInput}
                    formControl={{ id: 'newPassword' }}
                    label="form:resetPassword.input.newPassword.label"
                    name="newPassword"
                    type="password"
                    placeholder="form:resetPassword.input.newPassword.placeholder"
                    errors={this.newPasswordErrors}
                />
                <Field
                    component={renderInput}
                    formControl={{ id: 'passwordRepeat' }}
                    label="form:resetPassword.input.passwordRepeat.label"
                    name="passwordRepeat"
                    type="password"
                    errors={this.passwordRepeatErrors}
                />
                {renderFormError(this.formErrors, error)}
                <div className="text-right">
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting || error}>
                        {this.renderSubmitLabel()}
                    </button>
                </div>
            </form>
        );
    }
}

ResetPasswordForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

ResetPasswordForm.defaultProps = {
    error: null,
};

export default translate(['common', 'form', 'request'])(reduxForm({ form, validate })(ResetPasswordForm));
