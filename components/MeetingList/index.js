import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const meetings = [
  { id: 1, name: "Team Meeting", time: "1:00 - 1:30 PM" },
  { id: 2, name: "Project Review", time: "2:00 - 3:00 PM" },
  { id: 3, name: "Brainstorming Session", time: "3:30 - 4:00 PM" },
];

const MeetingList = () => {
  const navigation = useNavigation();

  if (meetings.length === 0) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>No meetings scheduled</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10, color: '#efefef' }}>Meetings</Text>
      {meetings.map((meeting, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate('VideoCallingScreen')}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        >
          <Entypo name='calendar' size={24} color={'#efefef'} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#efefef' }}>{meeting.name}</Text>
            <Text style={{ fontSize: 20, color: '#efefef' }}>{meeting.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MeetingList;
