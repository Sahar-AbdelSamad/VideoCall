import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}
      onPress={() =>
        navigation.navigate('MeetingRoom')}>
        <MaterialCommunityIcons name='video-plus-outline' size={24} color='#efefef' />
        <Text style={styles.buttonText}>New</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
  },
  button: {
    backgroundColor: '#10a37f',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    color: '#efefef',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10
  },
});

export default FloatingButton;
