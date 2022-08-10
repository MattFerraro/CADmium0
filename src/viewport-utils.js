import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const PI = 3.1415926

const bluetiful = 0x0366fc
const verdigris = 0x48a9a6
const redSalsa = 0xff595e
const jonquil = 0xf7cb15
const white = 0xffffff

export function initScene(canvasID) {
  const canvas = document.getElementById(canvasID)
  const scene = new THREE.Scene()

  const w = canvas.getBoundingClientRect().width
  const h = canvas.getBoundingClientRect().height
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
  renderer.setClearColor(0xffffff, 0)
  renderer.setSize(w, h)

  // xy is top
  // xz is front
  // yz is right
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    side: THREE.DoubleSide,
    depthWrite: false,
    transparent: true,
    opacity: 0.03,
  })

  const topPlaneGeometry = new THREE.PlaneGeometry(1, 1)
  const topPlane = new THREE.Mesh(topPlaneGeometry, planeMaterial)
  scene.add(topPlane)

  const frontPlaneGeometry = new THREE.PlaneGeometry(1, 1)
  frontPlaneGeometry.rotateX(PI / 2)
  const frontPlane = new THREE.Mesh(frontPlaneGeometry, planeMaterial)
  scene.add(frontPlane)

  const rightPlaneGeometry = new THREE.PlaneGeometry(1, 1)
  rightPlaneGeometry.rotateY(PI / 2)
  const rightPlane = new THREE.Mesh(rightPlaneGeometry, planeMaterial)
  scene.add(rightPlane)

  const dotGeometry = new THREE.BufferGeometry()
  dotGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3)
  )
  const dotMaterial = new THREE.PointsMaterial({
    size: 5,
    color: bluetiful,
    sizeAttenuation: false,
  })
  const dot = new THREE.Points(dotGeometry, dotMaterial)
  scene.add(dot)

  const lineMaterial = new THREE.LineBasicMaterial({
    color: bluetiful,
    linewidth: 1,
  })
  const points = []
  points.push(new THREE.Vector3(-0.5, -0.5, 0))
  points.push(new THREE.Vector3(-0.5, 0.5, 0))
  points.push(new THREE.Vector3(0.5, 0.5, 0))
  points.push(new THREE.Vector3(0.5, -0.5, 0))
  points.push(new THREE.Vector3(-0.5, -0.5, 0))
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  const topLineGeometry = lineGeometry.clone()
  const topLine = new THREE.Line(topLineGeometry, lineMaterial)
  scene.add(topLine)

  const frontLineGeometry = lineGeometry.clone()
  frontLineGeometry.rotateX(PI / 2)
  const frontLine = new THREE.Line(frontLineGeometry, lineMaterial)
  scene.add(frontLine)

  const rightLineGeometry = lineGeometry.clone()
  rightLineGeometry.rotateY(PI / 2)
  const rightLine = new THREE.Line(rightLineGeometry, lineMaterial)
  scene.add(rightLine)

  camera.position.y = -1
  camera.position.x = 0.7
  camera.position.z = 0.7
  const controls = new OrbitControls(camera, renderer.domElement)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()

  renderer.render(scene, camera)
  return { renderer, camera, scene }
}
