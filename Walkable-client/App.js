import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import API from './components/API';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedIn: true, ///intialize with fale, now true for testing
    signedUp: true, ///intialize with true
    userId: 1, ///initialize with undefined, now 1 for testing
    userName: 'Song', ///initialize with undefined, now song for testing
    pins:[],
    pinsOn:[],
    likedIDs:[]
  };

///// comment out for actually log in senario
  componentDidMount(){
    this.fetchBackendData()
  }

  fetchBackendData = () => {
    API.getPins(this.state.userId)
      .then(pins=>this.setState({
        pins:[...pins],
        // pinsOn:pins.map(pin=>pin.id)
      }))

    API.getFavorites(this.state.userId)
      .then(favorites=>this.setState({
        likedIDs:[...favorites]
      }))
  }

  toggleSignupLogin = ()=>{
    this.setState({
      signedUp:!this.state.signedUp
    },this.fetchBackendData)
  }

  loggingIntoApp = (userId, userName) => {
    console.log(userId, userName)
    this.setState({
      loggedIn: true,
      signedUp: true,
      userId:userId,
      userName:userName
    },this.fetchBackendData)
  }

  deletePin = (pinId) => {
    API.deletePin(pinId)
      .then(res=>{
        if (res){
          API.getPins(this.state.userId)
            .then(pins=>this.setState({pins:pins}))
        }
      })
  }

  createPin = (pinInfo) => {
    API.createPin(pinInfo)
      .then((newPin)=>{
        this.setState({pins:this.state.pins.concat(newPin)})
      })
  }

  togglePinOnOff = (pinId) => {
    if (this.state.pinsOn.includes(pinId)){
      this.setState({pinsOn: this.state.pinsOn.filter(pin=>!(pin==pinId))})
    }
    else {
      this.setState({pinsOn: this.state.pinsOn.concat(pinId)})
    }
  }

  toggleAllPins = (value) => {
    if (value) {
      this.setState({pinsOn: this.state.pins.map(pin=>pin.id)})
    }
    else {
      this.setState({pinsOn: []})
    }
  }

  toggleAppLike = (venueID) => {
    if (this.state.likedIDs.includes(venueID)){
      this.setState({
        likedIDs: this.state.likedIDs.filter((id)=>!(id===venueID))
      })
    }
    else {
      this.setState({
        likedIDs: [...this.state.likedIDs, venueID]
      })
    }
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
      API.deleteFavorite(this.state.userId, foursquare_id)
        .then(deletesuccess=>{
            API.getFavorites(this.state.userId)
              .then(favorites=>{this.setState({
                likedIDs:[...favorites]
              })})
        })
    }
    else {
      API.addFavorite(this.state.userId, foursquare_id)
        .then(favorite=>console.log(favorite))
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )}
    else if (!this.state.signedUp){
      return(
        <View style={styles.container}>
          <SignupForm toggleSignupLogin={this.toggleSignupLogin} loggingIntoApp={this.loggingIntoApp}/>
        </View>
      )
    }
    else if (!this.state.loggedIn){
      return(
        <View style={styles.container}>
          <LoginForm toggleSignupLogin={this.toggleSignupLogin} loggingIntoApp={this.loggingIntoApp}/>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator screenProps={{
            userId:this.state.userId,
            userName:this.state.userName,
            pins:this.state.pins,
            pinsOn:this.state.pinsOn,
            deletePin:this.deletePin,
            createPin:this.createPin,
            togglePinOnOff:this.togglePinOnOff,
            toggleAllPins:this.toggleAllPins,
            toggleLike:this.toggleLike,
            likedIDs:this.state.likedIDs
          }} />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
});
