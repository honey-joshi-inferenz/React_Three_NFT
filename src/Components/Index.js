import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { VRButton } from './VRButton'
import { isPressed, down, up } from './Movement'
import { Blockchain } from '../Contract/Web3'
import { contractAddress, ABI } from '../Contract/contract'
import Web3 from 'web3'

export const Index = () => {
  const [data, setData] = useState({
    name: '',
    width: '',
    height: '',
    depth: '',
    xAxes: '',
    yAxes: '',
    zAxes: '',
  })
  let name, value
  const handleChange = (e) => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    document.addEventListener('keyup', up)
    document.addEventListener('keydown', down)
  }, [])

  const scene = new THREE.Scene()
  // scene.background = new THREE.Color(0xbfd1e5)
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  )

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  document.body.appendChild(VRButton.createButton(renderer))
  renderer.xr.enabled = true

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  // Geometric figure to be represented in the Metaverse: Cone
  const geometry_cone = new THREE.ConeGeometry(5, 20, 32)
  const material_cone = new THREE.MeshPhongMaterial({ color: 0xed810a })
  const cone = new THREE.Mesh(geometry_cone, material_cone)
  cone.position.set(-10, 5, 0)
  scene.add(cone)

  // Geometric figure to be represented in the Metaverse: Cylinder
  const geometry_cylinder = new THREE.CylinderGeometry(5, 5, 5, 32)
  const material_cylinder = new THREE.MeshPhongMaterial({ color: 0x0000ff })
  const cylinder = new THREE.Mesh(geometry_cylinder, material_cylinder)
  cylinder.position.set(20, 5, 0)
  scene.add(cylinder)

  //plane
  const planeGeo = new THREE.BoxGeometry(100, 0.2, 50)
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeo, planeMaterial)
  scene.add(plane)

  //scene lights
  const ambientLight = new THREE.AmbientLight(0xbda355)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  ambientLight.add(directionalLight)
  scene.add(ambientLight)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)

  camera.position.set(10, 5, 40)

  //animation
  function animate() {
    requestAnimationFrame(animate)
    cone.rotation.x += 0.02
    cone.rotation.y += 0.02

    cylinder.rotation.x += 0.01

    //left key
    if (isPressed(37)) {
      camera.position.x -= 0.5
    }

    //right key
    if (isPressed(39)) {
      camera.position.x += 0.5
    }

    //up key
    if (isPressed(38)) {
      camera.position.x += 0.5
      camera.position.y += 0.5
    }

    //down key
    if (isPressed(40)) {
      camera.position.x -= 0.5
      camera.position.y -= 0.5
    }

    camera.lookAt(plane.position)
    renderer.render(scene, camera)
  }

  animate()

  //mint nft
  function mintNFT() {
    try {
      const name = data.name
      const width = data.width
      const height = data.height
      const depth = data.depth
      const xAxes = data.xAxes
      const yAxes = data.yAxes
      const zAxes = data.zAxes

      console.log('data fetched')

      if (typeof window.ethereum === 'undefined') {
        console.log('install metamask!!!')
        alert('install metamask!!!')
      }

      const web3 = new Web3(window.ethereum)
      const contract = new web3.eth.Contract(ABI, contractAddress)

      console.log('web3 instance')
      web3.eth.getAccounts().then((accounts) => {
        const account = accounts[0]
        console.log(accounts[0], ' ---- account')

        //current supply of NFT Token
        contract.methods
          .mint(name, width, height, depth, xAxes, yAxes, zAxes)
          .send({ from: account })
          .then(() => {
            console.log('NFT minted successfully')
          })
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  //get nft
  Blockchain.then((res) => {
    console.log(res)
    res.building.forEach((building, index) => {
      if (index <= res.supply) {
        const boxGeo = new THREE.BoxGeometry(building.h, building.w, building.d)
        const boxMaterial = new THREE.MeshPhongMaterial({
          color: 0x33ffcc,
        })
        const nft = new THREE.Mesh(boxGeo, boxMaterial)
        nft.position.set(building.x, building.y, building.z)
        scene.add(nft)
      }
    })
  })
  return (
    <div>
      <form onSubmit={mintNFT}>
        <div className="row g-3 p-5">
          <div className="col-sm">
            <label className="form-label">NFT name</label>
            <input
              className="form-control"
              type="text"
              id="nft_name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-sm">
            <label className="form-label">NFT width</label>
            <input
              className="form-control"
              type="number"
              id="nft_width"
              name="width"
              value={data.width}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-sm">
            <label className="form-label">NFT height</label>
            <input
              className="form-control"
              type="number"
              id="nft_height"
              name="height"
              value={data.height}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-sm">
            <label className="form-label">NFT depth</label>
            <input
              className="form-control"
              type="number"
              id="nft_depth"
              name="depth"
              value={data.depth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-sm">
            <label className="form-label">X position</label>
            <input
              className="form-control"
              type="number"
              id="nft_x"
              name="xAxes"
              value={data.xAxes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-sm">
            <label className="form-label">Y position</label>
            <input
              className="form-control"
              type="number"
              id="nft_y"
              name="yAxes"
              value={data.yAxes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-sm">
            <label className="form-label">Z position</label>
            <input
              className="form-control"
              type="number"
              id="nft_z"
              name="zAxes"
              value={data.zAxes}
              onChange={handleChange}
              required
            />
          </div>

          <button id="mint" type="submit" className="btn btn-primary">
            Create a new NFT!
          </button>
        </div>
      </form>
    </div>
  )
}
