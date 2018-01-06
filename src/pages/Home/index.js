import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner, faSignInAlt, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { faUserCircle } from '@fortawesome/fontawesome-free-regular';

import { failSignIn, fetchProfileIfNeeded, requestSignIn, signOut, successSignIn } from '../../actions/authentication';
import { getEndpoint, headers } from '../../helpers/endpoint';
import scopes from '../../scopes';

import SideAction from '../../components/MainHeader/SideAction';
import Title from '../../components/MainHeader/Title';
import SignInForm from '../../components/Authentication/SignInForm';
import Landing from './Landing';
import Description from './Description';
import OnBoarding from './OnBoarding';

const $ = window.jQuery;

class Home extends React.Component {
    signIn(values) {
        if (!values) { return false; }

        const { dispatch } = this.props;
        dispatch(requestSignIn());
        return fetch(getEndpoint('signIn'), {
            method: 'POST',
            headers,
            body: JSON.stringify(values),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    dispatch(failSignIn());
                    throw new SubmissionError({ _error: json.error });
                } else {
                    dispatch(successSignIn(json._id, json.token));
                    dispatch(fetchProfileIfNeeded(scopes.pages.Home));
                    $('#modal-home-login').modal('hide');
                    if (document.activeElement !== document.body) { document.activeElement.blur(); }
                }
            });
    }

    renderSignInButton() {
        const { credentials, dispatch, profile, t } = this.props;
        const { _id, token } = credentials;

        if (token) {
            if (profile.isFetching) {
                return (
                    <button type="button" className="btn btn-outline-light" disabled>
                        <FontAwesomeIcon icon={faSpinner} spin /> {t('form:signIn.state.isFetching')}
                    </button>
                );
            } else if (_id) {
                return (
                    <button type="button" className="btn btn-outline-light" onClick={() => dispatch(signOut())}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> {t('form:signIn.button.signOut')}
                    </button>

                );
            }
        }

        return (
            <button
                type="button"
                className="btn btn-outline-light"
                data-toggle="modal"
                data-target="#modal-home-login"
            >
                <FontAwesomeIcon icon={faSignInAlt} /> {t('form:signIn.button.default')}
            </button>
        );
    }

    render() {
        const { t } = this.props;
        return (
            <div id="home">
                <Title>Hey ! Bienvenue sur la HomePage ma gueule. :-)</Title>
                <SideAction><div className="mx-2 mx-sm-3">{this.renderSignInButton()}</div></SideAction>
                <div
                    className="modal fade"
                    id="modal-home-login"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby={t('form:signIn.labelledBy')}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <FontAwesomeIcon icon={faUserCircle} />&nbsp;
                                    {t('page:Home.modal-login.title')}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label={t('accessibility.aria-label.close')}
                                > <span >&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <SignInForm onSubmit={values => this.signIn(values)} />
                            </div>
                        </div>
                    </div>
                </div>
                <Landing />
                <Description />
                <OnBoarding />
            </div>
        );
    }
}

Home.propTypes = {
    credentials: PropTypes.shape({
        _id: PropTypes.string,
        token: PropTypes.string,
        profile: PropTypes.object,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        isFetching: PropTypes.bool,
    }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'form', 'page', 'route'])(connect(
    state => ({
        credentials: state.credentials,
        profile: state.profile,
    }),
    dispatch => ({ dispatch }),
)(Home));
