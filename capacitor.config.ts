
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.app',
  appName: 'safe-call-buddy',
  webDir: 'dist',
  server: {
    url: 'https://4a944adb-423b-4e9c-b620-4f2298168425.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
