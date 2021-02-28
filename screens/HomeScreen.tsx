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
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  Polyline,
  LatLng,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { getPreciseDistance } from 'geolib';

import Button from '../components/Button';

import mapStyle from '../mapStyle.json';

type Location = Region & { coordinates: LatLng[] };

const HomeScreen: React.FC<any> = ({ navigation }: any) => {
  const locationMetadata: Location = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    coordinates: [],
  };

  const [currentLocation, setCurrentLocation]: [
    Location,
    React.Dispatch<React.SetStateAction<Location>>,
  ] = useState(locationMetadata);

  const [distance, setDistance]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = useState(0);

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
          coordinates: [
            ...currentLocation.coordinates,
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ],
        });
      },
      (error: Geolocation.GeoError) => {
        Alert.alert('Location Error', error.message.toString());
      },
      {
        enableHighAccuracy: true,
        useSignificantChanges: true,
        distanceFilter: 0,
        showsBackgroundLocationIndicator: true,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, [currentLocation]);

  const [timer, setTimer]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = useState(0);

  const [isTimerActive, setIsTimerActive]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(Boolean);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  let intervalId: NodeJS.Timeout;
  const onStartTimer = (): void => {
    setIsTimerActive((isActive) => !isActive);

    intervalId = setInterval(() => {
      const distanceLength = getPreciseDistance(
        currentLocation.coordinates[0],
        currentLocation.coordinates[currentLocation.coordinates.length - 1],
      );

      setDistance(distanceLength);
    }, 5000);
  };

  const onResetTimer = (): void => {
    setIsTimerActive(false);
    setTimer(0);
    setDistance(0);

    clearInterval(intervalId);
  };

  const getMinutes = () => Math.floor(timer / 60);
  const getSeconds = () => ('0' + (timer % 60)).slice(-2);

  const toHistory = () => navigation.navigate('History');

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: currentLocation.latitudeDelta,
          longitudeDelta: currentLocation.longitudeDelta,
        }}
        customMapStyle={mapStyle}
        showsMyLocationButton={false}>
        {isTimerActive ? (
          <Polyline
            coordinates={currentLocation.coordinates}
            strokeColor="#0E0F0F"
            strokeWidth={4}
          />
        ) : null}
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}>
          <Ionicon name="location" size={24} />
        </Marker>
      </MapView>
      <View style={styles.menuContainer}>
        <View style={styles.menuDetails}>
          <View>
            <Text style={styles.menuTitle}>Time</Text>
            <Text style={styles.menuBody}>
              {getMinutes()}:{getSeconds()}
            </Text>
          </View>
          <View style={styles.menuSeparator} />
          <View>
            <Text style={styles.menuTitle}>Distance</Text>
            <Text style={styles.menuBody}>
              {distance === 0 ? '--' : distance}
            </Text>
          </View>
          <View style={styles.menuSeparator} />
          <View>
            <Text style={styles.menuTitle}>Calories</Text>
            <Text style={styles.menuBody}>--</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.reloadButton} onPress={onResetTimer}>
            <Ionicon name="reload" size={24} color="#0E0F0F" />
          </TouchableOpacity>
          {!isTimerActive ? (
            <Button onPress={onStartTimer} type="play" />
          ) : (
            <Button onPress={onStartTimer} type="pause" />
          )}
          <TouchableOpacity style={styles.historyButton} onPress={toHistory}>
            <Ionicon name="body" size={24} color="#0E0F0F" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject },
  menuContainer: {
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
  },
  menuDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuTitle: { fontWeight: 'bold', fontSize: 14, color: '#c6c6c6' },
  menuBody: { fontWeight: 'bold', fontSize: 21, color: '#0E0F0F' },
  menuSeparator: {
    borderRightWidth: 1,
    borderRightColor: '#efefef',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
  reloadButton: { marginRight: 36 },
  historyButton: { marginLeft: 36 },
});

export default HomeScreen;
