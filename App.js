import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Button from './components/Button';
import Setting from './components/Setting';
import WebWrapper from './components/WebWrapper';

export default function App() {
  const [intoBlack, setIntoBlack] = useState(false);
  const [settingOpend, setSettingOpend] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs().format());
  const [settingTime, setSettingTime] = useState(dayjs().format());
  const [countdownStart, setCountdownStart] = useState(false);

  // 更新設定視窗現在時間
  useEffect(() => {
    if (settingOpend) setSettingTime(dayjs().format());
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format());
    }, 1000);
    return () => clearInterval(interval);
  }, [settingOpend]);

  // 倒數計時
  useEffect(() => {
    if (countdownStart) {
      let remaining = dayjs(settingTime).diff(dayjs(currentTime), 'second');
      const interval = setInterval(() => {
        if (remaining <= 0) {
          setIntoBlack(true);
          clearInterval(interval);
          return;
        }
        remaining--;
      }, 1000);
    }
    return () => {};
  }, [countdownStart]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Button
            iconName={intoBlack && !settingOpend ? 'eye-slash' : 'eye'}
            onPress={() => {
              setSettingOpend(!settingOpend);
              setIntoBlack(!settingOpend);
            }}
          />
          <Text style={styles.title}>Now is your happy hour</Text>
        </View>
        <View style={styles.body}>
          <WebWrapper url="https://www.google.com/" pause={intoBlack} />
          {intoBlack && <View style={styles.overlay}></View>}
          {settingOpend && (
            <View style={styles.modal}>
              <Setting
                currentTime={currentTime}
                settingTime={settingTime}
                restore={() => {
                  setSettingTime(dayjs().format());
                }}
                setting={(bool) => {
                  setSettingOpend(false);
                  setCountdownStart(bool);
                  setIntoBlack(false);
                }}
                addHours={(v) => {
                  setSettingTime(() => {
                    return dayjs(settingTime).add(v, 'h').format();
                  });
                }}
                addMinutes={(v) => {
                  setSettingTime(() => {
                    return dayjs(settingTime).add(v, 'm').format();
                  });
                }}
              />
            </View>
          )}
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
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'start',
    alignItems: 'center',
    zIndex: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    zIndex: 10,
  },
});
