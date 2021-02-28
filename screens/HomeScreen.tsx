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
import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';
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

  const toHistory = () => navigation.navigate('History');

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentLocation}
        customMapStyle={mapStyle}
        showsMyLocationButton={false}
        onRegionChange={onRegionChange}>
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
            <Text style={styles.menuBody}>12:24</Text>
          </View>
          <View style={styles.menuSeparator} />
          <View>
            <Text style={styles.menuTitle}>Distance</Text>
            <Text style={styles.menuBody}>13 km</Text>
          </View>
          <View style={styles.menuSeparator} />
          <View>
            <Text style={styles.menuTitle}>Calories</Text>
            <Text style={styles.menuBody}>83</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.reloadButton}>
            <Ionicon name="reload" size={24} color="#0E0F0F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButtonContainer}>
            <View style={styles.startButton}>
              <Ionicon name="play" size={24} color="#fff" />
              <Text style={styles.startButtonTitle}>START</Text>
            </View>
          </TouchableOpacity>
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
  startButtonContainer: {
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
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonTitle: {
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  historyButton: { marginLeft: 36 },
});

export default HomeScreen;
