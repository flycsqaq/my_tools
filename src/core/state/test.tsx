import { useState } from 'react';
import { createContainer } from 'unstated-next';

function Counter() {
    const [counter, setCounter] = useState(0);
    return {
        counter,
        setCounter
    };
}

export const CounterContainer = createContainer(Counter);
