import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, TouchableHighlight, Keyboard, TouchableOpacity, Modal, Alert } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import { Input, Icon } from 'react-native-elements';
import API from './API';


export default class GetLocation extends React.Component {
/// NEeed to fiux the keybaord issue
  state = {
    location:null,
    longitude:null,
    latitude:null,
    heading:null,
    errorMessage: null,
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
      // Expo.Location.watchHeadingAsync((obj)=>{
      //   let heading = obj.magHeading
      //   this.setState({heading:heading})
      // }
      // )
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
    });
  }


  render(){
    let coords = JSON.stringify(this.state.location)
    return(
      <View style={styles.pageContainer}>
      <Text> heading: {this.state.heading}</Text>
      <Text> geo: {this.state.latitude}</Text>
      </View>
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
