import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

import './Layout.css';
import MainHeader from '../MainHeader';

const Layout = props => (
    <div id="layout">
        <Helmet>
            <title>{props.title}</title>
        </Helmet>
        <MainHeader signOut={props.signOut}/>
        <main className="page content-wrapper">
            {props.children}
        </main>
    </div>
);

Layout.propTypes = {
    signOut: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default Layout;
