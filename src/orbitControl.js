import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Sscene
const scene = new THREE.Scene()

// Resizing the scene
window.addEventListener("resize", function () {
    //Upadete Size
    aspect.width = window.innerWidth
    aspect.height = window.innerHeight

    // New Aspect size
    camera.aspect = aspect.width / aspect.height
    camera.updateProjectionMatrix()

    // New Renderer Size
    renderer.setSize(aspect.width, aspect.height)
    renderer.setPixelRatio(window.devicePixelRatio)
})

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "purple" })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

// orbit Controls
const orbitControls = new OrbitControls(camera, canvas)

/*orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = 20
*/

orbitControls.enableDamping = true
orbitControls.dampingFactor = 0.01

// clock
function animate() {
    orbitControls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()
