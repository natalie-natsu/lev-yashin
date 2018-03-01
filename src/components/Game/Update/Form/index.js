import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';

import handleCreateGameError from '../../Create/Form/handleError';
import { routes } from '../../../../helpers/routes';
import { getEndpoint, getHeaders } from '../../../../helpers/endpoint';
import { failUpdateGame, REQUEST_UPDATE_GAME, successUpdateGame } from '../../../../actions/entities/game';

import Form from '../../Create/Form/form';

class UpdateGameForm extends React.Component {
    handleSubmit(values) {
        if (!values) { return false; }

        const { credentials, dispatch, history, id, t } = this.props;
        const { scope } = this.props.scope;

        dispatch({ type: REQUEST_UPDATE_GAME, scope });

        return fetch(getEndpoint('updateGame', { id }), {
            method: 'POST',
            headers: getHeaders(credentials),
            body: JSON.stringify({
                name: values.name,
                locale: values.locale,
                isWithBonuses: !!values.isWithBonuses,
                isPublic: !!values.isPublic,
            }),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    throw new SubmissionError(handleCreateGameError(json));
                } else {
                    dispatch(successUpdateGame(json, scope));
                    history.push({
                        pathname: routes.game.read.replace(':id', json.game._id),
                        state: { game: json.game },
                    });
                    toast.success(t('form:updateGame.success'), { position: toast.POSITION.BOTTOM_RIGHT });
                }
            }).catch((error) => {
                dispatch(failUpdateGame({ error }, scope));
                if (error instanceof SubmissionError) { throw error; }
            });
    }

    render() {
        const { form: Component, ...rest } = this.props;
        return (
            <div className="form-container">
                <Component {...rest} onSubmit={values => this.handleSubmit(values)} />
            </div>
        );
    }
}

UpdateGameForm.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    form: PropTypes.func,
    id: PropTypes.string.isRequired,
    scope: PropTypes.string,
    t: PropTypes.func.isRequired,
};

UpdateGameForm.defaultProps = {
    form: Form,
    scope: undefined,
};

export default translate()(withRouter(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(UpdateGameForm)));
