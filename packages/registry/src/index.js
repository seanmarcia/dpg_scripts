import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { List } from './components/List.js';
import { Filters } from './components/Filters.js';


ReactDOM.render(<List />, document.querySelector('#mytable'));
ReactDOM.render(<Filters />, document.querySelector('#filters'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
