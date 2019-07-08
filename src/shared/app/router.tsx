import React, { Suspense } from 'react';
import router from '@router/index';
import { Switch, HashRouter, Redirect } from 'react-router-dom';
import AppLayout from '@components/Layout';
import RouteTransition from '@components/RouteTransition';

const AppRouter = () => {
    return (
        <HashRouter>
            <Switch>
                <AppLayout>
                    <Suspense fallback={<div>loading...</div>}>
                        <Switch>
                            {router.map(routeGroup => {
                                return routeGroup.pages.map((route, index: number) => (
                                    <RouteTransition key={index} exact component={route.component} path={route.path} />
                                ));
                            })}
                            <Redirect from={'**'} to={'/blog/eventloop'} />
                        </Switch>
                    </Suspense>
                </AppLayout>
            </Switch>
        </HashRouter>
    );
};

export default AppRouter;
