import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import './Medal.scss';

const stripes = (ribbon, stripe) => (
    `repeating-linear-gradient(55deg, transparent, transparent 10%, ${stripe} 10%, ${stripe} 20%) ${ribbon}`
);

const Medal = ({ circleColor, ribbonColor, stripeColor, fa }) => (
    <div className="medal">
        <div className="medal-body">
            <div className="ribbon" style={{ backgroundColor: ribbonColor }} />
            <div className="stripes" style={{ background: stripes(ribbonColor, stripeColor) }} />
            <div className="circle" style={{ backgroundColor: circleColor }}>
                <i>{fa && <FontAwesomeIcon icon={fa} />}</i>
                <div className="filter" />
            </div>
        </div>
    </div>
);

Medal.propTypes = {
    fa: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    circleColor: PropTypes.string,
    ribbonColor: PropTypes.string,
    stripeColor: PropTypes.string,
};

Medal.defaultProps = {
    fa: null,
    circleColor: '#fbc56f',
    ribbonColor: '#9bdbf6',
    stripeColor: '#73cbf6',
};

export default Medal;
