import React from 'react';
import { Component } from '../../../../../node_modules/@types/react';

interface Props {
    children: Component;
}

const ProviderContainer = (...containers: any[]) => {
    return (props: any) => {
        return containers.reduce(
            (children, Container) => <Container.Provider>{children}</Container.Provider>,
            props.children
        );
    };
};

export default ProviderContainer;
