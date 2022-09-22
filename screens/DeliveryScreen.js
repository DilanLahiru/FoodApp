import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../features/restaurantSlice';
import { useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);


  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={require('../icons/closeWhite.png')} className="h-7 w-7" />
            </TouchableOpacity>
            <Text className="font-normal text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
            <Text className="text-gray-400 text-lg font-medium">Estimated Arrival</Text>
            <Text className="text-4xl font-bold text-black">45-55 Minutes</Text>
            </View>
            <Image source={{
                uri: 'https://links.papareact.com/fls',
            }} className="h-20 w-20"
            />
            </View>
            <Progress.Bar style={30} color="#00CCBB" indeterminate={true}/>

            <Text className="text-gray-500 mt-3 font-semibold">your order at {restaurant.title} is being prepared</Text>

        </View>
      </SafeAreaView>
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={{
        latitude: restaurant.lat,
        longitude: restaurant.long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      className="flex-1 -mt-10 z-0"
      // mapType="standard"
      >
      <Marker coordinate={{
        latitude: restaurant.lat,
        longitude: restaurant.long,
      }}
      pinColor="#00CCBB"
      description={restaurant.short_description}
      identifier="origin"
      title={restaurant.title}
      />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image source={{
          uri: 'https://links.papareact.com/wru',
        }}
        className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">
              Dilan Lahiru
          </Text>
          <Text className="text-gray-400">
            Your Rider
          </Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">
            Call
          </Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen