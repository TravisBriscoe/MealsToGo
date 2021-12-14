import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import {
  BackgroundView,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from "../components/account.styles";

const img = "../../../../assets/home_bg.jpg";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);

  return (
    <BackgroundView source={require(img)}>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            mode="outlined"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeated Password"
            mode="outlined"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => {
              setRepeatedPassword(text);
            }}
          />
        </Spacer>
        {error && (
          <Spacer size="large">
            <ErrorContainer>
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          </Spacer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              mode="contained"
              icon="email"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </BackgroundView>
  );
};
