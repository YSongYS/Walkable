import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { TabBarIcon } from '../components/AppIcons';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {activeTintColor:'#008093', inactiveTintColor:'#ccc', labelStyle:{fontSize:12}},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios'? `${focused ? 'home' : 'home-outline'}` : 'md-information-circle'}
    />
  ),
};

const SavedStack = createStackNavigator({
  Saved: SavedScreen,
});

SavedStack.navigationOptions = {
  tabBarLabel: 'Saved',
  tabBarOptions: {activeTintColor:'#008093', inactiveTintColor:'#ccc', labelStyle:{fontSize:12}},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios'? `${focused ? 'heart' : 'heart-outline'}` : 'md-information-circle'}
    />
  ),
};

const CreateStack = createStackNavigator({
  Create: CreateScreen,
});

CreateStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarOptions: {activeTintColor:'#008093', inactiveTintColor:'#ccc', labelStyle:{fontSize:12}},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios'? `${focused ? 'map-plus' : 'map-plus'}` : 'md-information-circle'}
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {activeTintColor:'#008093', inactiveTintColor:'#ccc', labelStyle:{fontSize:12}},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios'? `${focused ? 'face' : 'face'}` : 'md-information-circle'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SavedStack,
  CreateStack,
  ProfileStack,
});
