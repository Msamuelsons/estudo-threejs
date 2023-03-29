import "./style.css"
import * as THREE from "three"
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"

const scene = new THREE.Scene()

// Debugging
const gui = new dat.GUI()
const materialColor = {
    color: 0xffffff,
}

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

const material = new THREE.MeshBasicMaterial({ color: "red" })
material.side = THREE.DoubleSide

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
gui.add(mesh.position, "x").min(-3).max(3)
gui.add(material, "wireframe")
gui.addColor(materialColor, "color").onChange(() => {
    material.color.set(materialColor.color)
})

//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height)
camera.position.z = 1
scene.add(camera)

// Renderer
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
