# Install Node.js dependencies
npm install

# Add Android platform to Capacitor
npx cap add android

# Create production build
npm run build

# Sync web assets to Android project
npx cap sync android

# This will open Android Studio with your project
npx cap open android

# in android Studio
1. wait for gradle sync
2. start Android emulator(AVD)
3. run


# troubleshoot
if build fail: Run npx cap sync android again
if location doest work : grant location permission in android settings