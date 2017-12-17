<template>
    <div id="app">
        <img src="../../images/logo.png">
        <h1>{{ msg }}</h1>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to webpack config fun time, HMR works!!'
            }
        }
    }
</script>