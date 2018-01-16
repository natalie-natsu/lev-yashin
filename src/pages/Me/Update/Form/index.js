import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/fontawesome-free-solid';

import { renderFormError, renderInput } from '../../../../components/Form';
import './UpdateProfileForm.css';

const form = 'update-profile-form';
const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'invalid';
    }

    if (!(/\S/.test(values.userName))) {
        errors.userName = 'required';
    } else if (values.userName.length < 3) {
        errors.userName = 'toShort';
    } else if (values.userName.length > 50) {
        errors.userName = 'toLong';
    }

    if (values.firstName.length > 50) {
        errors.firstName = 'toLong';
    }

    if (values.lastName.length > 50) {
        errors.lastName = 'toLong';
    }

    return errors;
};

class UpdateProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.formErrors = {
            notPrecise: 'request:error.notPrecise',
            badRequest: 'form:updateProfile.errors.badRequest',
        };

        this.emailErrors = [
            { key: 'required', message: 'form:updateProfile.errors.email.required' },
            { key: 'invalid', message: 'form:updateProfile.errors.email.invalid' },
            { key: 'alreadyUsed', message: 'form:updateProfile.errors.email.alreadyTaken' },
        ];

        this.userNameErrors = [
            { key: 'required', message: 'form:updateProfile.errors.userName.required' },
            { key: 'toShort', message: 'form:updateProfile.errors.userName.toShort' },
            { key: 'toLong', message: 'form:updateProfile.errors.userName.toLong' },
        ];

        this.firstNameErrors = [
            { key: 'toLong', message: 'form:updateProfile.errors.firstName.toLong' },
        ];

        this.lastNameErrors = [
            { key: 'toLong', message: 'form:updateProfile.errors.lastName.toLong' },
        ];
    }

    renderSubmitLabel() {
        const { submitButton, submitting, t } = this.props;

        if (submitting) {
            return (
                <span className="submit-label">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    {t('form:updateProfile.state.isSaving')}
                </span>
            );
        }

        return (
            <span className="submit-label">
                <FontAwesomeIcon icon={submitButton.icon || faPaperPlane} />
                {submitButton.text || t('form:updateProfile.button.save')}
            </span>
        );
    }

    render() {
        const { disabled, error, handleSubmit, pristine, submitButton, submitting } = this.props;
        const submitDisabled = submitButton.disabled !== undefined
            ? submitButton.disabled : pristine || submitting || error;

        return (
            <form id={form} onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            component={renderInput}
                            formControl={{ id: 'email', disabled }}
                            label="form:updateProfile.input.email.label"
                            name="email"
                            type="email"
                            placeholder="form:updateProfile.input.email.placeholder"
                            errors={this.emailErrors}
                            helpBlock={{ id: 'emailHelp', text: 'form:updateProfile.input.email.help' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            component={renderInput}
                            formControl={{ id: 'userName', disabled }}
                            label="form:updateProfile.input.userName.label"
                            name="userName"
                            type="text"
                            placeholder="form:updateProfile.input.userName.placeholder"
                            errors={this.userNameErrors}
                            helpBlock={{ id: 'userNameHelp', text: 'form:updateProfile.input.userName.help' }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            component={renderInput}
                            formControl={{ id: 'firstName', disabled }}
                            label="form:updateProfile.input.firstName.label"
                            name="firstName"
                            type="text"
                            placeholder="form:updateProfile.input.firstName.placeholder"
                            errors={this.firstNameErrors}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            component={renderInput}
                            formControl={{ id: 'lastName', disabled }}
                            label="form:updateProfile.input.lastName.label"
                            name="lastName"
                            type="text"
                            placeholder="form:updateProfile.input.lastName.placeholder"
                            errors={this.lastNameErrors}
                            helpBlock={{ id: 'lastNameHelp', text: 'form:updateProfile.input.lastName.help' }}
                        />
                    </div>
                </div>
                {renderFormError(this.formErrors, error)}
                <div className="text-right">
                    <button
                        type="submit"
                        className={classNames('btn', submitButton.className || 'btn-success')}
                        disabled={submitDisabled}
                    >
                        {this.renderSubmitLabel()}
                    </button>
                </div>
            </form>
        );
    }
}

UpdateProfileForm.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitButton: PropTypes.shape({
        className: PropTypes.string,
        disabled: PropTypes.bool,
        icon: PropTypes.object,
        text: PropTypes.string,
    }),
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

UpdateProfileForm.defaultProps = {
    disabled: false,
    error: null,
    submitButton: {},
};

export default translate([
    'common',
    'form',
    'request',
])(reduxForm({ form, validate, destroyOnUnmount: false })(UpdateProfileForm));
