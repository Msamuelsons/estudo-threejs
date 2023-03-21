import * as THREE from "three"

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
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

// clock
const clock = new THREE.Clock()
function animate() {
    const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y = elapsedTime
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()
