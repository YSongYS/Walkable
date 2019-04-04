import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreenStart from './../components/HomeScreenStart';
import HomeScreenARWalk from './../components/HomeScreenARWalk';
import HomeScreenARNavigate from './../components/HomeScreenARNavigate';
import Colors from '../constants/Colors';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    walkStart:false,
    navigateStart:false
  }

  startWalking = () => this.setState({walkStart:true,})
  endWalking = () => this.setState({walkStart:false})

  startNavigate = () => {this.setState({navigateStart:true})}
  endNavigate = () => {this.setState({navigateStart:false})}


  render() {
    return (
      <View style={styles.container} >
        {this.state.navigateStart && <HomeScreenARNavigate endNavigate={this.endNavigate}/>}
        {!this.state.navigateStart && this.state.walkStart && <HomeScreenARWalk endWalking={this.endWalking} startNavigate={this.startNavigate}/>}
        {!this.state.navigateStart && !this.state.walkStart && <HomeScreenStart startWalking={this.startWalking}/>}
      </View>
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
