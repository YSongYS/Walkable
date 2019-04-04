import React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { BackButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import { Card, Avatar, Badge, Icon, Rating, Divider } from 'react-native-elements'


export default class VenueListCard extends React.Component {

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <TouchableOpacity style={styles.backbuttonContainer} onPress={this.props.endWalking}>
          <BackButtonIcon name='chevron-left'/>
        </TouchableOpacity>
        <View style={styles.bigHeartContainer}>
          <Icon name='heart' color={Colors.heartColor} type='font-awesome' size={30}/>
        </View>
        <View style={styles.bigPhotoContainer}>
          <Image source={{uri: 'https://3.bp.blogspot.com/-HVg2s0BnLGI/WVkmtegVYZI/AAAAAAAARqw/EglVRqxsn2g_WlwyoFVFR2b1wD7Ty0QCgCEwYBhgL/s1600/IMG_2771.JPG'}}
                style={styles.photoItself}
          />
          <View style={styles.banner}>
          </View>
        </View>
        <Text style={styles.bigVenueName}>Hopper Coffee Shop</Text>
        <Rating readonly ratingCount={5} fractions={1} startingValue={4.5} imageSize={25} style={styles.bigRatingStyle}/>
        <View style={styles.sameLine}>
          <Text style={styles.detailedBoldText}>Price:</Text>
          <Text style={styles.detailedText}>£££££</Text>
        </View>
        <View style={styles.sameLine}>
          <Text style={styles.detailedBoldText}>Address:</Text>
          <Text style={styles.detailedText}>20 Roger St. London</Text>
        </View>
        <View style={styles.sameLine}>
          <Text style={styles.detailedBoldText}>Visits:</Text>
          <Text style={styles.detailedText}>2,043</Text>
        </View>
          <Text style={styles.detailedBoldText}>Opening Hours:</Text>
          <Text style={styles.detailedWeekDayText}>Monday-Friday: 9am-6pm</Text>
          <Text style={styles.detailedWeekDayText}>Saturday: closed</Text>
          <Text style={styles.detailedWeekDayText}>Sunday: 11am-6pm</Text>
        <View style={styles.tipsContainer}>
          <Text style={styles.detailedBoldText}>Tips: </Text>
          <Card>
            <Text titleStyle={styles.detailedText}>This place has amazing banana bread</Text>
          </Card>
          <Card>
            <Text titleStyle={styles.detailedText}>Love the vibe</Text>
          </Card>
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
