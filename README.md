<p align="center">
  <img src="./assets/images/icon.png" width="120" alt="Qalbu Logo">
</p>

<h1 align="center">Qalbu</h1>

<p align="center">
  A comprehensive Islamic application built with React Native (Expo). Provides highly accurate dynamic prayer times, offline-first Qibla compass, Digital Al-Quran, daily prayers, and an exclusive menstruation tracker (Jurnal Haid) for women.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=flat&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

## Preview

Below are the screenshots showcasing the application's clean, modern, and accessible user interface.

### Home & Dashboard
The main dashboard provides dynamic prayer schedules based on the user's location, a progress tracker for Ramadan, and quick action menus for primary features.

<p align="center">
  <img src="./assets/screenshots/home.png" width="300" alt="Home Dashboard">
</p>

### Digital Al-Quran
A beautifully formatted Quran reader fetching real-time data from equran.id API, featuring customizable Arabic font sizes for better readability.

<p align="center">
  <img src="./assets/screenshots/quran.png" width="300" alt="Digital Al-Quran">
</p>

### Daily Prayers & Selected Hadith
An offline-first collection of essential daily prayers and selected Hadith, loading instantly via local JSON data.

<p align="center">
  <img src="./assets/screenshots/doa.png" width="300" alt="Daily Prayers">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./assets/screenshots/hadits.png" width="300" alt="Selected Hadith">
</p>

### Menstruation Tracker (Jurnal Haid)
An inclusive feature designed to help women track missed fasting days (Qadha) and discover alternative acts of worship during their cycle.

<p align="center">
  <img src="./assets/screenshots/haid.png" width="300" alt="Menstruation Tracker">
</p>

### Advanced Settings
A highly customizable user experience allowing users to toggle Dark Mode, adjust Arabic font sizes, and modify prayer calculation parameters.

<p align="center">
  <img src="./assets/screenshots/settings.png" width="300" alt="Advanced Settings">
</p>

---

## Technical Overview

- **Framework:** Expo (React Native)
- **Language:** TypeScript
- **State Management:** React Context API & AsyncStorage
- **APIs:** equran.id (Quran Data), custom prayer times API
- **Device Sensors:** expo-sensors (Magnetometer for Qibla), expo-location (GPS)

## Running Locally

1. Clone the repository
2. Run `npm install` to install dependencies
3. Execute `npx expo start` to launch the Expo development server
4. Connect via the Expo Go app on your physical device, or use an emulator.
