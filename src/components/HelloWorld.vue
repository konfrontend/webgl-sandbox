<template>
  <div class="hello">
    <Toolbar/>
    <div ref="container"></div>
    <!-- <Renderer :size="size" >
      <Scene name="scene">
        <OrbitControls top-prop="controls-top" :position="{ x: 9, y: 21, z: 20 }" :rotation="{ x: 2, y: 0, z: 3 }">
          <Camera name="camera"/>
        </OrbitControls>

        <Light :hex="0xefefff" :intensity="2" :position="{ x: 50, y: 50, z: 50 }"/>
        <Light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"/>
        <Cube name="cube" :size="10"/>
      </Scene>
    </Renderer> -->
  </div>
</template>

<script>
// import Renderer from '@/components/webgl/Renderer'
// import Camera from '@/components/webgl/Camera'
// import Scene from '@/components/webgl/Scene'
// import Light from '@/components/webgl/Light'
// import OrbitControls from '@/components/webgl/OrbitControls'

// import Cube from '@/components/webgl/mesh/Cube'
import * as THREE from 'three'
import SceneManager from '@/webgl/SceneManager'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'HelloWorld',
  components: { Toolbar },
  provide () {
    const { renderer, scene } = this

    return { renderer, scene }
  },
  data () {
    const { renderer, scene } = new SceneManager()

    return { renderer, scene }
  },
  mounted () {
    this.$refs.container.appendChild(this.renderer.domElement)

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xFFFFDD, roughness: 1 })
    )
    cube.name = `${cube.type}:cube`
    this.scene.add(cube)

    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    if (process.env.NODE_ENV === 'development') {
      window.THREE = THREE
      window.scene = this.scene
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
