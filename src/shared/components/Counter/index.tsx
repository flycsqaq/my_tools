import React, { useState } from 'react';
// import ReactDom from 'react-dom'
import { Button } from 'antd';
// import hot from 'react-hot-loader/root'
const Counter = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <div>{counter}</div>
            <Button type="primary" onClick={() => setCounter(counter + 1)}>
                +
            </Button>
            <Button onClick={() => setCounter(counter - 1)}>-</Button>
        </div>
    );
};

// const CounterHot = hot(Counter)

export default Counter;
