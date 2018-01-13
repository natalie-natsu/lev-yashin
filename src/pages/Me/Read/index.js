import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEllipsisV, faQuestionCircle } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import './Read.scss';

import SideAction from '../../../components/MainHeader/SideAction';

// eslint-disable-next-line react/prefer-stateless-function
class MeRead extends React.Component {
    render() {
        const { profile, t } = this.props;
        const { email, userName, firstName, lastName } = profile;
        return (
            <section id="me-read">
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
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">{t('page:Me.Read.title')}</h5>
                        </div>
                        <table className="table table-bordered mb-0">
                            <tbody>
                                <tr>
                                    <th scope="row" className="label">
                                        <Link to={routes.me.update}>{t('form:profile.label.email')}</Link>
                                    </th>
                                    <td className="value">{email}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="label">
                                        <Link to={routes.me.update}>{t('form:profile.label.userName')}</Link>
                                    </th>
                                    <td className="value">{userName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="label">
                                        <Link to={routes.me.update}>{t('form:profile.label.firstName')}</Link>
                                    </th>
                                    <td className="value">{firstName || t('undefined')}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="label">
                                        <Link to={routes.me.update}>{t('form:profile.label.lastName')}</Link>
                                    </th>
                                    <td className="value">
                                        {lastName || t('undefined')}
                                        <span className="float-right">
                                            <FontAwesomeIcon icon={faQuestionCircle} />
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="card-body text-right">
                            <Link to={routes.me.update} className="card-link">
                                {t('page:Me.link.update')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
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
