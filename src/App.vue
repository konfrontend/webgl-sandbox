<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>

import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
