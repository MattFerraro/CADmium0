import { colorScheme } from "./colorScheme"
import * as THREE from "three"
import CameraControls from "camera-controls"

CameraControls.install({ THREE: THREE })

const PI = 3.1415926

const bluetiful = 0x0366fc
// const verdigris = 0x48a9a6
// const redSalsa = 0xff595e
// const jonquil = 0xf7cb15
// const white = 0xffffff

export const planeMaterial = new THREE.MeshPhongMaterial({
  color: colorScheme.plane,
  side: THREE.DoubleSide,
  depthWrite: false,
  transparent: true,
  opacity: 0.1,
})

export const planeHoverMaterial = new THREE.MeshPhongMaterial({
  color: colorScheme.mouseOver,
  side: THREE.DoubleSide,
  depthWrite: false,
  transparent: true,
  opacity: 0.3,
})

export const planeSelectedMaterial = new THREE.MeshPhongMaterial({
  color: colorScheme.selected,
  side: THREE.DoubleSide,
  depthWrite: false,
  transparent: true,
  opacity: 0.3,
})

export function initScene(canvasID, doc) {
  const canvas = document.getElementById(canvasID)
  const scene = new THREE.Scene()

  const w = canvas.getBoundingClientRect().width
  const h = canvas.getBoundingClientRect().height
  const camera = new THREE.PerspectiveCamera(5, w / h, 0.01, 1000)

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
  renderer.setClearColor(0xffffff, 0)
  renderer.setSize(w, h)

  // xy is top
  // xz is front
  // yz is right

  const topPlaneGeometry = new THREE.PlaneGeometry(1, 1)
  const topPlane = new THREE.Mesh(topPlaneGeometry, planeMaterial)
  scene.add(topPlane)
  topPlane.mousedOver = false
  // doc.default.planes[0].object = topPlane

  const frontPlaneGeometry = new THREE.PlaneGeometry(1, 1)
  frontPlaneGeometry.rotateX(PI / 2)
  const frontPlane = new THREE.Mesh(frontPlaneGeometry, planeMaterial)
  scene.add(frontPlane)
  frontPlane.mousedOver = false
  // doc.default.planes[1].object = frontPlane

  const rightPlaneGeometry = new THREE.PlaneGeometry(1, 1)
  rightPlaneGeometry.rotateY(PI / 2)
  const rightPlane = new THREE.Mesh(rightPlaneGeometry, planeMaterial)
  scene.add(rightPlane)
  rightPlane.mousedOver = false
  // doc.default.planes[2].object = rightPlane

  // const planes = [topPlane, frontPlane, rightPlane]

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

  // ADD LIGHTS
  scene.add(new THREE.AmbientLight(0xffffff))

  // SET UP CAMERA
  const cscale = 8
  camera.position.y = 1 * cscale
  camera.position.x = 2.7 * cscale
  camera.position.z = 0.7 * cscale

  // ADD CONTROLS
  // const controls = new OrbitControls(camera, renderer.domElement)
  const clock = new THREE.Clock()
  const cameraControls = new CameraControls(camera, renderer.domElement)

  renderer.render(scene, camera)
  return { renderer, camera, scene, cameraControls, clock }
}
