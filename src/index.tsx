import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import Root from 'shared/app';
import './index.sass';
import 'index.css';

const render = () => {
    ReactDom.render(<Root />, document.getElementById('root'));
};

render();
