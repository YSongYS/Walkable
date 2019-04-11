import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CreatePinForm from './../components/CreatePinForm';
import Colors from './../constants/Colors';

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <CreatePinForm userId={this.props.screenProps.userId} createPin={this.props.screenProps.createPin}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Colors.secondaryTintColor
  },
  textMarker: {
    height:50,
    backgroundColor:'powderblue',
    textAlign:'center'
  }
})
