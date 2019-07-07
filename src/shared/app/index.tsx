import React from 'react';
import AppRouter from '@app/router';
import ProviderContainer from '@state/index';

const Root = () => {
    return (
        <ProviderContainer>
            <AppRouter />
        </ProviderContainer>
    );
};

export default Root;
