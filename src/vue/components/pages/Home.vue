<template>
    <div><h2>Home Page</h2></div>
</template>
<script>
    export default {
        name: 'Home',
        mounted() {
            console.log(1);
        },
        metaInfo: {
            title: 'Home Page',
            meta: [
                {name: 'description', content: 'Hello from home page'}
            ]
        }
    }
</script>