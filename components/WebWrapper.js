import { useEffect, useRef } from 'react';

import { View } from 'react-native';

import { WebView } from 'react-native-webview';

export default function WebWrapper({ url, pause }) {
  const wvInstance = useRef();
  useEffect(() => {
    wvInstance.current.injectJavaScript(`
    document.querySelectorAll('video').forEach(function(video) {
      video.pause();
    });
    `);
  }, [pause]);
  return (
    <View style={{ flex: 1 }}>
      <WebView ref={wvInstance} source={{ uri: url }} />
    </View>
  );
}
