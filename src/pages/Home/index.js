/* eslint-disable react/prefer-stateless-function */
// Remove that line when ESLint will understand that Home need to be stateful.
import React from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import Description from './Description';

class Home extends React.Component {
    render() {
        return (
            <div id="home">
                <Landing />
                <Description />
            </div>
        );
    }
}

export default connect(
    () => ({}),
    dispatch => ({ dispatch }),
)(Home);
