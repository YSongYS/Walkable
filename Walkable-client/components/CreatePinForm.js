import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, TouchableHighlight, Keyboard, TouchableOpacity, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import { Input, Icon } from 'react-native-elements';
import API from './API';


export default class CreatePinForm extends React.Component {
/// NEeed to fiux the keybaord issue
  state = {
    location:null,
    longitude:0,
    latitude:0,
    error:null,
    pinLongitude:0,
    pinLatitude:0,
    title:null,
    description:null,
    invalidEntry:true,
    formScroll:365,
    formBorder:Colors.secondaryTintColor
  }

  componentWillMount(){
    this.getLocationAsync()
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location:location,
      longitude:location.coords.longitude,
      latitude:location.coords.latitude,
      pinLongitude:location.coords.longitude,
      pinLatitude:location.coords.latitude,
    });
  }

  submitEntry = () => {
    if (!this.state.title) {
      Alert.alert('Woopsy!', 'Title cannot be blank.',[{text: 'OK', onPress: ()=>{}}])
    }
    else if (!this.state.description) {
      Alert.alert('Woopsy!', 'Description cannot be blank.',[{text: 'OK', onPress: ()=>{}}])
    }
    else {
       this.props.createPin({
        user_id:this.props.userId,
        title:this.state.title,
        description:this.state.description,
        latitude:this.state.pinLatitude,
        longitude:this.state.pinLongitude,
      })
      this.setState({
        title:null,
        description:null,
        pinLatitude:this.state.latitude,
        pinLongitude:this.state.longitude,
      })
      Alert.alert('Success', 'Your Headsup Pin has been created!',
      [{text: 'Add another', onPress: ()=>{}},
      {text: 'See my pins', onPress: this.props.goToProfile}]
      )
    }
  }

  handleKeyboard = () => {
    Keyboard.dismiss()
    this.setState({formScroll:365, formBorder:Colors.secondaryTintColor})
  }

  render(){
    return(
      <TouchableWithoutFeedback onPress={this.handleKeyboard} accessible={false}>
      <View style={styles.pageContainer}>
      <View style={styles.mapContainer}>
        <MapView
          style={{flex: 1}}
          mapType={"standard"}
          region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
          }}
        showsUserLocation={true}
        >
        <Marker
          draggable
          coordinate={{
            latitude:this.state.latitude,
            longitude:this.state.longitude
          }}
          onDragEnd={(e)=> this.setState({pinLatitude:e.nativeEvent.coordinate.latitude, pinLongitude:e.nativeEvent.coordinate.longitude})}
        />
        </MapView>
      </View>
      <View style={styles.banner}></View>
      <View style={{...styles.formContainer, top:this.state.formScroll, borderColor:this.state.formBorder}}>
        <Input
          label='Title'
          value={this.state.title}
          labelStyle={styles.inputStyle}
          inputStyle={styles.inputStyle}
          onChangeText={text=>this.setState({title:text, formScroll:200, formBorder:Colors.tintColor})}
        />
        <Input
          label='Description'
          value={this.state.description}
          labelStyle={styles.inputStyle}
          inputStyle={styles.inputStyle}
          onChangeText={text=>this.setState({description:text, formScroll:200, formBorder:Colors.tintColor})}
        />
      </View>
      <TouchableOpacity onPress={this.submitEntry} style={styles.fakeButton}>
        <Icon name='add-location' color={'#db3236'} type='material' size={70}/>
      </TouchableOpacity>

      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.secondaryTintColor
  },
  mapContainer: {
    height:350,
    width:'100%',
  },
  formContainer: {
    position:'absolute',
    marginTop:40,
    paddingBottom:20,
    width:'80%',
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius:10,
    height:175,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:20,
    justifyContent:'space-between',
    backgroundColor:Colors.secondaryTintColor,
    borderWidth:1.5,
  },
  inputStyle:{
    color:Colors.whiteColor,
    paddingLeft:5,
  },
  banner:{
    position:'absolute',
    top:350,
    width:'100%',
    height:15,
    backgroundColor:Colors.tintColor,
  },
  fakeButton: {
    position:'absolute',
    bottom:20,
    width:80,
    height:80,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  alertContainer:{
    position:'absolute',
    top: 100,
    height:200,
    width:'50%',
    backgroundColor:'gray'
  }
})
