import React from 'react';
import PropTypes from 'prop-types';
import './Separator.scss';

const DrawerSeparator = ({ children }) => (
    <div className="drawer-separator nav-item">
        {children}
    </div>
);

DrawerSeparator.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default DrawerSeparator;
