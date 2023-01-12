import React, {useEffect} from 'react';
import {View, Button, Alert, Platform} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export default function () {
  useEffect(() => {
    const createKeyHandler = () => {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });
      rnBiometrics.createKeys().then(resultObject => {
        const {publicKey} = resultObject;
        console.log('da public key ', publicKey, Platform.OS);
      });
    };
    createKeyHandler();

    return createKeyHandler;
  }, []);

  const authenticateHandler = async () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const {biometryType} = await rnBiometrics.isSensorAvailable();

    if (
      [
        BiometryTypes.FaceID,
        BiometryTypes.TouchID,
        BiometryTypes.Biometrics,
      ].includes(biometryType)
    ) {
      rnBiometrics.biometricKeysExist().then(resultObject => {
        const {keysExist} = resultObject;

        if (keysExist) {
          rnBiometrics
            .createSignature({
              promptMessage: 'Sign in',
            })
            .then(resultCreateSignature => {
              const {success, signature} = resultCreateSignature;

              if (success) {
                console.log(
                  'your base64 encoded string is ' + signature,
                  Platform.OS,
                );

                Alert.alert(
                  'Success',
                  'your base64 encoded string is ' + signature,
                  [{text: 'Oke', style: 'default'}],
                );
              } else {
                Alert.alert('Failed', 'failed create signature', [
                  {text: 'Oke', style: 'default'},
                ]);
              }
            });
        } else {
          Alert.alert('Failed', 'Keys do not exist or were deleted', [
            {text: 'Oke', style: 'default'},
          ]);
        }
      });
    } else {
      Alert.alert('Failed', 'Device is not supported', [
        {text: 'Oke', style: 'default'},
      ]);
    }
  };

  const simplePromptHandler = async () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const {biometryType} = await rnBiometrics.isSensorAvailable();

    if (
      [
        BiometryTypes.FaceID,
        BiometryTypes.TouchID,
        BiometryTypes.Biometrics,
      ].includes(biometryType)
    ) {
      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm', cancelButtonText: 'Cancel'})
        .then(resultObject => {
          const {success} = resultObject;

          if (success) {
            Alert.alert('Success', 'successful biometrics provided', [
              {text: 'Oke', style: 'default'},
            ]);
          } else {
            Alert.alert('Failed', 'user cancelled biometric prompt', [
              {text: 'Oke', style: 'default'},
            ]);
          }
        })
        .catch(() => {
          Alert.alert('Failed', 'biometrics failed', [
            {text: 'Oke', style: 'default'},
          ]);
        });
    } else {
      Alert.alert('Failed', 'Device is not supported', [
        {text: 'Oke', style: 'default'},
      ]);
    }
  };

  const deleteKeysHandler = () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });

    rnBiometrics.deleteKeys().then(resultObject => {
      const {keysDeleted} = resultObject;

      if (keysDeleted) {
        Alert.alert('Success', 'Successful deletion', [
          {text: 'Oke', style: 'default'},
        ]);
      } else {
        Alert.alert(
          'Failed',
          'Unsuccessful deletion because there were no keys to delete',
          [{text: 'Oke', style: 'default'}],
        );
      }
    });
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Authenticate" onPress={authenticateHandler} />
      <Button title="Delete keys" onPress={deleteKeysHandler} color="red" />
      <Button title="Simple Authenticate" onPress={simplePromptHandler} />
    </View>
  );
}
