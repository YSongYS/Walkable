import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import VenueDetailCard from './../components/VenueDetailCard';

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    return (
      <View>
        <VenueDetailCard />
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
