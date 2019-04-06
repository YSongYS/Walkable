import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedIn:false, ///intialize with fale
    signedUp: true, ///intialize with true
    userId: undefined
  };

  toggleSignupLogin = ()=>{
    this.setState({
      signedUp:!this.state.signedUp
    })
  }

  loggingIntoApp = (userId) => {
    this.setState({
      loggedIn: true,
      signedUp: true,
      userId:userId
    })
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
          <AppNavigator userId={this.state.userId}/>
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
