import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import API from './API'

import Colors from '../constants/Colors';
import { Input } from 'react-native-elements'
import { BackButtonIcon } from './AppIcons';

export default class LoginForm extends React.Component {

  state = {
    email:'',
    password:'',
    errorMessage:'',
  }

  logInFetchBackend = () => {
    API.logIn({email: this.state.email, password: this.state.password})
      .then(feedback=>{
        console.log(feedback)
        if (!!feedback){
          this.props.loggingIntoApp(feedback.id, feedback.name)
        }
        else {
          this.setState({errorMessage:'Invalid password or email'})
        }
      })
  }

  render(){
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground source={{uri: "https://i.lensdump.com/i/hAheZ.jpg"}} style={styles.pageContainer}>
        <View style={styles.formContainer}>
          <Input placeholder='Email' onChangeText={text=>this.setState({email:text})} />
          <Input
            placeholder='Password'
            onChangeText={text=>this.setState({password:text})}
            secureTextEntry={true}
            errorStyle={{color:'red'}}
            errorMessage={this.state.errorMessage}
          />
        </View>
        <TouchableOpacity onPress={this.logInFetchBackend} style={styles.fakeButton}>
          <Text style={styles.fakeButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.toggleSignupLogin}>
          <Text style={styles.altButtonText}>Sign up</Text>
        </TouchableOpacity>
      </ImageBackground>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width:'80%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius:10,
    height:130,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:20,
    justifyContent:'flex-start'
  },
  fakeButton: {
    width:'80%',
    marginTop: 20,
    height:35,
    backgroundColor: Colors.tintColor,
    borderRadius:5,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  fakeButtonText:{
    color:Colors.whiteColor,
    fontSize:18,
    fontWeight:'bold'
  },
  altButtonText:{
    color:Colors.whiteColor,
    fontSize:14,
    marginTop:15,
    textDecorationLine:'underline'
  },
})
