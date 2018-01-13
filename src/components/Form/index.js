/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import classNames from 'classnames';
import { I18n } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/fontawesome-free-solid';

export function renderFormError(formErrors, error) {
    return error && (
        <I18n>
            {t => (
                <div className="alert alert-danger" role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} /> {t(formErrors[error])}
                </div>
            )}
        </I18n>
    );
}

// eslint-disable-next-line react/prop-types
export function renderInput({ formControl, input, label, placeholder, type, errors, meta: { touched, error } }) {
    const getEClass = key => `invalid-feedback ${touched && error === key ? 'visible d-block' : 'hidden d-none'}`;
    return (
        <I18n>
            {t => (
                <div className="form-group">
                    {label && <label htmlFor={formControl.id}>{t(label)}</label>}
                    <input
                        {...input}
                        {...formControl}
                        placeholder={t(placeholder)}
                        type={type}
                        className={classNames(
                            'form-control',
                            { [touched && error ? 'is-invalid' : 'is-valid']: touched },
                        )}
                        autoComplete="off"
                    />
                    {errors.map(e => <div className={getEClass(e.key)} key={e.key}>{t(e.message)}</div>)}
                </div>
            )}
        </I18n>
    );
}
