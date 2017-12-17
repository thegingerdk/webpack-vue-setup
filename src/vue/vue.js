import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import App from './components/App'
import {router} from './router'

Vue.use(VueRouter);
Vue.use(Meta);

const render = Component => {
    new Vue({
        el: '#app',
        router,
        render: h => h(Component),
    })
};

export const init = () => {
    render(App);
};

export const HMR = () => {
    module.hot.accept('./components/App.vue', () => {
        render(App);
    });
};