import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Scene
const scene = new THREE.Scene()

// Mesh
const geometry = new THREE.PlaneBufferGeometry(1, 1)
//const geometry = new THREE.BufferGeometry()
/*
const verticesArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])
const positionsAtributes = new THREE.BufferAttribute(verticesArray, 3)

geometry.setAttribute("position", positionsAtributes)
*/
const material = new THREE.MeshBasicMaterial({ color: "yellow", wireframe: true })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Camera

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.set(2, 2, 2)
scene.add(camera)

// Renderer
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

//Resizing
window.addEventListener("resize", function () {
    // new resize
    aspect.width = window.innerWidth
    aspect.height = window.innerHeight

    //new Aspect ratio
    camera.aspect = aspect.width / aspect.height
    camera.updateProjectionMatrix()
    renderer.setSize(aspect.width, aspect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const orbitControls = new OrbitControls(camera, canvas)

//clock class
const clock = new THREE.Clock()
function animate() {
    // GetElapsedTime
    const elapsedTime = clock.getElapsedTime()

    // render
    renderer.render(scene, camera)

    // request animationFrame
    window.requestAnimationFrame(animate)
}
animate()
