<script>
import Object3D from './Object3D'

export default {
  name: 'Camera',
  mixins: [Object3D],
  inject: ['controller'],
  data () {
    const curObj = this.controller.createCamera()

    return { curObj }
  }
}
</script>
