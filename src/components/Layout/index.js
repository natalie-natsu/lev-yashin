import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';

import './Layout.css';
import Drawer from '../Drawer';
import MainHeader from '../MainHeader';

const Layout = props => (
    <div id="layout">
        <Helmet>
            <title>{props.t('project.name')}</title>
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
    t: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default translate(['common'])(Layout);
