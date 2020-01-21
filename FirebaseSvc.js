import firebase from 'firebase';
import {
  APIKEY,
  AUTHDOMAIN,
  DATABASEURL,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID
} from 'react-native-dotenv';

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyB_9wrBP0ly0xpGrqnGlB8WVQtFurVWNvo',
        authDomain: 'mychatapp-38adc.firebaseapp.com',
        databaseURL: 'https://mychatapp-38adc.firebaseio.com',
        projectId: 'mychatapp-38adc',
        storageBucket: 'mychatapp-38adc.appspot.com',
        messagingSenderId: '196359412221',
        appId: '1:196359412221:web:f04148c1924ae20c746194'
      });
    }
  }

  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  get user() {
    return firebase.auth().currentUser || {};
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  createAccount = async user => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        () => {
          let newUser = firebase.auth().currentUser;
          newUser.updateProfile({ displayName: user.name }).then(
            () => {
              alert('User ' + user.name + ' was created successfully.');
            },
            err => {
              console.warn('Error update displayName');
            }
          );
        },
        err => {
          alert(err.message);
        }
      );
  };
  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = { _id, timestamp, text, user };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = { text, user, createdAt: this.timestamp };
      this.ref.push(message);
    }
  };
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
