import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, TouchableHighlight, Keyboard, TouchableOpacity, Modal, Alert } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import { Input, Icon } from 'react-native-elements';
import API from './API';

////Testing ground for location, heading
export default class GetLocation extends React.Component {
/// NEeed to fiux the keybaord issue
  state = {
    location:null,
    longitude:null,
    latitude:null,
    heading:null,
    errorMessage: null,
    loading:true
  }

  componentWillMount(){
    this.getLocationAsync()
  }


  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    else {
      /// this is continously watching, take it out to have just one value?
      Expo.Location.watchHeadingAsync((obj)=>{
        let heading = obj.magHeading
        this.setState({heading:heading})
      }
      )
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

  getBearing = (latD2, lonD2, fixD) => {
    const headingCorrection = -105*Math.PI/180
    const [lat1, lon1, lat2, lon2] = [this.state.latitude*Math.PI/180, this.state.longitude*Math.PI/180, latD2*Math.PI/180, lonD2*Math.PI/180]
    const y= Math.sin(lon2-lon1)*Math.cos(lat2)
    const x= Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
    const bearing = Math.atan2(y,x)
    const bearingD = bearing*180/Math.PI
    console.log(this.state.heading, headingCorrection, bearing)
    const correction = bearing - (this.state.heading*Math.PI/180+headingCorrection)
    const ARx = Math.sin(correction)*fixD
    const ARz = Math.cos(correction)*fixD*(-1)
    console.log(ARx, ARz, bearingD)
    return [ARx, ARz, bearingD]
  }

  ///////////////get angles //////////
  getBearingAngle = (latD2, lonD2) => {
    let correction = 45 /// for demo day. too many laptops and wrong heading
    let realHeading = this.state.heading-correction
    if (realHeading > 180) { realHeading = realHeading - 360}

    const [lat1, lon1, lat2, lon2] = [this.state.latitude*Math.PI/180, this.state.longitude*Math.PI/180, latD2*Math.PI/180, lonD2*Math.PI/180]
    const y= Math.sin(lon2-lon1)*Math.cos(lat2)
    const x= Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
    let bearing = Math.atan2(y,x)
    // if (bearing<0) {bearing += 2*Math.PI}
    let angle = bearing*180/Math.PI - realHeading
    if (angle > 180) { angle = angle - 360 }
    if (angle < -180) { angle = angle + 360 }

    return angle
  }

  ///////////number in each direction /////////////
  getNavigateReading = (bearingAngle) => {
    // const up=[]; const left=[]; const right=[];
    // this.props.venues.map(venue=>{
    //   const bearingAngle = this.getBearingAngle(venue.latitude, venue.longitude)
      if (bearingAngle>=-45 && bearingAngle<=45) {
        return 'up'
      } else if (bearingAngle>=45 && bearingAngle<=135){
        return 'right'
      } else if (bearingAngle<=-45 && bearingAngle>=-135){
        return 'left'
      } else {return ;}
    }
  // )
    // return [up, right, left]
  // }


  render(){
    let targetLat = 51.520684
    let targetLon = -0.087982
    const angle = this.getBearingAngle(targetLat, targetLon)
    const direction = this.getNavigateReading(angle)

    return(
      <>
      {this.state.loading? null:
        <View style={styles.pageContainer}>
        <Text style={{color:'white'}}> Heading: {this.state.heading}</Text>
        <Text style={{color:'white'}}> Bearing: {angle}</Text>
        <Text style={{color:'white'}}> Direction: {direction}</Text>
        </View>
      }
      </>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryTintColor
  },
})
