import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import DraftSelection from './Selection';

// eslint-disable-next-line react/prefer-stateless-function
class Draft extends React.Component {
    render() {
        const { children, game } = this.props;
        return (
            <section id="game-draft">
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
