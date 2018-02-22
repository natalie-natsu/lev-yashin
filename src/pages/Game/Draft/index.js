import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';

import DraftSelection from './Selection';
import SideAction from '../../../components/MainHeader/SideAction';

// eslint-disable-next-line react/prefer-stateless-function
class Draft extends React.Component {
    render() {
        const { children, game } = this.props;
        return (
            <section id="game-draft">
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <Link to={routes.game.messages.replace(':id', game._id)} className="btn">
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </Link>
                    </div>
                </SideAction>
                <DraftSelection game={game} />
                {children}
            </section>
        );
    }
}

Draft.propTypes = {
    children: PropTypes.element,
    // dispatch: PropTypes.func.isRequired,
    game: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        admin: PropTypes.string.isRequired,
        users: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            profile: PropTypes.shape({
                userName: PropTypes.string.isRequired,
                picture: PropTypes.string.isRequired,
            }).isRequired,
        })).isRequired,
    }).isRequired,
};

Draft.defaultProps = {
    children: null,
};

export default translate()(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(Draft));
