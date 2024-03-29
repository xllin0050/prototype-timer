import { config } from "@tamagui/config/v3";
import "@tamagui/core/reset.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TamaguiProvider, createTamagui } from "tamagui";
const tamaguiConfig = createTamagui(config);

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Text style={{ fontFamily: "InterBold", fontSize: 30 }}>
          Open up App.js to start working on your app!
        </Text>

        <StatusBar style="auto" />
      </View>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
