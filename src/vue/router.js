import VueRouter from 'vue-router'
import Home from './components/pages/Home'

const routes = [
    {path: '/', component: Home},
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});