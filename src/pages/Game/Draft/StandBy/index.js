import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
// eslint-disable-next-line react/prefer-stateless-function
class DraftStandBy extends React.Component {
    render() {
        return (
            <section id="game-draft-standBy">
                toto
            </section>
        );
    }
}

DraftStandBy.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

export default translate()(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(DraftStandBy));
