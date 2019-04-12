import React from 'react';
import * as Expo from 'expo';
import { Constants, Location, Permissions } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Fragment } from 'react-native';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import { View as GraphicsView } from 'expo-graphics';
import TextMesh from './TextMesh';
import Colors from '../constants/Colors';

export default class ARCosmo extends React.Component {

  state = {
    location:null,
    longitude:null,
    latitude:null,
    heading:null,
    errorMessage: null,
    loading:true,
  }

  componentDidMount() {
    // Location async for location and heading
    this.getLocationAsync()

    THREE.suppressExpoWarnings(true)
    ThreeAR.suppressWarnings()
  }

  render() {
    return (
      <>
      {this.state.loading? null:
        <View style={styles.container}>
        <GraphicsView
          style={styles.containerFlex}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          isArRunningStateEnabled
          isArCameraStateEnabled
        />
        <TouchableOpacity style={styles.backbuttonContainer} onPress={this.props.endWalking}>
            <BackButtonIcon name='chevron-left'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigatebuttonContainer} onPress={this.props.startNavigate}>
            <Text style={styles.navigateText}>Navigate me</Text>
        </TouchableOpacity>
        </View>
      }
      </>
    )
  }


///////////////////////////////////////////////////////////// Location and hading ///////////////////////////////////////////////////////////////


  ////// Get Location and Heading of the phone
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }
    let location = await Location.getCurrentPositionAsync({});
    let heading = await Location.getHeadingAsync({})
    this.setState({
      heading:heading.trueHeading,
      location:location,
      longitude:location.coords.longitude,
      latitude:location.coords.latitude,
      loading:false
    });
  }


  ////// get bearing direction between point 1 and point 2
  getBearing = (latD2, lonD2, arDistance) => {
    const headingCorrection = -105*Math.PI/180
    const [lat1, lon1, lat2, lon2] = [this.state.latitude*Math.PI/180, this.state.longitude*Math.PI/180, latD2*Math.PI/180, lonD2*Math.PI/180]
    const y= Math.sin(lon2-lon1)*Math.cos(lat2)
    const x= Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
    const bearing = Math.atan2(y,x)
    const bearingD = bearing*180/Math.PI
    const correction = bearing
    // const correction = bearing - (this.state.heading*Math.PI/180+headingCorrection)
    console.log('x', Math.sin(correction), 'y', Math.cos(correction)*(-1))
    const ARx = Math.sin(correction)*arDistance
    const ARz = Math.cos(correction)*arDistance*(-1)
    return [ARx, ARz]
  }

  /////// get distance between piont 1 and point 2
  getDistance = (latD2, lonD2) => {
    const r= 6371000 // metres
    const latR1= this.state.latitude*Math.PI/180
    const latR2= latD2*Math.PI/180
    const dLatR= (latD2-this.state.latitude)*Math.PI/180
    const dLonR= (lonD2-this.state.longitude)*Math.PI/180
    const a= Math.sin(dLatR/2) * Math.sin(dLatR/2) +
           Math.cos(latR1) * Math.cos(latR2) *
           Math.sin(dLonR/2) * Math.sin(dLonR/2)
    const c= 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d= r * c
    return d
  }


///////////////////////////////////////////////////////////// AR world ///////////////////////////////////////////////////////////////

  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({gl, pixelRatio, width, height})
    //* this.renderer.setClearColor(0xffffff, 1.0)

    // This will create a camera texture and use it as the background for our scene
    this.scene = new THREE.Scene()
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer)
    // EXPO: Now we make a camera that matches the device orientation. Ex: When we look down this camera will rotate to look down too!
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000)

    this.setupLights()
    // rendering all words
    const minARSize = 1
    const maxARSize = 10
    let arFence = 500
    this.props.pins.map(pin=>{
      if (this.props.pinsOn.includes(pin.id)){
        const distance = this.getDistance(pin.latitude, pin.longitude)
        if (distance<=arFence){
          // const arDistance = maxARSize - distance/(arFence/(maxARSize-minARSize))
          // fixed distance, could be adjusted later
          const arDistance = 10
          const [arX, arZ] = this.getBearing(pin.latitude, pin.longitude, arDistance)
          this.createText(pin.title,arX,0,arZ,0.1)
        } else {
          //// long distance direction
        }
      }
    })

    //// testing field
    this.rotates = []
    objecttoRotate = this.createOctahedronBufferGeo(-0.4)
    this.rotates.push(objecttoRotate)
    objecttoRotate = this.createOctahedronBufferGeo(-0.6)
    this.rotates.push(objecttoRotate)

  }

  createOctahedronBufferGeo = (z) => {
    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.OctahedronBufferGeometry(0.1, 0)
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
    })
    // Combine our geometry and material
    let cube = new THREE.Mesh(geometry, material)
    // Place the box 0.4 meters in front of us.
    cube.position.z = z
    // Add the cube to the scene
    this.scene.add(cube)
    return cube
  }

  onResize = ({ x, y, scale, width, height }) => {
    if (!this.renderer) {return}
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(scale)
    this.renderer.setSize(width, height)
  }

  onRender = (delta) => {
    if (this.rotates.length!==0){
      this.rotates.map(object=>{
        object.rotation.x += 2 * delta
        object.rotation.y += 1.5 * delta
      })
    }
    this.renderer.render(this.scene, this.camera)
  }

  ////// Text render component
  createText = (text,x,y,z,size) => {
    this.textMesh = new TextMesh()
    this.textMesh.rotation.y = Math.PI
    this.scene.add(this.textMesh)
    this.textMesh.material = new THREE.MeshPhongMaterial({ color: 0x0000FF }) // color of text
    this.textMesh.update({
      text: text,
      font: require('./../assets/fonts/neue_haas_unica_pro_regular.json'),
      size: size, //Size of text
      height: 0.075, //Thickness to extrude text
      curveSegments: 12, //Smoothness of curve
    });
    // Make text always face user to start with
    const test = new THREE.Vector3(-x,0,-z)
    this.textMesh.lookAt(test)
    ExpoTHREE.utils.alignMesh(this.textMesh, { x:x, y:y, z:z })
  }

  //required for MeshPongMaterial to work
  setupLights = () => {
    let light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(0, 0, -1)
    this.scene.add(light)
    /// Light shining from z and y direction, x direction dark
    let lighta = new THREE.PointLight(0xffffff, 1.5)
    lighta.position.set(0, 100, 90)
    this.scene.add(lighta)
  }

}

////////////////////////////////////////////////////// Styling ////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end',
    flexDirection:'column'
  },
  containerFlex:{
    flex:1,
  },
  backbuttonContainer:{
    position:'absolute',
    top:30,
    left:5,
    height:50,
    width:50,
  },
  navigatebuttonContainer:{
    // backgroundColor:'black',
    position:'absolute',
    bottom:30,
    left:0,
    right:0,
    justifyContent:'center',
    alignItems:'center',
  },
  navigateText:{
    fontSize:25,
    textAlign:'center',
    justifyContent:'center',
    color:Colors.tintColor,
    paddingBottom:5,
    fontWeight:'bold'
  },
})
