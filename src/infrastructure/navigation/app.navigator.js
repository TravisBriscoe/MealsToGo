import React, { useContext } from "react";
import { Text, Button } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { MainView } from "../../components/utilities/safe-area.component";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../..//services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <MainView>
      <Text>Settings</Text>
      <Button title="Logout" onPress={() => onLogout()} />
    </MainView>
  );
};

const TAB_ICON = {
  Restaurants: "fast-food",
  Maps: "map",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Maps" component={MapScreen} />
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </>
  );
};
