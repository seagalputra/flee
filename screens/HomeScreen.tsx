import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Ionicon from 'react-native-vector-icons/Ionicons';

import mapStyle from '../mapStyle.json';

const HomeScreen: React.FC<any> = ({ navigation }: any) => {
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

    const watchId: number = Geolocation.watchPosition(
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
        useSignificantChanges: true,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, [currentLocation]);

  const onRegionChange = (region: Region) => {
    setCurrentLocation(region);
  };

  const toProfile = () => navigation.navigate('History');

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject }}
        region={currentLocation}
        showsUserLocation
        customMapStyle={mapStyle}
        showsMyLocationButton={false}
        onRegionChange={onRegionChange}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'white',
          height: 200,
          width: '100%',
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          paddingTop: 36,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 24,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{ fontWeight: 'bold', fontSize: 14, color: '#c6c6c6' }}>
              Time
            </Text>
            <Text
              style={{ fontWeight: 'bold', fontSize: 21, color: '#0E0F0F' }}>
              12:24
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: '#efefef',
            }}
          />
          <View>
            <Text
              style={{ fontWeight: 'bold', fontSize: 14, color: '#c6c6c6' }}>
              Distance
            </Text>
            <Text
              style={{ fontWeight: 'bold', fontSize: 21, color: '#0E0F0F' }}>
              13 km
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: '#efefef',
            }}
          />
          <View>
            <Text
              style={{ fontWeight: 'bold', fontSize: 14, color: '#c6c6c6' }}>
              Calories
            </Text>
            <Text
              style={{ fontWeight: 'bold', fontSize: 21, color: '#0E0F0F' }}>
              83
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 28,
          }}>
          <TouchableOpacity style={{ marginRight: 36 }}>
            <Ionicon name="reload" size={24} color="#0E0F0F" />
          </TouchableOpacity>
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
          <TouchableOpacity style={{ marginLeft: 36 }} onPress={toProfile}>
            <Ionicon name="body" size={24} color="#0E0F0F" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({});

export default HomeScreen;
