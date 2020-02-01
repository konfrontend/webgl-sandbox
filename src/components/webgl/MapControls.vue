<script>

import Object3D from './Object3D'

export default {
  name: 'MapControls',
  mixins: [Object3D],
  inject: ['controller'],
  data () {
    return {
      controls: null
    }
  },
  async mounted () {
    this.controls = this.controller.createMapControls()
    await this.$nextTick()
    this.controls.update()
  },
  beforeDestroy () {
    if (this.controls) {
      this.controls.dispose()
    }
  }
}
</script>
