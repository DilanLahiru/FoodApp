import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {urlFor} from '../sanity';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            className="absolute top-5 left-3 p-2 bg-gray-100 rounded-full"
            onPress={navigation.goBack}>
            <Image source={require('../icons/left.png')} className="h-6 w-6" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require('../icons/star.png')}
                  className="h-4 w-4"
                />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <Image
                  source={require('../icons/location.png')}
                  className="h-5 w-5"
                />
                <Text className="text-gray-500 text-xs font-semibold">
                  Near by . {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 text-xs mt-2 pb-4 font-semibold">
              {short_description}
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-200">
            <Image source={require('../icons/faq.png')} className="h-5 w-5" />
            <Text className="pl-2 flex-1 text-sm font-bold">
              Have a food allergy?
            </Text>
            <Image
              source={require('../icons/forward64.png')}
              className="h-5 w-5"
            />
          </TouchableOpacity>
        </View>
        {/*Menu Section*/}
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {dishes.map(dish => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
