import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import * as dat from "dat.gui"

//Scene
const scene = new THREE.Scene()

// Light
const light = new THREE.AmbientLight(0xffffff, 0.1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.z = 2
scene.add(directionalLight, light)

//Debugging
// const gui = new dat.GUI();

//ObjectLoader
const objloader = new OBJLoader()

// Loadinf Model
objloader.load("models/gless.obj", function (object) {
    scene.add(object)
    object.children[0].material = new THREE.MeshNormalMaterial()
    object.children[1].material = new THREE.MeshNormalMaterial()
    object.children.material = new THREE.MeshNormalMaterial()
    console.log(object.children[0].material)
})

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

//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.z = 3
scene.add(camera)

//Renderer
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(aspect.width, aspect.height)

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true

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
