import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Button } from 'react-native';
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
            <Text style={styles.pinAddressText}> Lat:{this.props.pinInfo.latitude} | Lon:{this.props.pinInfo.longitude} </Text>
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
    width:'80%',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'stretch',
  },
  titleNEditContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
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
})
