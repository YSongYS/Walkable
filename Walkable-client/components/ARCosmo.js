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
    this.getLocationAsync()
    THREE.suppressExpoWarnings(true)
    ThreeAR.suppressWarnings()
  }

  componentWillMount(){}

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

  createText = (text,x,y,z,size) => {
    this.textMesh = new TextMesh()
    this.textMesh.rotation.y = Math.PI
    this.scene.add(this.textMesh)
    this.textMesh.material = new THREE.MeshPhongMaterial({ color: 0xffffff })
    this.textMesh.update({
      text: text,
      font: require('./../assets/fonts/neue_haas_unica_pro_regular.json'),
      size: size, //Size of text
      height: 0.075, //Thickness to extrude text
      curveSegments: 12, //Smoothness of curve
    });
    const test = new THREE.Vector3(-x,0,-z)
    this.textMesh.lookAt(test)
    // this.textMesh.lookAt(this.camera.position)
    //Make text always face user to start with
    ExpoTHREE.utils.alignMesh(this.textMesh, { x:x, y:y, z:z })
  }

  //required for MeshPongMaterial to work
  setupLights = () => {
    let light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(0, 0, -1)
    this.scene.add(light)
    let lighta = new THREE.PointLight(0xffffff, 1.5)
    lighta.position.set(0, 100, 90)
    this.scene.add(lighta)
  }

  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    this.renderer = new ExpoTHREE.Renderer({gl, pixelRatio, width, height})
    this.renderer.setClearColor(0xffffff, 1.0)

    this.scene = new THREE.Scene()
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer) // Give scene the same background as the camera
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000)

    this.setupLights()

    const minARSize = 1
    const maxARSize = 10
    let arFence = 500

    this.props.pins.map(pin=>{
      if (this.props.pinsOn.includes(pin.id)){
        console.log('ind')
        const distance = this.getDistance(pin.latitude, pin.longitude)
        if (distance<=arFence){
          console.log(pin.title)
          console.log(distance)
          const arDistance = maxARSize - distance/(arFence/(maxARSize-minARSize))
          console.log(arDistance)
          const [arX, arZ] = this.getBearing(pin.latitude, pin.longitude, arDistance)
          this.createText(pin.title,arX,0,arZ,0.1)
        } else {

        }
      }
    })
  }

  onResize = ({ x, y, scale, width, height }) => {
    if (!this.renderer) {return;}
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
    this.camera.position.set(0, 5, -10)
    this.camera.lookAt(new THREE.Vector3())
  };

  onRender = () => {
    this.renderer.render(this.scene, this.camera);
  };
}

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
