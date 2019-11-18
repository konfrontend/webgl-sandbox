import { WebGLRenderer, Scene, DirectionalLight, PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
  const renderer = new WebGLRenderer({ antialias: true })

  renderer.setClearColor(0x111111)
  renderer.setSize(w, h)
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

export function createControls (camera, domElement) {
  return new OrbitControls(camera, domElement)
}

export function createCamera (props = {}) {
  let {
    fov = 75,
    aspect = 1, // Camera frustum aspect ratio, usually the canvas width / canvas height.
    near = 0.1,
    far = 1000,
    position = new Vector3(0, 0, 20)
  } = props

  if (!position.isVector3) {
    position = vectorUtil.toVector3(position)
  }

  const camera = new PerspectiveCamera(fov, aspect, near, far)

  camera.position.copy(position)

  return camera
}
