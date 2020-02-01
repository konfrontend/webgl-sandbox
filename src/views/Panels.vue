<template>
  <div class="panels" @scene:created="onSceneReady">
    <Renderer auto-start>
      <dat-gui v-if="ui" :setup="uiSetup" :model="ui"></dat-gui>
      <Scene name="scene">
        <MapControls>
          <PerspectiveCamera name="CAMERA" :position="{ x: 10, y: 10, z: 20 }"  />
        </MapControls>
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
import MapControls from '@/components/webgl/MapControls'
import PerspectiveCamera from '@/components/webgl/PerspectiveCamera'
import Light from '@/components/webgl/Light'
import Mesh from '@/components/webgl/Mesh'
import DatGui from '@/components/webgl/DatGui'

export default {
  name: 'Panels',
  components: {
    Renderer,
    Scene,
    MapControls,
    PerspectiveCamera,
    Light,
    Mesh,
    DatGui
  },
  provide () {
    const { controller } = this

    return { controller }
  },
  data () {
    const controller = new Controller()
    const panel = new Panel().mesh

    return {
      ui: null,
      uiSetup: null,
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

    this.ui = {
      sample: { x: 2, y: 0, z: 3 },
      controls: this.controller.controls
    }
    this.uiSetup = function setupPanel (gui, ui) {
      const sample = gui.addFolder('Sample')
      sample.add(ui.sample, 'x', -5, 5).step(0.001)
      sample.add(ui.sample, 'y', -5, 5).step(0.001)
      sample.add(ui.sample, 'z', -5, 5).step(0.001)
      // sample.open()

      const controls = gui.addFolder('Controls')
      controls.add(ui.controls, 'screenSpacePanning')
      controls.open()
    }

    this.controller.animate()
  },
  methods: {
    onSceneReady ({ type, detail, ...customEvent }) {
      console.log(type, detail)
      this.controller.camera.aspect = window.innerWidth / window.innerHeight
      this.controller.camera.updateProjectionMatrix()
    }
  }
}
</script>
