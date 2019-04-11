import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Button, Switch } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import { Card, Avatar, Badge, Icon, Rating } from 'react-native-elements'
import API from './API'


export default class PinListCard extends React.Component {

  ///maybe add an undo for delete

  render() {
    return (
      <Card>
        <View style={styles.cardContentContainer}>
          <View style={styles.cardImageContainer}>
            <Avatar size='medium' rounded title={this.props.pinInfo.title.charAt(0)+this.props.pinInfo.title.charAt(1)}/>
          </View>
          <View style={styles.cardWordsContainer}>
            <View style={styles.titleNEditContainer}>
              <Text style={styles.pinNameText}> {this.props.pinInfo.title} </Text>
              <TouchableOpacity onPress={()=>this.props.deletePin(this.props.pinInfo.id)}>
                <Icon name='delete' color={Colors.tabIconDefault} type='material' size={18}/>
              </TouchableOpacity>
            </View>
            <Text style={styles.pinDescriptionText}> {this.props.pinInfo.description} </Text>
            <Text style={styles.pinAddressText}> Lat:{Math.round(this.props.pinInfo.latitude*10000)/10000} | Lon:{Math.round(this.props.pinInfo.longitude*10000)/10000} </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Switch
              onTintColor={Colors.tintColor}
              onValueChange={()=>this.props.togglePinOnOff(this.props.pinInfo.id)}
              value={this.props.pinOn}
              style={styles.slider}
            />
          </View>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  cardContentContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  cardImageContainer:{
    width:'20%',
  },
  cardWordsContainer:{
    width:'65%',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'stretch',
  },
  titleNEditContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  pinNameText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  pinDescriptionText:{
    fontSize: 12,
    color: 'grey'
  },
  pinAddressText:{
    marginTop:5,
    fontSize: 12,
    fontWeight: 'bold',
    color:Colors.tintColor,
  },
  sliderContainer:{
    width:'15%',
    height:50,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  slider:{
    transform:[{ scaleX: .7 }, { scaleY: .7 }]
  }
})
