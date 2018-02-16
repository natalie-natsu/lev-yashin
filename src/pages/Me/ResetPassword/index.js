import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/fontawesome-free-solid';

import { getEndpoint, getHeaders } from '../../../helpers/endpoint';
import handleResetPasswordError from './Form/handleError';
import { routes } from '../../../helpers/routes';
import { failResetPassword, REQUEST_RESET_PASSWORD, successResetPassword } from '../../../actions/entities/user';

import SideAction from '../../../components/MainHeader/SideAction';
import ResetPasswordProfileForm from './Form';

class MeResetPassword extends React.Component {
    resetPassword(values) {
        if (!values) { return false; }

        const { credentials, dispatch, history, t } = this.props;
        const scope = routes.me.resetPassword;

        dispatch({ type: REQUEST_RESET_PASSWORD, scope });

        return fetch(getEndpoint('resetPassword'), {
            method: 'POST',
            headers: getHeaders(credentials),
            body: JSON.stringify({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            }),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    dispatch(failResetPassword(json, scope));
                    throw new SubmissionError(handleResetPasswordError(json));
                } else {
                    dispatch(successResetPassword(json, scope));
                    history.push(routes.me.exact);
                    toast.success(
                        t('form:resetPassword.success'),
                        { position: toast.POSITION.BOTTOM_RIGHT },
                    );
                }
            })
            .catch(error => dispatch(failResetPassword({ error }, scope)));
    }

    render() {
        const { history, t } = this.props;
        return (
            <section id="me-reset-password">
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button type="button" className="btn" onClick={() => history.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </SideAction>
                <div className="container">
                    <h3 className="form-title">
                        <FontAwesomeIcon icon={faLock} />
                        {t('form:resetPassword.labelledBy')}
                    </h3>
                    <hr />
                    <ResetPasswordProfileForm onSubmit={values => this.resetPassword(values)} />
                </div>
            </section>
        );
    }
}

MeResetPassword.propTypes = {
    credentials: PropTypes.shape({
        token: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            email: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        }).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate()(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(MeResetPassword));
