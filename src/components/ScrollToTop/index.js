import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) { window.scrollTo(0, 0); }
    }

    render() {
        return this.props.children;
    }
}

ScrollToTop.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    children: PropTypes.element,
};

ScrollToTop.defaultProps = {
    children: <span className="scroll-to-top d-none" />,
};

export default withRouter(ScrollToTop);
