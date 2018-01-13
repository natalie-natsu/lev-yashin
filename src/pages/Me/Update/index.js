import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/fontawesome-free-solid';

import SideAction from '../../../components/MainHeader/SideAction';

// eslint-disable-next-line react/prefer-stateless-function
class MeUpdate extends React.Component {
    render() {
        const { email, userName, firstName, lastName } = this.props.profile;
        return (
            <div id="me-update">
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button type="button" className="btn" onClick={() => this.props.history.goBack()}>
                            <FontAwesomeIcon icon={faLongArrowAltLeft} />
                        </button>
                    </div>
                </SideAction>
                <p>Update</p>
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

MeUpdate.propTypes = {
    profile: PropTypes.shape({
        email: PropTypes.string.isRequired,
        userName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({ profile: state.credentials.profile }),
    dispatch => ({ dispatch }),
)(MeUpdate));
