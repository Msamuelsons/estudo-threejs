import * as THREE from "three"

// Scene
const scene = new THREE.Scene()

// Mesh
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshBasicMaterial({ color: "yellow" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera

const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.z = 2.5
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
