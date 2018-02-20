import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';

import handleCreateGameError from './handleError';
import { routes } from '../../../../helpers/routes';
import { getEndpoint, getHeaders } from '../../../../helpers/endpoint';
import { failCreateGame, REQUEST_CREATE_GAME, successCreateGame } from '../../../../actions/entities/game';

import Form from './form';

class CreateGameForm extends React.Component {
    handleSubmit(values) {
        if (!values) { return false; }

        const { credentials, dispatch, history, t } = this.props;
        const { scope } = this.props.scope;

        dispatch({ type: REQUEST_CREATE_GAME, scope });

        return fetch(getEndpoint('createGame'), {
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
                    dispatch(successCreateGame(json, scope));
                    history.push({ pathname: routes.game.read.replace(':id', json._id), state: { game: json } });
                    toast.success(t('form:createGame.success'), { position: toast.POSITION.BOTTOM_RIGHT });
                }
            }).catch((error) => {
                dispatch(failCreateGame({ error }, scope));
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

CreateGameForm.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    form: PropTypes.func,
    scope: PropTypes.string,
    t: PropTypes.func.isRequired,
};

CreateGameForm.defaultProps = {
    form: Form,
    scope: undefined,
};

export default translate()(withRouter(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(CreateGameForm)));
