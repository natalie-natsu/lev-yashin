import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { faStar } from '@fortawesome/fontawesome-free-solid';

import Medal from '../../../components/Medal';

const MeExact = () => (
    <div id="me">
        <div className="container">
            <h3>Profile</h3>
            <Medal ribbonColor="#357fb7" stripeColor="#2d6090" fa={faStar} />
        </div>
    </div>
);

export default translate(['common', 'page'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(MeExact));
