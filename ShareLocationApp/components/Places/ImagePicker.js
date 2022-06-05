import React, {useState} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {Colors} from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

export default function ({onTakeImage}) {
  const [pickedImage, setPickedImage] = useState(null);
  const takeImageHandler = async () => {
    const image = await launchCamera({
      quality: 0.5,
    });

    if (image?.errorCode === 'permission') {
      return;
    }

    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  };
  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{uri: pickedImage}} />
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
