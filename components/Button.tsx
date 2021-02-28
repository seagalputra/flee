import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Button = ({ onPress, type }: any) => {
  const pauseButtonContainer = {
    ...styles.buttonContainer,
    backgroundColor: '#DC2626',
  };

  return (
    <TouchableOpacity
      style={type === 'play' ? styles.buttonContainer : pauseButtonContainer}
      onPress={onPress}>
      <View style={styles.button}>
        <Ionicon name={type} size={24} color="#fff" />
        <Text style={styles.buttonTitle}>
          {type === 'play' ? 'START' : 'PAUSE'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTitle: {
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Button;
