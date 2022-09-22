import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {StarIcon} from 'react-native-heroicons/solid';
import {urlFor} from '../sanity';
import {useNavigation} from '@react-navigation/native';

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white mr-3 shadow">
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <Image source={require('../icons/star.png')} className="h-4 w-4" />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1 mt-2">
          <Image
            source={require('../icons/location.png')}
            className="h-5 w-5"
          />
          <Text className="text-xs text-gray-500">Near by {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
