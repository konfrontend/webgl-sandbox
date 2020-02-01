<template>
  <div class="panels" @scene:created="onSceneReady">
    <Renderer auto-start>
      <Scene name="scene">
        <OrbitControls>
          <PerspectiveCamera name="CAMERA"/>
        </OrbitControls>
        <Light :hex="0xefefff" :intensity="2" :position="{ x: 50, y: 50, z: 50 }"/>
        <Light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"/>
        <Mesh :obj="panel" :position="{ x: 0, y: 0, z: 0 }"></Mesh>
      </Scene>
    </Renderer>
  </div>
</template>

<script>

import * as THREE from 'three'
import Controller from '@/webgl/Controller'
import Panel from '@/webgl/elements/Panel'

import Renderer from '@/components/webgl/Renderer'
import Scene from '@/components/webgl/Scene'
import OrbitControls from '@/components/webgl/OrbitControls'
import PerspectiveCamera from '@/components/webgl/PerspectiveCamera'
import Light from '@/components/webgl/Light'
import Mesh from '@/components/webgl/Mesh'

export default {
  name: 'Panels',
  components: {
    Renderer,
    Scene,
    OrbitControls,
    PerspectiveCamera,
    Light,
    Mesh
  },
  provide () {
    const { controller } = this

    return { controller }
  },
  data () {
    const controller = new Controller()
    const panel = new Panel().mesh

    return {
      controller,
      cubePosition: { x: 0, y: 0, z: 0 },
      panel
    }
  },
  mounted () {
    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    if (process.env.NODE_ENV === 'development') {
      window.THREE = THREE
      window.scene = this.controller.scene
    }
  },
  methods: {
    onSceneReady ({ type, detail }) {
      console.log(type, detail)
    }
  }
}
</script>
