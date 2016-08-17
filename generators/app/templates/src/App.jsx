import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import Demo from './Component/Demo'

import './Style/style.scss'; //加载公共样式

render(
    <Demo />,
    document.body.appendChild(document.createElement('div'))
);
