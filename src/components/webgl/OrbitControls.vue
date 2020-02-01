<template>
  <Object3D :rotation="{ y: Math.PI }" >
    <slot></slot>
  </Object3D>
</template>

<script>

import Object3D from './Object3D'

export default {
  name: 'OrbitControls',
  mixins: [Object3D],
  components: { Object3D },
  inject: ['controller'],
  data () {
    return {
      controls: null
    }
  },
  mounted () {
    this.controls = this.controller.createOrbitControls()
  },
  beforeDestroy () {
    if (this.controls) {
      this.controls.dispose()
    }
  }
}
</script>
