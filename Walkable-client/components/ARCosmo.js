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

  componentWillMount(){

  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      //
      // Expo.Location.watchHeadingAsync((obj)=>{
      //   let heading = obj.magHeading
      //   this.setState({heading:heading})})
    }
    /// put all the function into AR Cosmo?
    // link backend pins with AR Cosmo loop
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

  getBearing = (lonD1, lonD2, fixD) => {
  	const [lat1, lat2, lon1, lon2] = [this.state.latitude*Math.PI/180, this.state.longitude*Math.PI/180, lonD1*Math.PI/180, lonD2*Math.PI/180]
  	const y= Math.sin(lon2-lon1)*Math.cos(lat2)
  	const x= Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
  	const bearing = Math.atan2(y,x)
  	const correction = bearing - this.state.heading*Math.PI/180
      const ARx = Math.sin(correction)*fixD
      const ARz = Math.cos(correction)*fixD*(-1)
      return [ARx, ARz]
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
      height: 0.1, //Thickness to extrude text
      curveSegments: 12, //Smoothness of curve
    });
    this.textMesh.lookAt(this.camera.position) //Make text always face user to start with
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

    const testX = this.getBearing(51.520300, -0.086712,10)[0]
    const testY = this.getBearing(51.520300, -0.086712,10)[1]
    console.log(testX, testY, this.state.heading, this.state.location)

    this.setupLights()
    this.createText('Flatiron School',0,0,-5,0.1)
    this.createText('The door',2,0,-5,0.1)
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
