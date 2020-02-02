import { WebGLRenderer, Scene, DirectionalLight, PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls, MapControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const vectorUtil = {
  multiplyScalar (v, s) {
    v = this.toVector3(v)
    v.multiplyScalar(s)
    return this.toPlainObj(v)
  },

  add (v1, v2) {
    v1 = this.toVector3(v1)
    v2 = this.toVector3(v2)
    let v = v1.add(v2)
    return this.toPlainObj(v)
  },

  toVector3 (v) {
    v = v || {}
    return new Vector3(v.x, v.y, v.z)
  },

  toPlainObj (v) {
    let { x, y, z } = v
    return { x, y, z }
  }
}

export function createRenderer (w, h) {
  const renderer = new WebGLRenderer({ antialias: false })

  renderer.setClearColor(0x111111)
  renderer.setSize(w, h)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.name = renderer.type

  return renderer
}

export function createScene (name) {
  const scene = new Scene()
  scene.name = name
  return scene
}

export function createLight (props = {}) {
  const {
    hex = 0xFFFFFF,
    intensity = 2,
    position = new Vector3(0, 1, 0) // top
  } = props

  const light = new DirectionalLight(hex, intensity)

  light.position.copy(position)
  light.name = light.type

  return light
}

export function createOrbitControls (camera, domElement) {
  return new OrbitControls(camera, domElement)
}

export function createMapControls (camera, domElement) {
  const controls = new MapControls(camera, domElement)

  // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  // controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  // controls.dampingFactor = 0.05

  controls.screenSpacePanning = false

  controls.minDistance = 100
  controls.maxDistance = 500

  controls.maxPolarAngle = Math.PI / 2

  controls.name = 'MAPCONTROLS'
  return controls
}

export function createCamera (props = {}) {
  let {
    fov = 75,
    aspect = 1, // Camera frustum aspect ratio, usually the canvas width / canvas height.
    near = 0.1,
    far = 1000
  } = props

  const camera = new PerspectiveCamera(fov, aspect, near, far)
  camera.name = 'PERSPECTIVE'

  return camera
}
