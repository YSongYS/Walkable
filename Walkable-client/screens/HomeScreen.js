import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ARCosmo from './../components/ARCosmo';
import HomeScreenStart from './../components/HomeScreenStart';
import Colors from '../constants/Colors';
import SeedData from './../constants/RoadTestSearchNearByData'


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    walkStart:false,
    navigateStart:false,
    faceNorth:false
  }

  startWalking = () => this.setState({walkStart:true,})
  endWalking = () => this.setState({walkStart:false})

  startNavigate = () => {this.setState({navigateStart:true})}
  endNavigate = () => {this.setState({navigateStart:false})}

  faceNorth=(status)=>{this.setState({faceNorth:status},()=>console.log(this.state))}


  // WHATs BEING REPLSCED
  // {!this.state.navigateStart && this.state.walkStart && <HomeScreenARWalk endWalking={this.endWalking} startNavigate={this.startNavigate}/>}

  render() {
    ///for street testing purposes. rendering the seeddata
    //Seeded data, can be replaced with any API fetch
    const venues = Object.values(SeedData.searchNearbyResponse.response.venues).map(info=>{
      return {
        id:info.id,
        title:info.name,
        latitude:info.location.lat,
        longitude:info.location.lng,
        category:info.categories[0] && info.categories[0].name,
        rating:!!SeedData.venueDetails[info.id] && SeedData.venueDetails[info.id].response.venue.rating
      }
    })
    const venueIDs = Object.keys(SeedData.venueDetails)

    return (
      <>
        {this.state.navigateStart &&
          <HomeScreenARNavigate
            endNavigate={this.endNavigate}
          />
        }
        {!this.state.navigateStart && this.state.walkStart &&
          <ARCosmo
            userId={this.props.screenProps.userId}
            endWalking={this.endWalking}
            startNavigate={this.startNavigate}
            pins={this.props.screenProps.pins}
            pinsOn={this.props.screenProps.pinsOn}
            facingNorth={this.state.faceNorth}
            venues={venues}
            venueIDs={venueIDs}
            endWalking={this.endWalking}
            toggleLike={this.props.screenProps.toggleLike}
            likedIDs={this.props.screenProps.likedIDs}
          />
        }
        {!this.state.navigateStart && !this.state.walkStart &&
          <View style={styles.container} >
          <HomeScreenStart
            startWalking={this.startWalking}
            faceNorth={this.faceNorth}
            facingNorth={this.state.faceNorth}
          />
          </View>
        }
    </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    backgroundColor:Colors.tintColor,
    alignItems: 'stretch',
  },
})
