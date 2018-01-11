import React from 'react';
import { routes } from '../../helpers/routes';
import PrivateRoute from '../../components/PrivateRoute';

import MeExact from './Exact';

export default () => (
    <div id="me">
        <PrivateRoute exact path={routes.me.exact} component={MeExact} />
    </div>
);
