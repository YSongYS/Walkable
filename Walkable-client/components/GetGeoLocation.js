import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'react-native-maps'


export default class GetGeoLocation extends React.Component {

  state = {
    location:null,
    longitude:null,
    latitude:null,
    error:null
  }

  componentDidMount(){
    this.getLocationAsync()
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location:location,
      longitude:location.coords.longitude,
      latitude:location.coords.latitude
    });
  }

  render(){

    return(
      <View style={styles.pageContainer}>
      <View style={styles.mapContainer}>
        <MapView
          style={{flex: 1}}
          region={{
          latitude: 51.882004,
          longitude: -0.0582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
          }}
        showsUserLocation={true}
      />
      </View>
        <Text> Lat: {this.state.latitude} | Lon: {this.state.longitude} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height:200,
    width:200,
  },
})
