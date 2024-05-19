import React from 'react';
import { View, StyleSheet,StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeetingList from '../../components/MeetingList';
import FloatingButton from '../../components/FloatingButton';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: '100%' }}>
        <StatusBar backgroundColor='#1c1c1c' barStyle={'light'}/>
        <MeetingList />
        <FloatingButton />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    padding: 15
  },
});

export default HomeScreen;
