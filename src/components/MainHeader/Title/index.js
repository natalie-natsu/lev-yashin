import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const titleRoot = () => document.getElementById('main-header-title-dom');

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('span');
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        titleRoot().appendChild(this.el);
    }

    componentWillUnmount() {
        titleRoot().removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

Title.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

export default Title;
