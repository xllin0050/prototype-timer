import dayjs from 'dayjs';

import { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

export default function Settings({ currentTime, settingTime, addHours, addMinutes, setting }) {
  const [selectedHourDigit, setSelectedHourDigit] = useState(0);
  const [selectedMinuteDigit, setSelectedMinuteDigit] = useState(0);

  const digitOptions = (num) =>
    Array.from(Array(num).keys()).map((_, i) => (
      <Picker.Item label={i.toString()} value={i.toString()} key={i} />
    ));

  useEffect(() => {
    addHours(selectedHourDigit);
  }, [selectedHourDigit]);

  useEffect(() => {
    addMinutes(selectedMinuteDigit);
  }, [selectedMinuteDigit]);
  return (
    <View style={styles.container}>
      <Text>Current:{dayjs(currentTime).format('hh:mm')}</Text>
      <Text>Settings:{dayjs(settingTime).format('hh:mm')}</Text>
      <View style={styles.pickersWrap}>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedHourDigit}
            onValueChange={(itemValue, itemIndex) => setSelectedHourDigit(itemValue)}>
            {digitOptions(4)}
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedMinuteDigit}
            onValueChange={(itemValue, itemIndex) => setSelectedMinuteDigit(itemValue)}>
            {digitOptions(60)}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonsWrap}>
        <View style={styles.button}>
          <Button iconName="circle-check" onPress={() => setting(true)} />
        </View>
        <View style={styles.button}>
          <Button iconName="circle-xmark" onPress={() => setting(false)} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  pickersWrap: {
    flexDirection: 'row',
  },
  picker: {
    width: '50%',
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '30%',
    paddingHorizontal: 8,
  },
});
