import React, { Suspense } from 'react';
import router from '@router/index';
import { Route, Switch } from 'react-router-dom';
import AppLayout from '@components/Layout';
import { ConfigProvider } from 'antd';

const AppRouter = () => {
    return (
        <Switch>
            <ConfigProvider>
                <AppLayout>
                    <Suspense fallback={<div>loading...</div>}>
                        {router.map(routeGroup => {
                            return routeGroup.pages.map((route, index) => (
                                <Route key={index} exact component={route.component} path={route.path} />
                            ));
                        })}
                    </Suspense>
                </AppLayout>
            </ConfigProvider>
        </Switch>
    );
};

export default AppRouter;
