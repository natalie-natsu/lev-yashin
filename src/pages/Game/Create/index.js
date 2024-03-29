import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusCircle } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import SideAction from '../../../components/MainHeader/SideAction';
import GameCreateForm from '../../../components/Game/Create/Form';

const GameCreate = ({ history, t }) => (
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
                initialValues={{ isWithBonuses: true }}
                scope={routes.game.create}
            />
        </div>
    </section>
);

GameCreate.propTypes = {
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate()(GameCreate);
