import { createScene, createRenderer, createOrbitControls, createMapControls, createCamera, createLight } from './utils'

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

  createOrbitControls () {
    if (!this.renderer || !this.renderer.domElement) {
      throw new Error('renderer domElement is required')
    } else if (!this.camera) {
      throw new Error('camera is required')
    }
    this.controls = createOrbitControls(this.camera, this.renderer.domElement) // orbitControls
    return this.controls
  }

  createMapControls () {
    if (!this.renderer || !this.renderer.domElement) {
      throw new Error('renderer domElement is required')
    } else if (!this.camera) {
      throw new Error('camera is required')
    }
    this.controls = createMapControls(this.camera, this.renderer.domElement) // orbitControls

    return this.controls
  }

  createCamera () {
    this.camera = createCamera({ aspect: this._width / this._height })
    return this.camera
  }

  createLight (props) {
    return createLight(props)
  }

  render () {
    if (this.controls && (this.controls.enableDamping || this.controls.autoRotate)) {
      this.controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
    }

    this.renderer.render(this.scene, this.camera)
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this))
    this.render()
  }
}

export default Controller
