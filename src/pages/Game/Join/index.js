import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/fontawesome-free-solid';

import { getEndpoint, getHeaders } from '../../../helpers/endpoint';
import handleJoinGameError from './Form/handleError';
import { routes } from '../../../helpers/routes';
import { failJoinGame, REQUEST_JOIN_GAME, successJoinGame } from '../../../actions/entities/game/lobby';

import GameJoinForm from './Form';

class GameJoin extends React.Component {
    joinGame(values) {
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
                    dispatch(failJoinGame(json, scope));
                    throw new SubmissionError(handleJoinGameError(json));
                } else {
                    dispatch(successJoinGame(json, scope));
                    history.push({ pathname: routes.game.read.replace(':id', json._id), state: { game: json } });
                    toast.success(t('form:joinGame.success'), { position: toast.POSITION.BOTTOM_RIGHT });
                }
            });
    }

    render() {
        const { t } = this.props;
        return (
            <div id="game-join">
                <h3 className="form-title">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    {t('form:joinGame.labelledBy')}
                </h3>
                <hr />
                <GameJoinForm onSubmit={values => this.joinGame(values)} />
            </div>
        );
    }
}

GameJoin.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate()(connect(
    state => ({ locale: state.app.locale, credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(GameJoin));
