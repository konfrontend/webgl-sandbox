<script>
import Object3D from './Object3D'
import * as THREE from 'three'
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

    // grid helper
    const grid = new THREE.GridHelper(100, 10)
    this.controller.scene.add(grid)
  }
}
</script>
