import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import './Layout.css';
import Drawer from '../Drawer';
import MainHeader from '../MainHeader';

const Layout = props => (
    <div id="layout">
        <Helmet>
            <title>{props.title}</title>
        </Helmet>
        <Drawer />
        <MainHeader signOut={props.signOut} />
        <main id="page" className="content-wrapper">
            {props.children}
        </main>
    </div>
);

Layout.propTypes = {
    signOut: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

export default Layout;
