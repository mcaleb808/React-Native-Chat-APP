import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import style from './style';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    headerTitleStyle: {
      color: '#1E90FF'
    }
  };
  state = {
    email: '',
    password: ''
  };

  onPressLogin = async () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    await firebaseSvc.login(user, this.loginSuccess, this.loginFailed);
  };

  loginSuccess = () => {
    console.log('login successful, navigate to chat.');
    this.props.navigation.navigate('ChatScreen', {
      name: this.state.name,
      email: this.state.email
    });
  };
  loginFailed = () => {
    alert('Login failure, Please try again.');
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Email</Text>
        <TextInput
          placeholder="Enter email..."
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
          style={style.input}
        />
        <Text style={style.title}>Password</Text>
        <TextInput
          placeholder="Enter password..."
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
          style={style.input}
        />
        <View style={style.button}>
          <Button title="Login" onPress={this.onPressLogin} color="#FFF" />
        </View>
      </View>
    );
  }
}
