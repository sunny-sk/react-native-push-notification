import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, Alert} from 'react-native';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: (token) => {
    console.log(token);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

const App = () => {
  async function getToken() {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log('already present', fcmToken);
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log(fcmToken);

          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    } catch (error) {}
  }

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

  async function show(remoteMessage) {
    try {
      console.log('show -> remoteMessage', remoteMessage);
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'your-channel-id', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        ticker: 'My Notification Ticker', // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
        smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
        subText: 'This is a subText', // (optional) default: none
        bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
        color: 'red', // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: 'group', // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: 'high', // (optional) set notification priority, default: high
        visibility: 'private', // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

        when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

        messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

        actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

        /* iOS only properties */
        alertAction: 'view', // (optional) default: view
        category: '', // (optional) default: empty string

        /* iOS and Android properties */
        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: 'My Notification Title', // (optional)
        message: 'My Notification Message', // (required)
        userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      });

      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(show);
    return unsubscribe;
  }, []);
  return (
    <>
      <Text>kjhikjhb</Text>
      <Text>kjhikjhb</Text>
      <Text>kjhikjhb</Text>
      <Text>kjhikjshb</Text>
    </>
  );
};

export default App;
