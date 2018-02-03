import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Redirect } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faUserCircle } from '@fortawesome/fontawesome-free-regular';

import { routes } from '../../../helpers/routes';
import SideAction from '../../../components/MainHeader/SideAction';
import SignInForm from '../../../components/Authentication/SignInForm';

const SignIn = ({ credentials, history, t }) => (credentials.token ? <Redirect to={routes.home} /> : (
    <div id="sign-in">
        <SideAction>
            <div className="mx-2 mx-sm-3">
                <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={() => history.push(routes.auth.register)}
                >
                    <FontAwesomeIcon icon={faEdit} /> {t('form:signIn.link.register')}
                </button>
            </div>
        </SideAction>
        <div className="container">
            <h3 className="form-title">
                <FontAwesomeIcon icon={faUserCircle} />
                {t('form:signIn.labelledBy')}
            </h3>
            <hr />
            <SignInForm scope={routes.auth.signIn} />
        </div>
    </div>
));

SignIn.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'form', 'page'])(connect(state => ({ credentials: state.credentials }))(SignIn));
