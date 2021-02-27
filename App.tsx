import React, {ReactNode, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import mapStyle from './mapStyle.json';

const HomeScreen: React.FC = () => {
  const {bottomSheetHeader, startButton, bottomSheetHeaderIcon} = styles;

  const locationMetadata: Region = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [currentLocation, setCurrentLocation]: [
    Region,
    React.Dispatch<React.SetStateAction<Region>>,
  ] = useState(locationMetadata);

  useEffect(() => {
    const handlePermission = async () => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    };

    if (Platform.OS === 'android') {
      handlePermission();
    }

    Geolocation.getCurrentPosition(
      (position: Geolocation.GeoPosition) => {
        setCurrentLocation({
          ...currentLocation,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: Geolocation.GeoError) => {
        Alert.alert(error.message.toString());
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, [currentLocation]);

  const renderContent = (): ReactNode => {
    return (
      <View style={startButton}>
        <TouchableOpacity
          style={{
            backgroundColor: '#0E0F0F',
            padding: 16,
            width: 140,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 60,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicon name="play" size={24} color="#fff" />
            <Text
              style={{
                marginLeft: 8,
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              START
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = (): ReactNode => (
    <View style={bottomSheetHeader}>
      <View style={bottomSheetHeaderIcon} />
    </View>
  );

  const sheetRef: React.Ref<any> = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{...StyleSheet.absoluteFillObject}}
        region={currentLocation}
        showsUserLocation
        customMapStyle={mapStyle}
        showsMyLocationButton={false}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          backgroundColor: 'white',
          width: 48,
          height: 48,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}>
        <MaterialIcon name="my-location" size={24} />
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[600, 200]}
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
  map: {
    flex: 1,
  },
  bottomSheetHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetHeaderIcon: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#efefef',
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: 'white',
    paddingTop: 36,
    height: '100%',
    alignItems: 'center',
  },
});

export default App;
