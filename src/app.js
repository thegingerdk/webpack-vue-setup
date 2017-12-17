import './scss/app.scss'
// import {HMR, init} from './vue/vue'
import {HMR, init} from './react/react'

init();

if (module.hot) {
    HMR();
}