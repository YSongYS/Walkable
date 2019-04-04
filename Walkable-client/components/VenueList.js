import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import VenueListCard from './VenueListCard';
import API from './API';


export default class VenueList extends React.Component {

  state = {
    venueIDs:[]
  }

  componentDidMount(){
    API.searchNearby("51.5228","-0.1153",200,5)
      .then(data=>data.response.venues.map(venueData=>venueData.id))
      .then(venueIDs=>this.setState({venueIDs:venueIDs}))
  }

  render() {
    return (
        <ScrollView style={styles.container}>
        {this.state.venueIDs.map(venueID=><VenueListCard foursquareID={venueID}/>)}
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
