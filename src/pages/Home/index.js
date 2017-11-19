/* eslint-disable react/prefer-stateless-function */
// Remove that line when ESLint will understand that Home need to be stateful.
import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return (
            <div id="home" />
        );
    }
}

export default connect(
    () => ({}),
    dispatch => ({ dispatch }),
)(Home);
