import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

// eslint-disable-next-line react/prefer-stateless-function
class SideAction extends React.Component {
    render() {
        return (
            <div id="main-header-side-action" />
        );
    }
}

SideAction.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

export default translate(['common', 'component', 'route'])(connect(
    state => ({ authentication: state.authentication }),
    dispatch => ({ dispatch }),
)(SideAction));
