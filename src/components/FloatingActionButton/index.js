import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import './FloatingActionButton.scss';

const FloatingActionButton = ({ className, fa, onClick }) => (
    <button
        className={classNames('btn btn-fa', className)}
        onClick={e => onClick(e)}
        onKeyPress={e => onClick(e)}
    >
        <FontAwesomeIcon icon={fa} />
    </button>
);

FloatingActionButton.propTypes = {
    fa: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

FloatingActionButton.defaultProps = {
    className: '',
    onClick: () => false,
};

export default FloatingActionButton;
