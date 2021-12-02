import React from "react";

import { Text } from "react-native";

export const RestaurantDetails = ({ restaurant }) => {
  return (
    <>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.address}</Text>
      <Text>{restaurant.hours}</Text>
    </>
  );
};
