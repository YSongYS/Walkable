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
    likedIDs:[],
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

  toggleLike = (venueID) => {
    if (this.state.likedIDs.includes(venueID)){
      this.setState({
        likedIDs: this.state.likedIDs.filter((id)=>!(id===venueID))
      }, ()=>this.updateBackendLike(true, venueID))
    }
    else {
      this.setState({
        likedIDs: [...this.state.likedIDs, venueID]
      }, ()=>this.updateBackendLike(false, venueID))
    }
  }

  updateBackendLike = (unlike, foursquare_id) => {
    if (unlike) {
      // can add a delete message later after delete
      API.deleteFavorite(this.props.userId, foursquare_id)
        .then(deletesuccess=>{
          if (deletesuccess && this.props.savedList) {
            API.getFavorites(this.props.userId)
              .then(favorites=>{this.setState({
                likedIDs:[...favorites],
                venueIDs:[...favorites]
              })})
          }
          else if (deletesuccess && !this.props.savedList){
            API.getFavorites(this.props.userId)
              .then(favorites=>this.setState({likedIDs:[...favorites]}))
          }
        })
    }
    else {
      API.addFavorite(this.props.userId, foursquare_id)
        .then(favorite=>console.log(favorite))
    }
  }

  componentDidMount(){
    // savedList fetch favorites list, make liked and venue list the same
    if (this.props.savedList) {
      API.getFavorites(this.props.userId)
        .then(favorites=>{this.setState({
          likedIDs:[...favorites],
          venueIDs:[...favorites]
        })})
    }
    else {
    // nearby list fetch nearby list, AND favorites list
      this.setState({
        venueIDs:[...this.props.listofAR]
      })

      API.getFavorites(this.props.userId)
        .then(favorites=>this.setState({likedIDs:[...favorites]}))
    }
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      {this.state.venueClicked?
        <VenueDetailCard
          venueInfo={this.state.venueInfo}
          unshowVenue={this.unshowVenue}
          userliked={this.state.likedIDs.includes(this.state.venueInfo.foursquareID)}
          toggleLike={this.toggleLike}
        />
        :
        <View style={styles.container}>
        {this.state.venueIDs.filter(venueID=>!!SeedData.venueDetails[venueID]).map(venueID=>{
          return (<VenueListCard
            foursquareID={venueID}
            showVenue={this.showVenue}
            userliked={this.state.likedIDs.includes(venueID)}
            toggleLike={this.toggleLike}
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
