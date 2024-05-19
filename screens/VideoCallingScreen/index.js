import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const VideoCallingScreen = () => {
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const mockTranscript = [
      "Speaker 1: Hello, how are you today?",
      "Speaker 2: I'm doing well, thank you. How about you?",
      "Speaker 1: I'm good, thanks for asking.",
    ];
    const interval = setInterval(() => {
      setTranscript(prevTranscript => [mockTranscript[prevTranscript.length % mockTranscript.length], ...prevTranscript]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const navigation = useNavigation();
  const [isMuted, setIsMuted] = useState(false);
  const [isFront, setIsFront] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    setIsFront(!isFront);
  };

  return (
    <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.activeUsersContainer}>
            <View style={styles.cameraContainer}>
              {/* <Camera
              // type={'front'}
              style={{ width: activeUsers.length <=1 ? '100%' : 200,
              height: activeUsers.length <=1 ? 600 : 200, }}>
              </Camera> */}
                  <View style={styles.activeUserContainer}>
                    <Text style={{ color: 'white' }}>Sahar</Text>
                  </View>
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
                    navigation.navigate('Home');
                  }}>
                <MaterialIcons name='call-end' size={24} color={'#efefef'} />
                <Text style={styles.textTile}>End Call'</Text>
              </TouchableOpacity>
          </View>
      </SafeAreaView>
      </View>
  );
};

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
    justifyContent: 'star',
    alignItems: 'flex-end'
  },
  activeUserContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },script: {
    position: 'absolute',
    bottom: 70,
    height:70,
    zIndex: 999,
    flexGrow: 1,
    padding: 10,
  },
  transcriptLine: {
    color: 'white'
  }
});

export default VideoCallingScreen;
