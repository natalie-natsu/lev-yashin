import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/fontawesome-free-solid';

import { renderFormError, renderInput } from '../../../../components/Form';

const form = 'create-game-form';
const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'required';
    } else if (values.name.length < 3) {
        errors.name = 'toShort';
    } else if (values.name.length > 100) {
        errors.name = 'toLong';
    }

    return errors;
};

class GameCreateForm extends React.Component {
    constructor(props) {
        super(props);

        this.formErrors = { notPrecise: 'request:error.notPrecise' };

        this.nameErrors = [
            { key: 'required', message: 'form:createGame.errors.name.required' },
            { key: 'toShort', message: 'form:createGame.errors.name.toShort' },
            { key: 'toLong', message: 'form:createGame.errors.name.toLong' },
        ];
    }

    render() {
        const { error, handleSubmit, pristine, submitting, t } = this.props;
        return (
            <form id={form} onSubmit={handleSubmit}>
                <Field
                    component={renderInput}
                    formControl={{ id: 'name' }}
                    label="form:createGame.input.name.label"
                    placeholder="form:createGame.input.name.placeholder"
                    name="name"
                    type="text"
                    errors={this.nameErrors}
                />
                <span className="d-none">
                    <Field
                        component={renderInput}
                        formControl={{ id: 'locale' }}
                        name="locale"
                        type="text"
                    />
                </span>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <Field
                            component={renderInput}
                            formControl={{ id: 'isWithBonuses' }}
                            label="form:createGame.input.isWithBonuses.label"
                            name="isWithBonuses"
                            type="checkbox"
                            placeholder="form:createGame.input.isWithBonuses.placeholder"
                        />
                        <Field
                            component={renderInput}
                            formControl={{ id: 'isPublic' }}
                            label="form:createGame.input.isPublic.label"
                            name="isPublic"
                            type="checkbox"
                        />
                    </div>
                </div>
                {renderFormError(this.formErrors, error)}
                <div className="action text-right">
                    <button type="submit" className="btn btn-success" disabled={pristine || submitting || error}>
                        <span className="submit-label">
                            <FontAwesomeIcon icon={submitting ? faSpinner : faPaperPlane} spin={submitting} />
                            {t(`form:createGame.${submitting ? 'state.isSaving' : 'button.save'}`)}
                        </span>
                    </button>
                </div>
            </form>
        );
    }
}

GameCreateForm.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

GameCreateForm.defaultProps = {
    error: null,
};

export default translate(['common', 'form', 'request'])(reduxForm({ form, validate })(GameCreateForm));
