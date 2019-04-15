import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import VenueList from './../components/VenueList';
import GetOrientation from './../components/GetOrientation';

import SeedData from './../constants/RoadTestSearchNearByData'

export default class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'Saved Venues',
  };

// <VenueList userId={this.props.screenProps.userId} savedList={true}/>
// <GetOrientation />

  render() {

    return (
      <View style={styles.container}>

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
