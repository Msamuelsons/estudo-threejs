import * as THREE from "three"
import gsap from "gsap"

//scene
const scene = new THREE.Scene()

//mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "purple" })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Gsap
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

//camera
const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, width / height)
camera.position.z = 3

scene.add(camera)

// Render scene
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(width, height)
const clock = new THREE.Clock()

function animate() {
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.y = elapsedTime

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

animate()
