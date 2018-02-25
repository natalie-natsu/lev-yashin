import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';

import handleJoinGameError from './handleError';
import { routes } from '../../../../helpers/routes';
import { getEndpoint, getHeaders } from '../../../../helpers/endpoint';
import { failJoinGame, REQUEST_JOIN_GAME, successJoinGame } from '../../../../actions/entities/game/lobby';

import Form from './form';

class RegisterForm extends React.Component {
    handleSubmit(values) {
        if (!values) { return false; }

        const { credentials, dispatch, history, t } = this.props;
        const scope = routes.home;

        dispatch({ type: REQUEST_JOIN_GAME, scope });

        return fetch(getEndpoint('joinGame', values), {
            method: 'POST',
            headers: getHeaders(credentials),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    throw new SubmissionError(handleJoinGameError(json));
                } else {
                    dispatch(successJoinGame(json, scope));
                    history.push({
                        pathname: routes.game.read.replace(':id', json.game._id),
                        state: { game: json.game },
                    });
                    toast.success(t('form:joinGame.success'), { position: toast.POSITION.BOTTOM_RIGHT });
                }
            }).catch((error) => {
                dispatch(failJoinGame({ error }, scope));
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

RegisterForm.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    form: PropTypes.func,
    scope: PropTypes.string,
    t: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
    form: Form,
    scope: undefined,
};

export default translate()(withRouter(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(RegisterForm)));
