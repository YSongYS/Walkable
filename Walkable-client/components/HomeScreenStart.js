import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { HomePageIcon } from './AppIcons';
import Colors from '../constants/Colors';


export default class HomeScreenStart extends React.Component {

  render() {
    return (
        <View style={styles.startWalkContainer}>
          <TouchableOpacity onPress={this.props.startWalking}>
              <Text style={styles.textMarker}>
                <HomePageIcon style={styles.homepageIcon} name='send-o'/>
              </Text>
          </TouchableOpacity>
          <Text style={styles.slogan}> Start a new walk </Text>
          <View style={styles.modeSelectionContainer}>
              <TouchableOpacity
                onPress={()=>this.props.faceNorth(true)}
                style={{...styles.fakeButton, backgroundColor: this.props.facingNorth? Colors.tintColor: Colors.tabIconDefault}}
              >
                <Text style={styles.fakeButtonText}>North</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>this.props.faceNorth(false)}
                style={{...styles.fakeButton, backgroundColor: this.props.facingNorth? Colors.tabIconDefault: Colors.tintColor}}
              >
                <Text style={styles.fakeButtonText}>Random</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.instructionContainer}>
              {this.props.facingNorth?
                <Text>
                  <Text style={styles.instruction}>
                      For when you have poor magnetometer accuracy (check by taking quick look on Goggle map). Hold phone upright at eye level, and face North (map North or true North, not the magnetic North).
                  </Text>
                </Text>
                :
                <Text>
                  <Text style={styles.instruction}>
                      For when you have an accurate magnetometer (check by taking quick look on Goggle map). Hold phone upright at eye level, and face the direction of walk.
                  </Text>
                </Text>
              }

          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  startWalkContainer:{
    flex:1,
    marginTop:190,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center'
  },
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
  modeSelectionContainer:{
    width:'60%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignContent:'center'
  },
  fakeButton: {
    width:'45%',
    marginTop: 20,
    height:35,
    borderRadius:5,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  fakeButtonText:{
    color:Colors.whiteColor,
    fontSize:16,
  },
  instructionContainer:{
    marginTop:10,
    width:'60%',
    // borderColor:Colors.tintColor,
    // borderWidth:0.5,
    // borderRadius:7,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  instruction:{
    flexWrap:'wrap',
    textAlign:'center',
    marginTop:0,
    fontSize:10,
    height:20,
    color:Colors.whiteColor
  },
})
