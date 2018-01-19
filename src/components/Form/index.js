/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import classNames from 'classnames';
import { I18n } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/fontawesome-free-solid';

import './Form.scss';

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
export function renderInput({ formControl, helpBlock, input, label, placeholder, type, errors, meta }) {
    const { touched, error } = meta;
    const getEClass = key => `invalid-feedback ${touched && error === key ? 'visible d-block' : 'hidden d-none'}`;
    return (
        <I18n>
            {t => (
                <div className={type === 'checkbox' ? 'form-check' : 'form-group'}>
                    {(label && type !== 'checkbox') && <label htmlFor={formControl.id}>{t(label)}</label>}
                    <input
                        {...input}
                        {...formControl}
                        placeholder={t(placeholder)}
                        type={type}
                        className={classNames({
                            [touched && error ? 'is-invalid' : 'is-valid']: touched,
                            'form-check-input': type === 'checkbox',
                            'form-control': type !== 'checkbox',
                        })}
                        autoComplete="off"
                        aria-describedby={helpBlock && helpBlock.id}
                    />
                    {(label && type === 'checkbox') && <label htmlFor={formControl.id}>{t(label)}</label>}
                    <div>
                        {errors && errors.map(e => <div className={getEClass(e.key)} key={e.key}>{t(e.message)}</div>)}
                        {helpBlock && (
                            <small id={helpBlock.id} className="form-text text-muted">
                                {t(helpBlock.text)}
                            </small>
                        )}
                    </div>
                </div>
            )}
        </I18n>
    );
}
