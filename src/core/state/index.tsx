import React from 'react';
import { AntdConfigContainer } from '@state/antdConfig';
import { ScrollConfigContainer } from '@state/scroll';

interface Props {
    children: JSX.Element;
}

const container = [AntdConfigContainer, ScrollConfigContainer];

function ProviderContainer(props: Props): JSX.Element {
    return container.reduce(
        (children, Container) => <Container.Provider>{children}</Container.Provider>,
        props.children
    );
}

export default ProviderContainer;
