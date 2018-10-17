var React = require('react');
var ReactDOM = require('react-dom');
import Root from "./router";
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <Root/>,
    document.getElementById('app-root')
);

