<style lang="scss">
    body, html {
        padding: 0;
        margin: 0;
    }
    
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: $blue;
        margin-top: 60px;
    }
    
    h1, h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: $green;
    }
</style>
<template>
    <div id="app">
        <img src="../../images/logo.png">
        <h1>{{ msg }}</h1>
        <router-link to="/">Home</router-link>
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