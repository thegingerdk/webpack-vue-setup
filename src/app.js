import './scss/app.scss'
import {HMR, init} from './vue/vue'

init();

if (module.hot) {
    HMR();
}