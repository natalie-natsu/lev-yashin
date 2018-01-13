import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

// eslint-disable-next-line react/prefer-stateless-function
class MeResetPassword extends React.Component {
    render() {
        return (
            <div id="me-reset-password">
                <p>ResetPassword</p>
            </div>
        );
    }
}

export default translate(['common', 'page'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(MeResetPassword));
