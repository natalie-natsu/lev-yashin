import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import { getEndpoint, getHeaders, headers } from '../../../helpers/endpoint';
import { failRegister, requestRegister, successRegister } from '../../../actions/authentication';
import handleRegisterError from '../../../components/Authentication/RegisterForm/handleError';
import handleCreateGameError from '../../Game/Create/Form/handleError';
import { failCreateGame, REQUEST_CREATE_GAME, successCreateGame } from '../../../actions/entities/game';

import './Content.scss';
import RegisterForm from '../../../components/Authentication/RegisterForm';
import GameJoin from '../../Game/Join/';
import GameCreateForm from '../../Game/Create/Form';

class Content extends React.Component {
    register(values) {
        if (!values) { return false; }

        const { dispatch } = this.props;
        dispatch(requestRegister());
        return fetch(getEndpoint('register'), {
            method: 'POST',
            headers,
            body: JSON.stringify({ email: values.email, password: values.password }),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    dispatch(failRegister());
                    throw new SubmissionError(handleRegisterError(json));
                } else { dispatch(successRegister(json, routes.home)); }
            });
    }

    createGame(values) {
        if (!values) { return false; }

        const { credentials, dispatch, history, t } = this.props;
        const scope = routes.home;

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
                    toast.success(t('form:createGame.success'), { position: toast.POSITION.BOTTOM_RIGHT });
                    history.push({ pathname: routes.game.read.replace(':id', json._id), state: { game: json } });
                }
            });
    }

    renderRegister() {
        const { credentials, t } = this.props;
        if (credentials.token) { return false; }

        return (
            <section className="register">
                <h3 className="form-title">
                    <FontAwesomeIcon icon={faEdit} />
                    {t('page:Home.Content.register')}
                </h3>
                <hr />
                <RegisterForm onSubmit={values => this.register(values)} />
            </section>
        );
    }

    renderGame() {
        const { credentials, history, locale, t } = this.props;
        if (!credentials.token) { return false; }

        return (
            <section className="game">
                <div className="row">
                    <div className="col-md-6 mb-3 mb-sm-0">
                        <GameJoin history={history} />
                    </div>
                    <div className="col-md-6">
                        <h3 className="form-title">
                            <FontAwesomeIcon icon={faPlusCircle} />
                            {t('page:Home.Content.createGame')}
                        </h3>
                        <hr />
                        <GameCreateForm
                            initialValues={{ locale, isWithBonuses: true }}
                            onSubmit={values => this.createGame(values)}
                        />
                    </div>
                </div>
            </section>
        );
    }

    render() {
        return (
            <section id="home-content">
                <div className="container">
                    {this.renderRegister()}
                    {this.renderGame()}
                </div>
            </section>
        );
    }
}

Content.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['page'])(connect(
    state => ({ locale: state.app.locale, credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(Content));
