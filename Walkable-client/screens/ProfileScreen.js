import React from 'react';
import UserProfile from './../components/UserProfile';
import PinList from './../components/PinList';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header:null
  };

  render() {
    console.log(this.props.screenProps.userName, this.props.screenProps.pins)
    return(
      <ScrollView>
      <View style={styles.container}>
        <UserProfile userName={this.props.screenProps.userName}/>
        <PinList
          pins={this.props.screenProps.pins}
          pinsOn={this.props.screenProps.pinsOn}
          deletePin={this.props.screenProps.deletePin}
          togglePinOnOff={this.props.screenProps.togglePinOnOff}
          toggleAllPins={this.props.screenProps.toggleAllPins}
          pinsAllOn={this.props.screenProps.pinsOn.length===this.props.screenProps.pins.length}
        />
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
