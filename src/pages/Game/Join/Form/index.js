import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/fontawesome-free-solid';

import { renderFormError, renderInput } from '../../../../components/Form';

const form = 'join-game-form';
const validate = (values) => {
    const errors = {};

    if (!values.id) errors.id = 'required';
    else if (values.id.length !== '5a7101883682391e30a425c3'.length) errors.id = 'invalid';

    return errors;
};

class GameJoinForm extends React.Component {
    constructor(props) {
        super(props);

        this.formErrors = {
            notPrecise: 'request:error.notPrecise',
            notFound: 'form:joinGame.errors.notFound',
            alreadyJoined: 'form:joinGame.errors.alreadyJoined',
            alreadyStarted: 'form:joinGame.errors.alreadyStarted',
        };

        this.idErrors = [
            { key: 'required', message: 'form:joinGame.errors.id.required' },
            { key: 'invalid', message: 'form:joinGame.errors.id.invalid' },
        ];
    }

    render() {
        const { error, handleSubmit, pristine, submitting, t } = this.props;
        return (
            <form id={form} onSubmit={handleSubmit}>
                <Field
                    component={renderInput}
                    formControl={{ id: 'id' }}
                    label="form:joinGame.input.id.label"
                    placeholder="form:joinGame.input.id.placeholder"
                    name="id"
                    type="text"
                    errors={this.idErrors}
                />
                {renderFormError(this.formErrors, error)}
                <div className="text-right">
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting || error}>
                        <span className="submit-label">
                            <FontAwesomeIcon icon={submitting ? faSpinner : faSignInAlt} spin={submitting} />
                            {t(`form:joinGame.button.${submitting ? 'isSaving' : 'save'}`)}
                        </span>
                    </button>
                </div>
            </form>
        );
    }
}

GameJoinForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

GameJoinForm.defaultProps = {
    error: null,
};

export default translate(['common', 'form', 'request'])(reduxForm({ form, validate })(GameJoinForm));
