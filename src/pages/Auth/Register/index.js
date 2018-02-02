import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Redirect } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faSignInAlt } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import SideAction from '../../../components/MainHeader/SideAction';
import RegisterForm from '../../../components/Authentication/RegisterForm/container';

const Register = ({ credentials, history, t }) => (credentials.token ? <Redirect to={routes.home} /> : (
    <div id="register">
        <SideAction>
            <div className="mx-2 mx-sm-3">
                <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={() => history.push(routes.auth.signIn)}
                >
                    <FontAwesomeIcon icon={faSignInAlt} /> {t('form:register.link.signIn')}
                </button>
            </div>
        </SideAction>
        <div className="container">
            <h3 className="form-title">
                <FontAwesomeIcon icon={faEdit} />
                {t('form:register.labelledBy')}
            </h3>
            <hr />
            <RegisterForm scope={routes.auth.register} />
        </div>
    </div>
));

Register.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'form', 'page'])(connect(state => ({ credentials: state.credentials }))(Register));
