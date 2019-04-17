import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';


export default class HomeScreenARWalk extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.backbuttonContainer} onPress={this.props.endWalking}>
              <BackButtonIcon name='chevron-left'/>
          </TouchableOpacity>
          <Text style={styles.marker}> AR WALK Page</Text>
          <TouchableOpacity style={styles.navigatebuttonContainer} onPress={this.props.startNavigate}>
              <NavigateButtonIcon name='menu-left'/>
              <Text style={styles.navigateText}>Navigate me</Text>
              <NavigateButtonIcon name='menu-right'/>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end',
    flexDirection:'column'
  },
  backbuttonContainer:{
    position:'absolute',
    top:30,
    left:5,
    height:50,
    width:50,
  },
  navigatebuttonContainer:{
    // backgroundColor:'black',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
  },
  navigateText:{
    fontSize:25,
    textAlign:'center',
    justifyContent:'center',
    color:Colors.whiteColor,
    paddingBottom:5,
  },
  marker: {
    marginBottom:300,
    textAlign:'center',
    color:Colors.whiteColor
  },
})
