import LoginScreen from './components/LoginScreen';
import ChatScreen from './components/ChatScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';

const Tabs = createMaterialTopTabNavigator({
  Login: LoginScreen,
  SignUP: CreateAccountScreen
});

const Auth = createStackNavigator({
  Tabs,
  LoginScreen: LoginScreen,
  CreateAccountScreen: CreateAccountScreen
});

const Main = createStackNavigator({
  ChatScreen: ChatScreen
});

const Nav = createSwitchNavigator({
  Auth,
  Main
});

const App = createAppContainer(Nav);

export default App;
