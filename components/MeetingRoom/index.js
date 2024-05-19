import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import StartVideoCallScreen from '../../screens/StartVideoCallScreen';
import {Camera} from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {socket} from "../../utils/index";

const MeetingRoom = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [roomId, setRoomId] = useState();
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  const [activeUsers, setActiveUsers] = useState(['Sahar','Majdi'] );
  const [startCamera, setStartCamera] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFront, setIsFront] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    setIsFront(!isFront);
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert ('Access denied');
    }
  }

  const joinRoom = () => {
    __startCamera();
    socket.emit('join-room', { roomId: roomId, userName: name})
  }

  useEffect(()=>{
    socket.on('connection', ()=>console.log('connected'))
    socket.on('all-users', users => {
      setActiveUsers(users)
    })
  }, [])
  
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const mockTranscript = [
      "Majdi: Hello, how are you today?",
      "Sahar: I'm doing well, thank you. How about you?",
      "Majdi: I'm good, thanks for asking.",
    ];
    const interval = setInterval(() => {
      setTranscript(prevTranscript => [mockTranscript[prevTranscript.length % mockTranscript.length], ...prevTranscript]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {startCamera ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.activeUsersContainer}>
            <View style={styles.cameraContainer}>
              {/* <Camera
              // type={'front'}
              style={{ width: activeUsers.length <=1 ? '100%' : 200,
              height: activeUsers.length <=1 ? 600 : 200, }}>
              </Camera> */}
              {activeUsers.filter( user => (user.userName != name)).map((user, index) =>
                  <View key={index} style={styles.activeUserContainer}>
                    <Text style={{ color: 'white' }}>{user}</Text>
                  </View>
              )}
            </View>
          </View>
          <ScrollView style={styles.script}>
            {transcript.map((line, index) => (
              <Text key={index} style={styles.transcriptLine}>{line}</Text>
            ))}
          </ScrollView>
          <View style={styles.menu}>
            <TouchableOpacity
                  style={styles.tile}
                  onPress={toggleMute}>
                <FontAwesome name={isMuted ? 'microphone-slash' : 'microphone'} size={24} color={'#efefef'} />
                <Text style={styles.textTile}>{isMuted ? 'Unmute' : 'Mute'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.tile}
                  onPress={toggleCamera}>
                <MaterialIcons name='flip-camera-android' size={24} color={'#efefef'} />
                <Text style={styles.textTile}>{isFront ? 'Front View' : 'Back View'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.tile}
                  onPress={() =>{
                    setStartCamera(false);
                    setName('');
                    setRoomId('');
                    navigation.navigate('MeetingRoom');
                  }}>
                <MaterialIcons name='call-end' size={24} color={'#efefef'} />
                <Text style={styles.textTile}>End Call'</Text>
              </TouchableOpacity>
          </View>
      </SafeAreaView>
      ) : (
        <StartVideoCallScreen
        name={name}
        setName={setName}
        roomId={roomId}
        setRoomId={setRoomId}
        errors={errors}
        setErrors={setErrors}
        isFormValid={isFormValid}
        setIsFormValid={setIsFormValid}
        joinRoom={joinRoom}
        />
      )}
    </View>
  )
}

export default MeetingRoom;

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#1c1c1c',
    flex: 1
  },
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 70,
    marginTop: 15,
  },
  textTile: {
    color: 'white',
    marginBottom: 10
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cameraContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  activeUsersContainer: {
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeUserContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  script: {
    position: 'absolute',
    bottom: 70,
    height:70,
    zIndex: 999,
    flexGrow: 1,
    padding: 10,
  },
  transcriptLine: {
    color: 'white'
  },
});