import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
const user = require('../icons/user.png');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`,
      )
      .then(data => {
        setFeaturedCategories(data);
      });
  }, []);

  // console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Delivery Now!</Text>
          <Text className="font-bold text-xl">Current Location</Text>
        </View>
        <Image source={require('../icons/user.png')} className="h-7 w-7" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-5 pb-2 mx-4 px-1">
        <View className="flex-row space-x-2 flex-1 bg-gray-200">
          <Image
            source={require('../icons/search.png')}
            className="h-6 w-6 my-3 ml-3"
          />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Image
          source={require('../icons/adjustment.png')}
          className="h-6 w-6"
        />
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        {/*Categories*/}
        <Categories />
        
        {/*Featured*/}
        {featuredCategories?.map(Category => (
          <FeaturedRow
            key={Category._id}
            id={Category._id}
            title={Category.name}
            description={Category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
