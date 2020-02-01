<template>
  <div class="panels" @scene:created="onSceneReady">
    <Renderer auto-start>
      <dat-gui :setup="uiSetup" :model="ui"></dat-gui>
      <Scene name="scene">
        <OrbitControls>
          <PerspectiveCamera name="CAMERA" :position="{ x: 10, y: 10, z: 20 }"  />
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
import DatGui from '@/components/webgl/DatGui'

function getModel () {
  let ui = {
    sample: { x: 2, y: 0, z: 3 },
    sysKey: 0,
    replay: () => {
      ui.sysKey += 1
    }
  }
  return ui
}

function setupPanel (gui, ui) {
  let fc = gui.addFolder('Sample')
  fc.add(ui.sample, 'x', -5, 5).step(0.001)
  fc.add(ui.sample, 'y', -5, 5).step(0.001)
  fc.add(ui.sample, 'z', -5, 5).step(0.001)
  fc.open()

  gui.add(ui, 'replay')
}

export default {
  name: 'Panels',
  components: {
    Renderer,
    Scene,
    OrbitControls,
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
    let ui = getModel()
    let uiSetup = setupPanel
    const controller = new Controller()
    const panel = new Panel().mesh

    return {
      ui,
      uiSetup,
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
