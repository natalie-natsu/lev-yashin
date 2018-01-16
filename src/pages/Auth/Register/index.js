import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faSignInAlt } from '@fortawesome/fontawesome-free-solid';

import { failRegister, requestRegister, successRegister } from '../../../actions/authentication';
import handleRegisterError from '../../../components/Authentication/RegisterForm/handleError';
import { getEndpoint, headers } from '../../../helpers/endpoint';
import { routes } from '../../../helpers/routes';

import SideAction from '../../../components/MainHeader/SideAction';
import RegisterForm from '../../../components/Authentication/RegisterForm';

class Register extends React.Component {
    register(values) {
        if (!values) { return false; }

        const { dispatch } = this.props;
        dispatch(requestRegister());
        return fetch(getEndpoint('register'), {
            method: 'POST',
            headers,
            body: JSON.stringify({ email: values.email, password: values.password }),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    dispatch(failRegister());
                    throw new SubmissionError(handleRegisterError(json));
                } else { dispatch(successRegister(json, routes.auth.register)); }
            });
    }

    render() {
        const { credentials, t } = this.props;
        if (credentials.token) { return <Redirect to={routes.home} />; }

        return (
            <div id="register">
                <SideAction>
                    <div className="mx-2 mx-sm-3">
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => this.props.history.push(routes.auth.signIn)}
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
                    <RegisterForm onSubmit={values => this.register(values)} />
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'form', 'page'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(Register));
