import React from "react";

import { Text } from "react-native";

import { BackgroundView } from "../components/account.styles";

const img = "../../../../assets/home_bg.jpg";

export const LoginScreen = () => {
  return (
    <BackgroundView source={require(img)}>
      <Text> Hello World!</Text>
    </BackgroundView>
  );
};
