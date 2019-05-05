import Firebase from 'firebase';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import RegisterScreen from './screen/RegisterScreen.js';
import WelcomeScreen from './screen/WelcomeScreen.js';
import LoadingScreen from './screen/LoadingScreen.js';
import LoginScreen from './screen/LoginScreen.js';
import NewsScreen from './screen/NewsScreen.js';
import { firebaseConfig } from './consts';
import BalanceScreen from './screen/BalanceScreen.js';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import LogoutScreen from './screen/LogoutScreen';

const TabNavigator = createBottomTabNavigator({
  New: NewsScreen,
  balance: BalanceScreen,
  Logout: LogoutScreen
},
{
  tabBarOptions: {
    labelStyle: { fontSize: 12 },
  },
  navigationOptions: {
    header: null
  },
  swipeEnabled: false,
})

const MainNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  Loading: LoadingScreen,
  Main: TabNavigator
},
{
  navigationOptions: {
    tabBarVisible: false
  },
  swipeEnabled: false,
  lazy: true,
  initialRouteName: 'Loading'
})
const MainContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {

  store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  componentWillMount() {
    Firebase.initializeApp(firebaseConfig)
  }

  render() {
    return ( 
      <Provider store={this.store}>
        <View style={styles.container}>
          <MainContainer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
