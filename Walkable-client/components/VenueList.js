import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import VenueListCard from './VenueListCard';
import VenueDetailCard from './VenueDetailCard';
import API from './API';
import SeedData from './../constants/RoadTestSearchNearByData'


export default class VenueList extends React.Component {

  state = {
    venueIDs:[],
    venueClicked:false,
    venueInfo:{},
  }

  showVenue = (venueInfo) => {
    this.setState({
      venueClicked:true,
      venueInfo:{...venueInfo}
    })
  }

  unshowVenue = () => {
    this.setState({
      venueClicked:false,
      venueInfo:{}
    })
  }

  render() {
    const venueIDs = this.props.savedList? [...this.props.likedIDs]:[...this.props.listofAR]

    return (
      <ScrollView>
      <View style={styles.container}>
      {this.state.venueClicked?
        <VenueDetailCard
          venueInfo={this.state.venueInfo}
          unshowVenue={this.unshowVenue}
          userliked={this.props.likedIDs.includes(this.state.venueInfo.foursquareID)}
          toggleLike={this.props.toggleLike}
        />
        :
        <View style={styles.container}>
        {venueIDs.filter(venueID=>!!SeedData.venueDetails[venueID]).map(venueID=>{
          return (<VenueListCard
            foursquareID={venueID}
            showVenue={this.showVenue}
            userliked={this.props.likedIDs.includes(venueID)}
            toggleLike={this.props.toggleLike}
          />)
        }
        )}
        </View>
      }
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
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
    // color:Colors.whiteColor,
    paddingBottom:5,
  },
  marker: {
    marginBottom:300,
    textAlign:'center',
    // color:Colors.whiteColor
  },
})
