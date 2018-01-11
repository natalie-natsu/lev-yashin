import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

const MeExact = () => (
    <div id="me">
        <div className="container">
            <h3>Profile</h3>
        </div>
    </div>
);

export default translate(['common', 'page'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(MeExact));
