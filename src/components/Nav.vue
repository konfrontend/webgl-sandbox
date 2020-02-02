<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  created () {
  }
}
</script>

<style lang="scss">
  #nav {
    padding: 30px;
    position: fixed;
    pointer-events: none;

    a {
      pointer-events: auto;
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
