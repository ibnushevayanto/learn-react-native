import React from 'react';
import {Text, View} from 'react-native';

export default function App() {
  return (
    <View
      style={{
        padding: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: 'red',
          width: '20%',
          flex: 1,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          width: '20%',
          height: 100,
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>2</Text>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          width: '20%',
          height: 100,
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>3</Text>
      </View>
    </View>
  );
}
