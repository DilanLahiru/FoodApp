import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';

const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
      `,
        {id},
      )
      .then(data => {
        setRestaurants(data?.restaurants);
      });
  }, []);

  // console.log(restaurants);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-6 ">
        <Text className="font-bold text-lg">{title}</Text>
        <Image source={require('../icons/right.png')} className="h-7 w-7" />
      </View>

      <Text className="text-xs text-gray-500 px-6">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4 px-2"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        {/*RestaurantCards....*/}

        {restaurants?.map(restaurant => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
