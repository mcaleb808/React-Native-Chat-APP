import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSvc from '../FirebaseSvc';

export default class ChatScreen extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    firebaseSvc.refOn(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    });
  }

  get user() {
    return {
      name: firebaseSvc.user.displayName,
      _id: firebaseSvc.user.uid
    };
  }

  render() {
    return (
      <GiftedChat
        onSend={firebaseSvc.send}
        messages={this.state.messages}
        user={this.user}
      />
    );
  }
}
