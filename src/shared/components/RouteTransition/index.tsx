import React, { useEffect, useCallback, Fragment, Dispatch, useState } from 'react';
import { Route } from 'react-router-dom';
import { Motion, spring } from 'react-motion';

const RouteTransition = (props: any) => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        return () => {
            setOpen(false);
        };
    }, []);

    const Child = (props: any) => {
        return (
            <Motion defaultStyle={{ x: 100 }} style={{ x: spring(open ? 0 : 100) }}>
                {({ x }) => {
                    return <div style={{ marginLeft: `${x}%` }}>{props.children}</div>;
                }}
            </Motion>
        );
    };

    return (
        <Child>
            <Route {...props} />
        </Child>
    );
};

export default RouteTransition;
