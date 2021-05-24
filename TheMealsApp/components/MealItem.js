import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import DefaultText from './DefaultText';

const MealItem = props => (
  <View style={styles.mealItem}>
    <TouchableOpacity
      style={{flex: 1}}
      onPress={props.onChange.bind(this, props.data.id, props.data.title)}>
      <View style={{flex: 1}}>
        <View style={[styles.mealRow, styles.mealHeader]}>
          <ImageBackground
            source={{uri: props.data.imageUrl}}
            style={styles.bgImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.data.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.mealRow, styles.mealDetail]}>
          <DefaultText>{props.data.duration}m</DefaultText>
          <DefaultText>{props.data.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{props.data.affordability.toUpperCase()}</DefaultText>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: 'row',
  },
  mealItem: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mealHeader: {
    height: '80%',
  },
  mealDetail: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,.7)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});

export default MealItem;
