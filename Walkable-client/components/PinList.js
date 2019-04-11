import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Switch } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import PinListCard from './PinListCard';
import API from './API';


export default class PinList extends React.Component {

  /// maybe add in a divider line
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.sliderAllcontainer}>
        <Text style={styles.sliderAlltext}>{this.props.pinsAllOn? "Turn off all pins":"Turn on all pins"}</Text>
        <Switch
          onTintColor={Colors.tintColor}
          onValueChange={(value)=>this.props.toggleAllPins(value)}
          value={this.props.pinsAllOn}
          style={styles.sliderAllslider}
        />
      </View>
        {this.props.pins.map(pinInfo=><PinListCard pinInfo={pinInfo} deletePin={this.props.deletePin} togglePinOnOff={this.props.togglePinOnOff} pinOn={this.props.pinsOn.includes(pinInfo.id)}/>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    flexDirection:'column'
  },
  sliderAllcontainer:{
    flex:1,
    justifyContent:'flex-end',
    flexDirection:'row',
    marginRight:15,
    marginTop:5,
    alignItems:'center'
  },
  sliderAlltext:{
    fontWeight:'bold'
  },
  sliderAllslider:{
    transform:[{ scaleX: .7 }, { scaleY: .7 }]
  }
})
