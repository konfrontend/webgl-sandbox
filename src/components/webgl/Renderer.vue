<template>
  <div>
    <slot></slot>
    <div ref="container"></div>
  </div>
</template>

<script>

export default {
  name: 'Renderer',
  inject: ['controller'],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const defaultConfig = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const config = Object.assign(defaultConfig, this.config)
    const curObj = this.controller.createRenderer(config)

    return { curObj }
  },

  mounted () {
    this.$refs.container.appendChild(this.curObj.domElement)

    if (this.autoStart) {
      this.controller.animate()
    }
  }
}
</script>
