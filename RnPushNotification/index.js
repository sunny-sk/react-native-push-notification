/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NotifService from './NotiService';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // console.log('Message handled in the background!', remoteMessage);
  // const notif = new NotifService();
  // notif.localNotif();
});

AppRegistry.registerComponent(appName, () => App);
