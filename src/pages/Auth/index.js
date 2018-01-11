import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../helpers/routes';

import SignIn from './SignIn';
import NoMatch from '../NoMatch';

export default () => (
    <div id="auth">
        <Switch>
            <Route path={routes.auth.signIn} component={SignIn} />
            <Route component={NoMatch} />
        </Switch>
    </div>
);
