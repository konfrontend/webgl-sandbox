import { createScene, createRenderer, createControls, createCamera, createLight } from './utils'

class Controller {
  constructor () {
    this.renderer = null
    this.scene = null
    this.camera = null
    this.controls = null

    this._width = 0
    this._height = 0
  }

  createRenderer ({ width, height }) {
    this.renderer = createRenderer(width, height)
    this._width = width
    this._height = height
    return this.renderer
  }

  createScene (name) {
    this.scene = createScene(name)
    return this.scene
  }

  createControls () {
    if (!this.renderer || !this.renderer.domElement) {
      throw new Error('renderer domElement is required')
    } else if (!this.camera) {
      throw new Error('camera is required')
    }
    this.controls = createControls(this.camera, this.renderer.domElement) // orbitControls
    return this.controls
  }

  createCamera (position = { x: 10, y: 10, z: 20 }) {
    this.camera = createCamera({ aspect: this._width / this._height, position })
    return this.camera
  }

  createLight (props) {
    return createLight(props)
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

export default Controller
