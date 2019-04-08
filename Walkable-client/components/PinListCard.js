import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Button } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import { Card, Avatar, Badge, Icon, Rating } from 'react-native-elements'
import API from './API'


export default class PinListCard extends React.Component {

  state = {
    loading:true,
  }

  componentDidMount(){
    this.setState({loading:false})
  }

  render() {
    return (
      <Card>
      {this.state.loading?
        <Text>Loading...</Text>
        :
        <View style={styles.cardContentContainer}>
          <View style={styles.cardImageContainer}>
            <Avatar size='medium' rounded title='HL'/>
          </View>
          <View style={styles.cardWordsContainer}>
            <View style={styles.titleNEditContainer}>
              <Text style={styles.pinNameText}> Lo's Home </Text>
              <TouchableOpacity onPress={()=>{}}>
                <Icon name='edit' color={Colors.tabIconDefault} type='material' size={18}/>
              </TouchableOpacity>
            </View>
            <Text style={styles.pinDescriptionText}> Welcome to the boardgame night.</Text>
            <Text style={styles.pinAddressText}> Lon:12.5 | Lat:22.4 </Text>
          </View>
        </View>
      }
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
