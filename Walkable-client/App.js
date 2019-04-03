import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import API from './components/API';
import TestData from './components/FourSquareTestData'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      content:[{name:'nothing'}]
    }
  }

  componentDidMount(){
    this.setState({
      isLoading:false,
      content:[...TestData.johnStSearch]
    })
  }

  render() {
    if (this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>{t his.state.content[93].name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
