import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import SideAction from '../../../components/MainHeader/SideAction';

// eslint-disable-next-line react/prefer-stateless-function
class MeRead extends React.Component {
    render() {
        const { profile, t } = this.props;
        const { email, userName, firstName, lastName } = profile;
        return (
            <div id="me-read">
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button
                            type="button"
                            className="btn"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to={routes.me.update}>
                                {t('page:Me.link.update')}
                            </Link>
                            <Link className="dropdown-item" to={routes.me.resetPassword}>
                                {t('page:Me.link.resetPassword')}
                            </Link>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item text-danger">{t('page:Me.link.delete')}</button>
                        </div>
                    </div>
                </SideAction>
                <p>Read</p>
                <ul>
                    <li>{email}</li>
                    <li>{userName}</li>
                    <li>{firstName}</li>
                    <li>{lastName}</li>
                </ul>
            </div>
        );
    }
}

MeRead.propTypes = {
    profile: PropTypes.shape({
        email: PropTypes.string.isRequired,
        userName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({ profile: state.credentials.profile }),
    dispatch => ({ dispatch }),
)(MeRead));
