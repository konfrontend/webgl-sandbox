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
        <Mesh :obj="mesh" :position="{ x: 0, y: 0, z: 0 }"></Mesh>
      </Scene>
    </Renderer>
  </div>
</template>

<script>

import * as THREE from 'three'
import Controller from '@/webgl/Controller'
import { EventBus, AFTER_RENDER } from '@/utils/EventBus'

import Renderer from '@/components/webgl/Renderer'
import Scene from '@/components/webgl/Scene'
import MapControls from '@/components/webgl/MapControls'
import PerspectiveCamera from '@/components/webgl/PerspectiveCamera'
import Light from '@/components/webgl/Light'
import Mesh from '@/components/webgl/Mesh'
import DatGui from '@/components/webgl/DatGui'
import vertexShader from '@/webgl/shaders/vertexShader1.glsl'
import fragmentShader from '@/webgl/shaders/fragmentShader1.glsl'

export default {
  name: 'BasicShader',
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
    const material = new THREE.ShaderMaterial({
      uniforms: {
        delta: { value: 0 }
      },
      vertexShader,
      fragmentShader
    })

    const geometry = new THREE.BoxBufferGeometry(20, 20, 20, 20, 20, 20)
    const mesh = new THREE.Mesh(geometry, material)
    const vertexDisplacement = new Float32Array(geometry.attributes.position.count)
    for (let i = 0; i < vertexDisplacement.length; i++) {
      vertexDisplacement[i] = Math.sin(i)
    }
    geometry.addAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1))

    return {
      ui: null,
      uiSetup: null,
      controller,
      mesh,
      vertexDisplacement
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
    }
    this.uiSetup = function setupPanel (gui, ui) {

    }

    let delta = 0

    EventBus.$on(AFTER_RENDER, () => {
      delta += 0.01
      this.mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5
      for (let i = 0; i < this.vertexDisplacement.length; i++) {
        this.vertexDisplacement[i] = 0.5 + Math.sin(i * delta) * 0.25
      }
      this.mesh.geometry.attributes.vertexDisplacement.needsUpdate = true
    })

    this.controller.animate()
  },
  async beforeDestroy () {
    await this.controller.destroy()
  },
  methods: {
    onSceneReady ({ type, detail, ...customEvent }) {
      this.controller.camera.aspect = window.innerWidth / window.innerHeight
      this.controller.camera.updateProjectionMatrix()
    }
  }
}
</script>
