import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';

import Selection from './Selection';
import StandBy from './StandBy';
import SideAction from '../../../components/MainHeader/SideAction';

// eslint-disable-next-line react/prefer-stateless-function
class Draft extends React.Component {
    render() {
        const { credentials, game } = this.props;
        const isUserTurn = game.draftOrder[game.draftIndex]._id === credentials._id;

        return (
            <section id="game-draft">
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <Link to={routes.game.messages.replace(':id', game._id)} className="btn">
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </Link>
                    </div>
                </SideAction>
                <Selection game={game} notUserTurn={!isUserTurn} />
                {!isUserTurn && <StandBy game={game} />}
            </section>
        );
    }
}

Draft.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    credentials: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
    game: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        admin: PropTypes.string.isRequired,
        draftIndex: PropTypes.number,
        users: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            profile: PropTypes.shape({
                userName: PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
            }).isRequired,
        })).isRequired,
    }).isRequired,
};

export default translate()(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(Draft));
