import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return (
            <div id="home">

            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({ dispatch })
)(Home);
