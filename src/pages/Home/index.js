import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner, faSignInAlt } from '@fortawesome/fontawesome-free-solid';
import { faUserCircle } from '@fortawesome/fontawesome-free-regular';

import { failSignIn, fetchProfileIfNeeded, requestSignIn, signOut, successSignIn } from '../../actions/authentication';
import { getEndpoint, headers } from '../../helpers/endpoint';

import Landing from './Landing';
import Description from './Description';
import SideAction from '../../components/MainHeader/SideAction';
import Title from '../../components/MainHeader/Title';
import SignInForm from '../../components/Authentication/SignInForm';

const { $ } = window;

class Home extends React.Component {
    signIn(values) {
        const { dispatch } = this.props;

        dispatch(requestSignIn());
        return fetch(getEndpoint('signIn'), {
            method: 'POST',
            headers,
            body: JSON.stringify(values),
        })
            .then(response => response.json()).then((data) => {
                if (data.error) {
                    dispatch(failSignIn());
                    throw new SubmissionError({ _error: data.error });
                } else {
                    dispatch(successSignIn(data.token, data.userId));
                    dispatch(fetchProfileIfNeeded());
                    $('#modal-mainHeader-login').modal('hide');
                }
            });
    }

    renderSignInButton() {
        const { authentication, dispatch, t } = this.props;
        const { isAuthenticated, isLoaded, userId } = authentication;

        if (isAuthenticated) {
            if (!isLoaded) {
                return (
                    <button type="button" className="btn btn-outline-light" disabled>
                        <FontAwesomeIcon icon={faSpinner} spin /> {t('form:signIn.state.isFetching')}
                    </button>
                );
            } else if (userId) {
                return (
                    <button type="button" className="btn btn-outline-light" onClick={() => dispatch(signOut())}>
                        {t('form:signIn.button.signOut')}
                    </button>

                );
            }
        }

        return (
            <button
                type="button"
                className="btn btn-outline-light"
                data-toggle="modal"
                data-target="#modal-mainHeader-login"
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
                    id="modal-mainHeader-login"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby={t('form:signIn.labelledBy')}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <FontAwesomeIcon icon={faUserCircle} />&nbsp;
                                    {t('component:MainHeader.modal-login.title')}
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
                                <SignInForm onSubmit={() => this.signIn()} />
                            </div>
                        </div>
                    </div>
                </div>
                <Landing />
                <Description />
            </div>
        );
    }
}

Home.propTypes = {
    authentication: PropTypes.shape({
        isAuthenticated: PropTypes.bool,
        isLoaded: PropTypes.bool,
        userId: PropTypes.string,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'component', 'form', 'route'])(connect(
    state => ({ authentication: state.authentication }),
    dispatch => ({ dispatch }),
)(Home));
