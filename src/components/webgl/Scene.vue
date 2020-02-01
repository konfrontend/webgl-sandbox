<script>
import Object3D from './Object3D'

export default {
  name: 'Scene',
  mixins: [Object3D],
  inject: ['controller'],
  data () {
    const curObj = this.controller.createScene('NEW SCENE')

    return { curObj }
  },
  mounted () {
    this.dispatchEvent('scene:created', true)
  }
}
</script>
