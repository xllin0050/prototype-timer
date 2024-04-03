import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Button from './components/Button';
import WebWrapper from './components/WebWrapper';

export default function App() {
  const [intoBlack, setIntoBlack] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Button iconName="user-clock" onPress={() => setIntoBlack(true)} />
          <Text style={styles.title}>Now is your happy hour</Text>
        </View>
        <View style={styles.body}>
          <WebWrapper url="https://www.youtube.com/" pause={intoBlack} />
          {intoBlack && <View style={styles.overlay}></View>}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 16,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.8,
  },
});
