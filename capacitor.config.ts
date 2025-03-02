import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sanic.nutrition',
  appName: 'Nutrition App',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;
