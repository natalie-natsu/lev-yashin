import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { faStar, faTrophy, faCalculator, faQuestion } from '@fortawesome/fontawesome-free-solid';

import banner from '../assets/me-banner.jpg';
import { getPublicName } from '../../../helpers/user';
import Medal from '../../../components/Medal';
import Title from '../../../components/MainHeader/Title';

// eslint-disable-next-line react/prefer-stateless-function
class MeHeader extends React.Component {
    render() {
        const { credentials, t } = this.props;
        const { profile } = credentials;
        const { picture } = profile;
        const name = getPublicName(profile);

        return (
            <div id="me-header">
                <Title>{t('page:Me.title')}</Title>
                <header className="jumbotron jumbotron-fluid mb-0" style={{ backgroundImage: `url(${banner})` }}>
                    <div className="container text-center">
                        <div>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#357FB7"
                                    stripeColor="#1669A9"
                                    fa={faStar}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#FFCE3D"
                                    stripeColor="#FFC311"
                                    circleColor="#E3DEDB"
                                    fa={faTrophy}
                                />
                            </span>
                            <img className="rounded-circle gravatar" src={picture} alt={name} />
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#4545C2"
                                    stripeColor="#2626B7"
                                    circleColor="#E3DEDB"
                                    fa={faCalculator}
                                />
                            </span>
                            <span className="medal-container">
                                <Medal
                                    ribbonColor="#FFAC3D"
                                    stripeColor="#FF9911"
                                    fa={faQuestion}
                                />
                            </span>
                        </div>
                        <h3 className="mt-2">{name}</h3>
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
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(MeHeader));
