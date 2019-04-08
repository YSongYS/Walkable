import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CreatePinForm from './../components/CreatePinForm';
import GetGeoLocation from './../components/GetGeoLocation';

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <GetGeoLocation />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  textMarker: {
    height:50,
    backgroundColor:'powderblue',
    textAlign:'center'
  }
})
