import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Button } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import { Card, Avatar, Badge, Icon, Rating } from 'react-native-elements'
import API from './API'


export default class VenueListCard extends React.Component {

  state = {
    name:'Hopper',
    category:'Coffee shop',
    price:5,
    rating:2.0,
    reviews:0,
    distance:10,
    address:'4 Roger St, London',
    photo:'http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif',
    detailedCard:{},
    loading:true
  }

  componentDidMount(){
    API.getVenueDetail(this.props.foursquareID)
      .then(data=>{return data.response.venue})
      .then(venueInfo=>{this.setState({
        name:venueInfo.name,
        category:venueInfo.categories[0].name,
        price:(!!venueInfo.price && venueInfo.price.tier)*1,
        reviews:(!!venueInfo.ratingSignals && venueInfo.ratingSignals)*1,
        rating:(!!venueInfo.rating && venueInfo.rating)/8*5,
        distance:10,
        address:venueInfo.location.address,
        photo:!!venueInfo.photos.groups[1]? `${venueInfo.photos.groups[1].items[0].prefix}300x500${venueInfo.photos.groups[1].items[0].suffix}`:this.state.photo
      },console.log(this.state))})
  }

  render() {
    return (
      <Card>
        <View style={styles.cardContentContainer}>
          <View style={styles.cardImageContainer}>
          <Avatar rounded source={{uri: this.state.photo}}
                  style={styles.cardImage} />
          </View>
          <View style={styles.cardWordsContainer}>
            <View style={styles.titleNPriceContainer}>
              <Text style={styles.venueNameText}> {this.state.name}</Text>
              <Icon name='heart' color={Colors.heartColor} type='font-awesome' size={18}/>
            </View>
            <Text style={styles.venueCategoryText}> {this.state.category} ({"£".repeat(this.state.price)})</Text>
            <Rating readonly ratingCount={5} fractions={1} startingValue={this.state.rating} imageSize={18} style={styles.ratingStyle}/>
            <Text style={styles.venueAddressText}> {this.state.distance}m | {this.state.address} </Text>
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
    width:'30%',
  },
  cardImage:{
    height:90,
    width:'100%',
  },
  cardWordsContainer:{
    width:'65%',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'stretch',
    // backgroundColor:'green',

  },
  titleNPriceContainer:{
    // backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  venueNameText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  venueCategoryText:{
    fontSize: 14,
    color: 'grey'
  },
  venueDistanceText:{
    fontSize: 14,
  },
  venueAddressText:{
    fontSize: 14,
  },
  ratingStyle:{
    alignItems:'flex-start',
    paddingTop:5,
    paddingLeft:2,
    marginBottom:3,
  },
})
