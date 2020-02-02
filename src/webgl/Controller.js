import { createScene, createRenderer, createOrbitControls, createMapControls, createCamera, createLight } from './utils'
import { EventBus, AFTER_RENDER } from '@/utils/EventBus'

class Controller {
  constructor () {
    this.renderer = null
    this.scene = null
    this.camera = null
    this.controls = null

    this._width = 0
    this._height = 0
    this._renderTick = null
    this._RAFID = null
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
    // if (!this.renderer) return
    if (this.controls && (this.controls.enableDamping || this.controls.autoRotate)) {
      this.controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
    }

    this.renderer.render(this.scene, this.camera)
  }

  animate (tick) {
    this._renderTick = tick
    this._RAFID = requestAnimationFrame(this.animate.bind(this))
    this.render()

    EventBus.$emit(AFTER_RENDER)
  }

  async destroy () {
    cancelAnimationFrame(this._RAFID)

    await this.dispose(this.scene)
    this.scene = null
    this.camera = null
    this.renderer.renderLists.dispose()
    this.renderer = null
  }

  dispose (object3D) {
    return new Promise(resolve => {
      object3D.traverse(o => {
        if (o.geometry) {
          o.geometry.dispose()
          // console.log('dispose geometry ', o.geometry)
        }

        if (o.material) {
          if (o.material.length) {
            for (let i = 0; i < o.material.length; ++i) {
              o.material[i].dispose()
              // console.log('dispose material ', o.material[i])
            }
          } else {
            o.material.dispose()
            // console.log('dispose material ', o.material)
          }
        }
      })
      resolve()
    })
  }
}

export default Controller
