import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusCircle } from '@fortawesome/fontawesome-free-solid';

import { getEndpoint, getHeaders } from '../../../helpers/endpoint';
import handleCreateGameError from './Form/handleError';
import { routes } from '../../../helpers/routes';
import { failCreateGame, REQUEST_CREATE_GAME, successCreateGame } from '../../../actions/entities/game';

import SideAction from '../../../components/MainHeader/SideAction';
import GameCreateForm from './Form';

class GameCreate extends React.Component {
    createGame(values) {
        if (!values) { return false; }

        const { credentials, dispatch, history, t } = this.props;
        const scope = routes.game.create;

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
                    dispatch(failCreateGame(json, scope));
                    throw new SubmissionError(handleCreateGameError(json));
                } else {
                    dispatch(successCreateGame(json, scope));
                    history.push(routes.home);
                    toast.success(
                        t('form:createGame.success'),
                        { position: toast.POSITION.BOTTOM_RIGHT },
                    );
                }
            });
    }

    render() {
        const { history, locale, t } = this.props;
        return (
            <section id="game-create">
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button type="button" className="btn" onClick={() => history.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </SideAction>
                <div className="container">
                    <h3 className="form-title">
                        <FontAwesomeIcon icon={faPlusCircle} />
                        {t('form:createGame.labelledBy')}
                    </h3>
                    <hr />
                    <GameCreateForm
                        initialValues={{ locale, isWithBonuses: true }}
                        onSubmit={values => this.createGame(values)}
                    />
                </div>
            </section>
        );
    }
}

GameCreate.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate()(connect(
    state => ({ locale: state.app.locale, credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(GameCreate));
