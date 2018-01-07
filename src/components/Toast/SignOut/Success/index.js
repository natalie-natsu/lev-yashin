import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const Success = ({ name, t }) => (
    <div className="toast-sign-out-success">
        <p className="mb-0">
            {t('signOut.success.text', { name })}
        </p>
    </div>
);

Success.propTypes = {
    name: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['toast'])(Success);
