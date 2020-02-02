<template>
  <div class="home">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <router-link :to="{name: 'panels'}">
            <p class="title">Panels</p>
            <p class="subtitle">Layout</p>
          </router-link>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <router-link :to="{name: 'basicShader'}">
            <p class="title">Shader</p>
            <p class="subtitle">Basic shader test</p>
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss">
  .home {
    min-height: 100vh;
    background: #f0f0f0;
    padding: 80px 20px;
  }
</style>
