import * as THREE from "three"

// Scene
const scene = new THREE.Scene()

// Mesh
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshBasicMaterial({ color: "purple" })
const purpleMesh = new THREE.Mesh(geometry, material)

purpleMesh.position.x = 1

// Mesh two
const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material2 = new THREE.MeshBasicMaterial({ color: "yellow" })
const yellowMesh = new THREE.Mesh(geometry2, material2)

yellowMesh.position.x = -1

//Mesh three
const geometry3 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material3 = new THREE.MeshBasicMaterial({ color: "green" })
const greenMesh = new THREE.Mesh(geometry3, material3)

// Mesh four
const geometry4 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material4 = new THREE.MeshBasicMaterial({ color: "white" })
const whiteMesh = new THREE.Mesh(geometry4, material4)
whiteMesh.position.set(1, 1, 0)

//Mesh Five
const geometry5 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material5 = new THREE.MeshBasicMaterial({ color: "pink" })
const pinkMesh = new THREE.Mesh(geometry5, material5)
pinkMesh.position.set(-1, 1, 0)

//lookAtMesh

/* yellowMesh.lookAt(whiteMesh.position)
purpleMesh.lookAt(pinkMesh.position)
pinkMesh.lookAt(greenMesh.position)
whiteMesh.lookAt(yellowMesh.position)
blueMesh.lookAt(greenMesh.position)
greenMesh.lookAt(blueMesh.position) */

// Mouse Listener
const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener("mousemove", function ({ clientX, clientY }) {
    cursor.x = clientX / window.innerWidth - 0.5
    cursor.y = clientY / window.innerHeight - 0.5
    console.log(cursor.x, cursor.y)
})
console.log(whiteMesh.position)

//Mesh Six
const geometry6 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material6 = new THREE.MeshBasicMaterial({ color: "blue" })
const blueMesh = new THREE.Mesh(geometry6, material6)
blueMesh.position.y = 1

scene.add(purpleMesh, yellowMesh, greenMesh, whiteMesh, pinkMesh, blueMesh)

// Camera
const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, width / height)
camera.position.z = 2.5
scene.add(camera)

// Renderer
const canvas = document.querySelector(".draw")

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(width, height)

const clock = new THREE.Clock()

function animate() {
    const elepsedTime = clock.getElapsedTime()

    // lookAt
    greenMesh.lookAt(new THREE.Vector3(cursor.x, -cursor.y, 1))

    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}

animate()
