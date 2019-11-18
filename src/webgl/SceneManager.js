import { createLight, createScene, createRenderer, createControls, createCamera } from './utils'

export default class SceneManager {
  constructor (props = {}) {
    const {
      w = window.innerWidth,
      h = window.innerHeight,
      autoStart = true
    } = props

    this.renderer = createRenderer(w, h)
    this.scene = createScene('Root Scene')
    this.camera = createCamera({ aspect: w / h, position: { x: 10, y: 10, z: 20 } })
    this.controls = createControls(this.camera, this.renderer.domElement) // orbitControls

    // TODO add an option to setup defaults
    this.scene.add(createLight({ hex: 0xffffff, position: { x: 50, y: 50, z: 50 } }))
    this.scene.add(createLight({ hex: 0xffffff, position: { x: -50, y: -50, z: -50 } }))
    this.scene.add(createLight({ intensity: 0.5 }))

    if (autoStart) {
      this.render()
    }
  }

  render () {
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}
