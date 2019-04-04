import React from 'react';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

class HomePageIcon extends React.Component {
  render() {
    return (
      <Icon.FontAwesome
        name={this.props.name}
        size={175}
        color={Colors.whiteColor}
      />
    );
  }
}

class BackButtonIcon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name={this.props.name}
        size={50}
        color={Colors.whiteColor}
      />
    );
  }
}

class NavigateButtonIcon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name={this.props.name}
        size={45}
        color={Colors.whiteColor}
      />
    );
  }
}


export {
  TabBarIcon,
  HomePageIcon,
  BackButtonIcon,
  NavigateButtonIcon,

}
