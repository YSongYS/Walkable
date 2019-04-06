import React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { BackButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import { Card, Avatar, Badge, Icon, Rating, Divider } from 'react-native-elements'


export default class VenueDetailCard extends React.Component {

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <TouchableOpacity style={styles.backbuttonContainer} onPress={this.props.unshowVenue}>
          <BackButtonIcon name='chevron-left'/>
        </TouchableOpacity>
        <View style={styles.bigHeartContainer}>
        <TouchableOpacity onPress={()=>this.props.toggleLike(this.props.venueInfo.foursquareID)}>
          <Icon name='heart' color={this.props.userliked? Colors.heartColor: Colors.tabIconDefault} type='font-awesome' size={30}/>
        </TouchableOpacity>
        </View>
        <View style={styles.bigPhotoContainer}>
          <Image source={{uri: this.props.venueInfo.photo}}
                style={styles.photoItself}
          />
          <View style={styles.banner}>
          </View>
        </View>
        <Text style={styles.bigVenueName}>{this.props.venueInfo.name}</Text>
        <Rating readonly ratingCount={5} fractions={1} startingValue={this.props.venueInfo.rating} imageSize={25} style={styles.bigRatingStyle}/>
        <View style={styles.sameLine}>
          <Text style={styles.detailedBoldText}>Price:</Text>
          <Text style={styles.detailedText}>{this.props.venueInfo.price===0? "Information unavailable":"£".repeat(this.props.venueInfo.price)}</Text>
        </View>
        <View style={styles.sameLine}>
          <Text style={styles.detailedBoldText}>Address:</Text>
          <Text style={styles.detailedText}>{this.props.venueInfo.address}</Text>
        </View>
        <View style={styles.sameLine}>
          <Text style={styles.detailedBoldText}>Likes:</Text>
          <Text style={styles.detailedText}>{this.props.venueInfo.likes}</Text>
        </View>
          <Text style={styles.detailedBoldText}>Opening Hours:</Text>
          {!this.props.venueInfo.openingHours?
            <Text style={styles.detailedText}>Information unavailable</Text>
            : this.props.venueInfo.openingHours.map((info)=>{
            <Text style={styles.detailedWeekDayText}>{info.days}: {info.open[0].renderedTime}</Text>
          })}
        <View style={styles.tipsContainer}>
          <Text style={styles.detailedBoldText}>Tips: </Text>
          {this.props.venueInfo.tips.length===0 ?
            <Text style={styles.detailedText}>Information unavailable</Text> :
            this.props.venueInfo.tips.map((tip)=><Card><Text titleStyle={styles.detailedText}>{tip.text}</Text></Card>)
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  venueDetailContainer:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'stretch',
  },
  backbuttonContainer:{
    position:'absolute',
    top:5,
    left:3,
    height:50,
    width:50,
    zIndex:99,
  },
  bigHeartContainer:{
    position:'absolute',
    top:10,
    right:3,
    height:50,
    width:50,
    zIndex:99,
  },
  bitPhotoContainer:{
    width:"100%",
    height:300,
  },
  photoItself:{
    width:'100%',
    height:300,
  },
  banner:{
    position:'absolute',
    top:285,
    width:'100%',
    height:15,
    backgroundColor:Colors.tintColor
  },
  bigVenueName:{
    fontSize:32,
    fontWeight:'bold',
    paddingLeft:10,
    paddingTop:10
  },
  bigRatingStyle:{
    alignItems:'flex-start',
    paddingTop:10,
    paddingLeft:10,
  },
  visitCount:{
    fontSize:14,
    paddingLeft:10,
    paddingTop:10,
    color:'gray'
  },
  sameLine:{
    flexDirection:'row'
  },
  detailedText:{
    fontSize:14,
    paddingLeft:10,
    paddingTop:10,
  },
  detailedBoldText:{
    fontSize:14,
    paddingLeft:10,
    paddingTop:10,
    fontWeight:'bold'
  },
  detailedWeekDayText:{
    fontSize:12,
    paddingLeft:20,
    paddingTop:10,
  },
  tipsContainer:{
    marginTop: 20
  }
})
