import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trans, translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faEllipsisV, faInfoCircle, faSync, faEdit,
    faQuestion, faStar, faTrophy, faCalculator,
} from '@fortawesome/fontawesome-free-solid';

import { refreshProfile } from '../../../actions/entities/user';
import { routes } from '../../../helpers/routes';
import './Read.scss';

import SideAction from '../../../components/MainHeader/SideAction';
import UpdateProfileForm from '../Update/Form';
import Header from '../Header';
import Medal from '../../../components/Medal';

// eslint-disable-next-line react/prefer-stateless-function
class MeRead extends React.Component {
    render() {
        const { dispatch, history, page, t } = this.props;
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
                <Header />
                <div className="container">
                    <section>
                        <h3 className="section-title">
                            <FontAwesomeIcon icon={faStar} />
                            {t('page:Me.medals.title')}
                        </h3>
                        <small className="text-muted">
                            <Trans i18nKey="page:Me.medals.text" parent="span">
                                <span className="hidden-sm-down d-sm-inline">0</span>
                            </Trans>
                        </small>
                        <hr />
                        <div className="medals">
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faStar}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#891C15"
                                    stripeColor="#731712"
                                    fa={faTrophy}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#891C15"
                                    stripeColor="#731712"
                                    fa={faCalculator}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faQuestion}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faQuestion}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faQuestion}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faQuestion}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faQuestion}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faQuestion}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faQuestion}
                                />
                            </span>
                        </div>
                    </section>
                    <section className="pt-0">
                        <h3 className="form-title">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {t('page:Me.Read.title')}
                            <button
                                className="btn btn-link text-complementary"
                                onClick={() => dispatch(refreshProfile(routes.me))}
                                disabled={page.isFetching}
                            >
                                <FontAwesomeIcon icon={faSync} spin={page.isFetching} />
                            </button>
                        </h3>
                        <hr />
                        <UpdateProfileForm
                            initialValues={this.props.profile}
                            onSubmit={() => history.push(routes.me.update)}
                            submitButton={{
                                className: 'btn-complementary',
                                disabled: false,
                                icon: faEdit,
                                text: t('page:Me.link.update'),
                            }}
                            disabled
                        />
                    </section>
                </div>
            </div>
        );
    }
}

MeRead.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    page: PropTypes.shape({
        isFetching: PropTypes.bool,
    }).isRequired,
    profile: PropTypes.shape({
        email: PropTypes.string.isRequired,
        userName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({ profile: state.credentials.profile, page: state.pages.Me }),
    dispatch => ({ dispatch }),
)(MeRead));
