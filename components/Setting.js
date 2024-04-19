import dayjs from 'dayjs';

import { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

export default function Settings({
  currentTime,
  settingTime,
  addHours,
  addMinutes,
  restore,
  setting,
}) {
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
      <View style={styles.timeDisplay}>
        <Text style={{ fontSize: 18 }}>Current:{dayjs(currentTime).format('hh:mm')}</Text>
        <Text style={{ fontSize: 18 }}>Settings:{dayjs(settingTime).format('hh:mm')}</Text>
      </View>
      <View style={styles.pickersWrap}>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedHourDigit}
            onValueChange={(itemValue, itemIndex) => setSelectedHourDigit(itemValue)}
            style={{ width: 100, backgroundColor: '#EAF2F8' }}>
            {digitOptions(4)}
          </Picker>
          <Text style={{ width: 20, paddingLeft: 8 }}>H</Text>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedMinuteDigit}
            onValueChange={(itemValue, itemIndex) => setSelectedMinuteDigit(itemValue)}
            style={{ width: 100, backgroundColor: '#EAF2F8' }}>
            {digitOptions(60)}
          </Picker>
          <Text style={{ width: 20, paddingLeft: 8 }}>M</Text>
        </View>
      </View>
      <View style={styles.buttonsWrap}>
        <View style={styles.button}>
          <Button
            iconName="circle-check"
            bgColor="#7DCEA0"
            onPress={() => {
              if (selectedHourDigit || selectedMinuteDigit) setting(true);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            iconName="clock"
            bgColor="#F7DC6F"
            onPress={() => {
              restore();
              setSelectedHourDigit(0);
              setSelectedMinuteDigit(0);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            iconName="circle-xmark"
            bgColor="#F1948A"
            onPress={() => {
              setting(false);
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  pickersWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  button: {
    width: '30%',
    paddingHorizontal: 8,
  },
});
