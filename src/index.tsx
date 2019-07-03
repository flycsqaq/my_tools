import React from 'react';
import ReactDom from 'react-dom';
import Root from 'shared/app';
import './index.sass';

const render = () => {
    ReactDom.render(<Root />, document.getElementById('root'));
};

render();
