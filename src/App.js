import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Detect, Explain } from './views';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Explain" component={Explain} />
          <Stack.Screen name="Detect" component={Detect} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
