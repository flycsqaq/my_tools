import React from 'react';
import ReactDom from 'react-dom';
import Counter from '@components/Counter';

const render = () => {
    ReactDom.render(<Counter />, document.getElementById('root'));
};

render();
