import * as THREE from "three"
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"

//Scene
const scene = new THREE.Scene()

//Debugging
const gui = new dat.GUI()

//Lights

//1)Ambient light
const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.4)
scene.add(ambientLight)

gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("Intensity")

//2)Directional light
const directionalLight = new THREE.DirectionalLight("#FFFFFF", 0.5)
scene.add(directionalLight)
directionalLight.position.set(-1, 1, 1)
gui.add(directionalLight, "intensity").min(0).max(1).step(0.01).name("Intensity")
gui.add(directionalLight.position, "x").min(-3).max(3).step(0.01).name("position-X")
gui.add(directionalLight.position, "y").min(-3).max(3).step(0.01).name("position-Y")

// !Directional light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

//3)HemisphereLight
//const hemisphereLight = new THREE.HemisphereLight("blue", "yellow", 0)
//scene.add(hemisphereLight)

// !HemisphereLight Helper
//const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight)
//scene.add(hemisphereLightHelper)

//!PointLight
//const pointLight = new THREE.PointLight("red", 0.8, 3)
//scene.add(pointLight)
//const pointLightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(pointLightHelper)
//gui.add(pointLight.position, "x").min(-3).max(3).step(0.01).name("pointLight-X")
//gui.add(pointLight.position, "y").min(-3).max(3).step(0.01).name("pointLight-Y")
//gui.add(pointLight.position, "z").min(-3).max(3).step(0.01).name("pointLight-Z")

//!RectAreaLight
// const rectAreaLight = new THREE.RectAreaLight("red", 3, 2, 2)
// rectAreaLight.position.z = 0.5
// scene.add(rectAreaLight)

//SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 1, 8, Math.PI * 0.25, 0.1, 1)
gui.add(spotLight.position, "z").min(-3).max(3).step(0.01).name("spotLight-X")
gui.add(spotLight, "angle").min(0).max(3).step(0.01).name("spotLight-angle")

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
const geometry = new THREE.PlaneBufferGeometry(10, 10, 64, 64)
const material = new THREE.MeshStandardMaterial()
material.side = THREE.DoubleSide
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.z = 9
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
