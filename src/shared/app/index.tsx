import React from 'react';
import AppRouter from '@app/router';
import ProviderContainer from '@state/index';
import AppLayout from '@components/Layout';
import { HashRouter } from 'react-router-dom';

const Root = () => {
    return (
        <ProviderContainer>
            <HashRouter>
                <AppRouter />
            </HashRouter>
        </ProviderContainer>
    );
};

export default Root;
