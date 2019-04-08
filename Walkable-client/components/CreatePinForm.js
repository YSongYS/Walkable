import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements'
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import API from './API';

export default class CreatePinForm extends React.Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.userProfileContainer}>

        </View>
        <View style={styles.banner}></View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom:20,
  },
  userProfileContainer: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height:350,
    backgroundColor:Colors.secondaryTintColor
  },
  userPhoto:{
    marginTop:65
  },
  banner:{
    position:'absolute',
    top:350,
    width:'100%',
    height:15,
    backgroundColor:Colors.tintColor,
  },
  nameText:{
    marginTop:15,
    color:Colors.whiteColor,
    fontSize:30,
    fontWeight:'bold'
  },
  fakeButton: {
    width:'12%',
    marginTop: 10,
    height:20,
    backgroundColor: Colors.tintColor,
    borderRadius:5,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  fakeButtonText:{
    color:Colors.whiteColor,
    fontSize:10,
  },
})
