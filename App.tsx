import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'Running History',
            header: ({ scene, navigation }) => {
              const { options } = scene.descriptor;
              const title =
                options.headerTitle !== undefined
                  ? options.headerTitle
                  : options.title !== undefined
                  ? options.title
                  : scene.route.name;

              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    paddingTop: 24,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 24,
                  }}>
                  <TouchableOpacity onPress={navigation.goBack}>
                    <Ionicon name="arrow-back" size={24} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#0E0F0F',
                      marginLeft: 16,
                    }}>
                    {title}
                  </Text>
                </View>
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
