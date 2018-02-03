import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle, faSignInAlt } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';

import './Content.scss';
import worldCupSrc from './world-cup.svg';
import backgroundSrc from './home-content-bckg.jpg';
import RegisterForm from '../../../components/Authentication/RegisterForm';
import GameCreateForm from '../../../components/Game/Create/Form';
import GameJoinForm from '../../../components/Game/Join/Form';

class Content extends React.Component {
    renderRegister() {
        const { credentials, t } = this.props;
        if (credentials.token) { return false; }

        return (
            <section className="register align-self-center">
                <h3 className="form-title">
                    <FontAwesomeIcon icon={faEdit} />
                    {t('page:Home.Content.register')}
                </h3>
                <hr />
                <RegisterForm scope={routes.home} />
            </section>
        );
    }

    renderGame() {
        const { credentials, locale, t } = this.props;
        if (!credentials.token) { return false; }

        return (
            <section className="game align-self-center">
                <h3 className="form-title">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    {t('form:joinGame.labelledBy')}
                </h3>
                <hr />
                <GameJoinForm scope={routes.home} />
                <div className="mb-3" />
                <h3 className="form-title">
                    <FontAwesomeIcon icon={faPlusCircle} />
                    {t('page:Home.Content.createGame')}
                </h3>
                <hr />
                <GameCreateForm initialValues={{ locale, isWithBonuses: true }} scope={routes.home} />
            </section>
        );
    }

    render() {
        const { t } = this.props;
        return (
            <div className="position-relative">
                <div className="parallax" style={{ backgroundImage: `url(${backgroundSrc}` }} />
                <section id="home-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 d-flex">
                                {this.renderRegister()}
                                {this.renderGame()}
                            </div>
                            <div className="col-md-6 d-none d-sm-flex">
                                <img
                                    src={worldCupSrc}
                                    alt={t('page:Home.Content.worldCup')}
                                    className="img-fluid w-75 align-self-center mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

Content.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['page'])(connect(
    state => ({ locale: state.app.locale, credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(Content));
