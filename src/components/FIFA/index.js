import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { failFetchMatches, fetchMatches, successFetchMatches } from '../../actions/entities/match';

class FIFA extends React.Component {
    constructor(props) {
        super(props);
        this.state = { intervalId: setInterval(this.fetFIFAData.bind(this), 1000 * 60 * 60) };
    }

    componentDidMount() {
        this.fetFIFAData();
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    fetFIFAData() {
        const { dispatch, isFetching } = this.props;
        const scope = 'FIFA';

        if (!isFetching) {
            dispatch(fetchMatches({}, scope, (response) => {
                if (response.error) dispatch(failFetchMatches(response, scope));
                else dispatch(successFetchMatches(response, scope));
            }));
        }
    }

    render() {
        const { receivedAt } = this.props;
        return <div className="d-none">FIFA data received at: {moment(receivedAt).format('LLL')}</div>;
    }
}

FIFA.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    receivedAt: PropTypes.number,
};

FIFA.defaultProps = {
    receivedAt: null,
};

export default connect(
    state => ({ ...state.FIFA }),
    dispatch => ({ dispatch }),
)(FIFA);
