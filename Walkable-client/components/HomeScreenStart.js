import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { HomePageIcon } from './AppIcons';
import Colors from '../constants/Colors';


export default class HomeScreenStart extends React.Component {

  render() {
    return (
        <View>
          <TouchableOpacity onPress={this.props.startWalking}>
            <Text style={styles.textMarker}>
            <HomePageIcon style={styles.homepageIcon} name='send-o'/>
            </Text>
          </TouchableOpacity>
          <Text style={styles.slogan}> Start a new walk </Text>
          <Text style={styles.instruction}>put in a blinking instruction of arrow later</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  homepageIcon: {
    textAlign:'center',
    marginBottom:20,
  },
  textMarker: {
    textAlign:'center',
    // backgroundColor:'gray'
  },
  slogan:{
    textAlign:'center',
    marginTop:20,
    // backgroundColor:'blue',
    fontSize:32,
    color:Colors.whiteColor
  },
  instruction:{
    textAlign:'center',
    marginTop:0,
    fontSize:8,
    height:20,
    color:Colors.whiteColor
  },
})
