import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';


export default class HomeScreenARNavigate extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.backbuttonContainer} onPress={this.props.endNavigate}>
              <BackButtonIcon name='chevron-left'/>
          </TouchableOpacity>
          <Text style={styles.marker}> AR Navigate Page</Text>
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
  marker: {
    marginBottom:300,
    textAlign:'center',
    color:Colors.whiteColor
  },
})
