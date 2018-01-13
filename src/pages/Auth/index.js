import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../helpers/routes';

import NoMatch from '../NoMatch';
import SignIn from './SignIn';
import Register from './Register';

export default () => (
    <div id="auth">
        <Switch>
            <Route path={routes.auth.signIn} component={SignIn} />
            <Route path={routes.auth.register} component={Register} />
            <Route component={NoMatch} />
        </Switch>
    </div>
);
