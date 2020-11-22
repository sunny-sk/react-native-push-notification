import React, {useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './NotiService';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
const App = () => {
  const notif = new NotifService();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(show);
    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);

  const show = async (remoteMessage) => {
    try {
      console.log('show -> remoteMessage', remoteMessage);
      notif.localNotif();
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log('already present', fcmToken);
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token

          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Example app react-native-push-notification
      </Text>
      <View style={styles.spacer}></View>

      <View style={styles.spacer}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.localNotif();
        }}>
        <Text>Local Notification (now)</Text>
      </TouchableOpacity>

      <View style={styles.spacer}></View>

      <View style={styles.spacer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
