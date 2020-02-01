import * as THREE from 'three'

export default class Panel {
  constructor () {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xFFFFDD, roughness: 1 })
    )
    cube.name = `${cube.type}:cube`

    this.mesh = cube
  }
}
