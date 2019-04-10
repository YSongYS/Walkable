import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import PinListCard from './PinListCard';
import API from './API';


export default class PinList extends React.Component {

  state = {
    pins:[]
  }

  deletePin = (pinId) => {
    API.deletePin(pinId)
      .then(res=>{
        if (res){
          API.getPins(this.props.userId)
            .then(pins=>this.setState({pins:pins}))
        }
      })
  }

  componentDidMount(){
    API.getPins(this.props.userId)
      .then(pins=>this.setState({pins:pins}))
  }

  /// maybe add in a divider line
  render() {
    return (
      <View style={styles.container}>
        {this.state.pins.map(pinInfo=><PinListCard pinInfo={pinInfo} deletePin={this.deletePin}/>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    flexDirection:'column'
  },
})
