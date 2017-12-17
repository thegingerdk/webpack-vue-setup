import VueRouter from 'vue-router'
import Home from './components/pages/Home.vue'
import About from './components/pages/About.vue'
import Contact from './components/pages/Contact.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/contact', component: Contact}
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});