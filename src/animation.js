import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import * as dat from "dat.gui"

//Scene
const scene = new THREE.Scene()

// Light
const light = new THREE.AmbientLight(0xffffff, 1.1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.position.z = 2
scene.add(directionalLight, light)

// FBX
const fbxloader = new FBXLoader()

// Load GLTFLoader
let animationMixer = null
fbxloader.load("models/Jumping.fbx", function (fbx) {
    animationMixer = new THREE.AnimationMixer(fbx)
    const clipAction = animationMixer.clipAction(fbx.animations[0])
    fbx.position.y = -0.8
    fbx.scale.set(0.01, 0.01, 0.01)
    clipAction.play()
    scene.add(fbx)
})

//Debugging
// const gui = new dat.GUI();

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
camera.position.z = 6
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
let previousTime = 0

const animate = () => {
    //GetElapsedTime
    const elapsedTime = clock.getElapsedTime()
    const frameTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //Update Controls
    orbitControls.update()

    //Update animationMixer
    if (animationMixer) {
        animationMixer.update(frameTime)
    }

    //Renderer
    renderer.render(scene, camera)

    //RequestAnimationFrame
    window.requestAnimationFrame(animate)
}
animate()
