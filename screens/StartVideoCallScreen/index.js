import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const StartVideoCallScreen = ({ name, roomId, setName, setRoomId, errors,isFormValid, setErrors,setIsFormValid, joinRoom}) => {
const [showErrors, setShowErrors] = useState(false)
const startMeeting = () => {
  setShowErrors(true);
  if (isFormValid) {
    joinRoom();
  }
};
useEffect(() => {
  validateForm();
}, [name, roomId]);

const validateForm = () => {
    let errors = {};
    if (!name || name =='') {
        errors.name = 'Name is required.';
    }
    if (!roomId || roomId == '') {
        errors.roomId = 'Room Id is required.';
    } else if (isNaN(roomId)) {
      errors.roomId = 'Room id must be a number.';
  }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
};
  return (
    <View style={styles.container}>
      <View style={styles.startMeetingContainer}>
        <View style={styles.info}>
          <TextInput
          style={styles.textInput}
          value={name}
          placeholder='Enter name'
          placeholderTextColor='#767476'
          onChangeText={text => setName(text)}
          requi/>
        </View>
        <View style={styles.info}>
          <TextInput
          style={styles.textInput}
          value={roomId}
          placeholder='Enter room id'
          placeholderTextColor='#767476'
          onChangeText={text => setRoomId(text)}/>
        </View>
        <View style={{ height: 40, paddingTop:5 }}>
            {(!isFormValid && showErrors) && Object.values(errors).map((error, index)  => (
                <Text key={index} style={styles.error}>
                    {error}
                </Text>
            ))}
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
          style={styles.startMeetingButton}
          onPress={startMeeting}>
            <Text style={{ color:'white', fontWeight: 'bold', fontSize: 17 }}>
              Start Meeting
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    flex: 1
  },
  info: {
    width: '100%',
    backgroundColor: '#373538',
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#484648',
    padding: 12,
    justifyContent: 'center'
  },
  textInput: {
    color: 'white',
    fontSize: 18
  },
  startMeetingButton: {
    width: 350,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10a37f',
    height: 50,
    borderRadius: 15
  },
  error: {
    color: 'red',
    fontSize: 16,
    paddingStart: 10
  }
});

export default StartVideoCallScreen;
