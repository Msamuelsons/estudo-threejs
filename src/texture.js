import "./style.css"
import * as THREE from "three"
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Scene
const scene = new THREE.Scene()

// Loading Manager
// Quando a textura passar ou não passar os respectivos médodos serão acionados
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log("Start...")
}

loadingManager.onLoad = () => {
    console.log("Loading...")
}

loadingManager.onProgress = () => {
    console.log("Progress...")
}
loadingManager.onError = () => {
    console.log("Error loading")
}
// Texture

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load("/texture/color.jpg")

//Resizing
window.addEventListener("resize", () => {
    //Update Size
    aspect.width = window.innerWidth
    aspect.height = window.innerHeight

    //New Aspect Ratio
    camera.aspect = aspect.width / aspect.height
    camera.updateProjectionMatrix()

    //New RendererSize
    renderer.setSize(aspect.width, aspect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Mesh
const geometry = new THREE.PlaneBufferGeometry(1, 1)
console.log(geometry)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.z = 1
scene.add(camera)

//Renderer
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true
orbitControls.dampingFactor = 0.05

//Clock Class
const clock = new THREE.Clock()

const animate = () => {
    //GetElapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Update Controls
    orbitControls.update()

    //Renderer
    renderer.render(scene, camera)

    //RequestAnimationFrame
    window.requestAnimationFrame(animate)
}
animate()
