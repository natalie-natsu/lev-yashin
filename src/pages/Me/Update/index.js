import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/fontawesome-free-solid';

import { getEndpoint, getHeaders } from '../../../helpers/endpoint';
import handleUpdateProfileError from './Form/handleError';
import { routes } from '../../../helpers/routes';
import { failUpdateProfile, REQUEST_UPDATE_PROFILE, successUpdateProfile } from '../../../actions/entities/user';

import SideAction from '../../../components/MainHeader/SideAction';
import UpdateProfileForm from './Form';

class MeUpdate extends React.Component {
    updateProfile(values) {
        if (!values) { return false; }

        const { credentials, dispatch, history, t } = this.props;
        const scope = routes.me.update;

        dispatch({ type: REQUEST_UPDATE_PROFILE, scope });

        return fetch(getEndpoint('updateProfile'), {
            method: 'POST',
            headers: getHeaders(credentials),
            body: JSON.stringify({
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                userName: values.userName,
            }),
        })
            .then(response => response.json()).then((json) => {
                if (json.error) {
                    dispatch(failUpdateProfile(json, scope));
                    throw new SubmissionError(handleUpdateProfileError(json));
                } else {
                    dispatch(successUpdateProfile(json, scope));
                    history.push(routes.me.exact);
                    toast.success(
                        t('form:updateProfile.success'),
                        { position: toast.POSITION.BOTTOM_RIGHT },
                    );
                }
            })
            .catch(error => dispatch(failUpdateProfile({ error }, scope)));
    }

    render() {
        const { credentials, history, t } = this.props;
        return (
            <section id="me-update">
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button type="button" className="btn" onClick={() => history.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </SideAction>
                <div className="container">
                    <h3 className="form-title">
                        <FontAwesomeIcon icon={faEdit} />
                        {t('form:updateProfile.labelledBy')}
                    </h3>
                    <hr />
                    <UpdateProfileForm
                        initialValues={credentials.profile}
                        onSubmit={values => this.updateProfile(values)}
                    />
                </div>
            </section>
        );
    }
}

MeUpdate.propTypes = {
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
)(MeUpdate));
