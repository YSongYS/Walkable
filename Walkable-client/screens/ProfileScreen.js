import React from 'react';
import UserProfile from './../components/UserProfile';
import PinList from './../components/PinList';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header:null
  };

  render() {
    return(
      <ScrollView>
      <View style={styles.container}>
        <UserProfile />
        <PinList userId={this.props.screenProps.userId}/>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
})
