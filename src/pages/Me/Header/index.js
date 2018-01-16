import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './Header.scss';
import { getName } from '../../../helpers/user';

// eslint-disable-next-line react/prefer-stateless-function
class MeHeader extends React.Component {
    render() {
        const { credentials } = this.props;
        const { profile } = credentials;
        const { picture } = profile;
        const name = getName(profile);

        return (
            <div id="user-header">
                <header>
                    <div className="jumbotron jumbotron-fluid name-picture mb-3">
                        <div className="container text-center">
                            <img className="rounded-circle gravatar" src={picture} alt={name} /><br />
                            <h3 className="mt-2">{name}</h3>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

MeHeader.propTypes = {
    credentials: PropTypes.shape({
        profile: PropTypes.shape({
            email: PropTypes.string.isRequired,
            userName: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            picture: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(MeHeader));
