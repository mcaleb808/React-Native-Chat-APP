import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import style from './style';

export default class CreateAccountScreen extends Component {
  static navigationOptions = {
    title: 'Create Account',
    headerTitleStyle: {
      color: '#1E90FF'
    }
  };

  state = {
    email: '',
    password: '',
    name: '',
    avatar: null
  };

  onPressCreate = async () => {
    try {
      const user = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('create account failed. catch error' + message);
    }
  };

  onChangeTextName = name => this.setState({ name });
  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Name</Text>
        <TextInput
          placeholder="Enter your name..."
          onChangeText={this.onChangeTextName}
          value={this.state.name}
          style={style.input}
        />
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
          secureTextEntry={true}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
          style={style.input}
        />
        <View style={style.button}>
          <Button
            title="Create Account"
            color="white"
            onPress={this.onPressCreate}
          />
        </View>
      </View>
    );
  }
}
