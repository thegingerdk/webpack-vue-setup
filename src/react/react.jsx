import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const render = Component => {
    ReactDOM.render(<Component/>, document.getElementById('app'));
};

export const init = () => {
    render(App);
};

export const HMR = () => {
    module.hot.accept('./components/App.jsx', () => {
        const App = require('./components/App.jsx').default;
        render(App);
    });
};