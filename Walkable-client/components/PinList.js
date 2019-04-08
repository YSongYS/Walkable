import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { BackButtonIcon, NavigateButtonIcon } from './AppIcons';
import Colors from '../constants/Colors';
import PinListCard from './PinListCard';
import API from './API';


export default class PinList extends React.Component {

  state = {
  }

  componentDidMount(){
  }

  /// maybe add in a divider line
  render() {
    return (
      <View style={styles.container}>
        <PinListCard/>
        <PinListCard/>
        <PinListCard/>
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
