<script>
import Object3D from './Object3D'

export default {
  name: 'Light',
  mixins: [Object3D],
  inject: ['controller'],
  props: {
    hex: Number,
    intensity: Number,
    position: Object
  },
  data () {
    const curObj = this.controller.createLight({
      hex: this.hex,
      position: this.position,
      intensity: this.intensity
    })

    return { curObj }
  }
}
</script>
