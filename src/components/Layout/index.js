/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';

import './Layout.css';
import ScrollToTop from '../ScrollToTop';
import Drawer from '../Drawer';
import MainHeader from '../MainHeader';

const Layout = props => (
    <div id="layout">
        <Helmet>
            <title>{props.t('project.title')}</title>
            <meta name="robots" content="all" />
            <meta name="language" content={props.i18n.language} />
            <meta name="description" content={props.t(`route:${props.location.pathname}.description`)} />
        </Helmet>
        <ScrollToTop />
        <Drawer />
        <MainHeader signOut={props.signOut} />
        <main id="page" className="content-wrapper">
            {props.children}
        </main>
    </div>
);

Layout.propTypes = {
    i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    signOut: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default withRouter(translate(['common'])(Layout));
