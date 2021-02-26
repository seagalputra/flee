import React, {ReactNode} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const HomeScreen: React.FC = ({navigation}: any) => {
  const renderContent = (): ReactNode => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 16,
          height: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 10,
            padding: 16,
            width: '100%',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Details')}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Open Details Screen
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = (): ReactNode => (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <View
        style={{
          width: 40,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#efefef',
          marginBottom: 10,
        }}
      />
    </View>
  );

  const sheetRef: React.Ref<any> = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 200]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </>
  );
};

const DetailsScreen = () => {
  const {text} = styles;

  return (
    <View style={text}>
      <Text>Details Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
