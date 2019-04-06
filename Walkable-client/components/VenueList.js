import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import VenueListCard from './VenueListCard';
import VenueDetailCard from './VenueDetailCard';
import API from './API';


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
      ///// delete foursquare_id, user_id from backend favorites Table
    }
    else {
      //// add foursquare_id, user_id to backend favorites Table
    }
  }

  componentDidMount(){
    API.searchNearby("51.5228","-0.1153",200,5)
      .then(data=>data.response.venues.map(venueData=>venueData.id))
      .then(venueIDs=>{this.setState({venueIDs:venueIDs});})

    API.getFavorites(1)
      .then(favorites=>this.setState({likedIDs:[...favorites]}))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      {this.state.venueClicked?
        <VenueDetailCard
          venueInfo={this.state.venueInfo}
          unshowVenue={this.unshowVenue}
          userliked={this.state.likedIDs.includes(this.state.venueInfo.foursquareID)}
          toggleLike={this.toggleLike}
        />
        :
        <ScrollView style={styles.container}>
        {this.state.venueIDs.map(venueID=>{
          return (<VenueListCard
            foursquareID={venueID}
            showVenue={this.showVenue}
            userliked={this.state.likedIDs.includes(venueID)}
            toggleLike={this.toggleLike}
          />)
        }
        )}
        </ScrollView>
      }
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
