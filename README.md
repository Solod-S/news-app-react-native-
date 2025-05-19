![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with React Native](https://img.shields.io/badge/Runs%20with%20RN-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=61DAFB)](https://reactnative.dev/)
[![runs with Expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=expo&labelColor=f3f3f3&logoColor=000020)](https://expo.dev/)
[![Runs with News Api](https://img.shields.io/badge/Runs%20with%20RN%20News%20API-000.svg?style=flat-square&logo=imessage&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/calintamas/react-native-toast-message)
[![runs with React Native Vector Icons](https://img.shields.io/badge/Runs%20with%20RN%20Vector%20Icons-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/oblador/react-native-vector-icons)
[![runs with React Native Responsive Screen](https://img.shields.io/badge/Runs%20with%20RN%20Responsive%20Screen-000.svg?style=flat-square&logo=react&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/marudy/react-native-responsive-screen)
[![Runs with React Native Toast Message](https://img.shields.io/badge/Runs%20with%20RN%20Toast%20Message-000.svg?style=flat-square&logo=imessage&labelColor=f3f3f3&logoColor=61DAFB)](https://github.com/calintamas/react-native-toast-message)

# News App

![News App](/assets/banner-min.jpg)

**Project Description:**

News App is a powerful and intuitive AI-assisted news application that helps you stay informed with the latest stories from around the world — all in one place.

🔑 Key Features:

- Multi-Source News Aggregation – Follow the latest news from various trusted sources and platforms, all conveniently organized in a single app.

- Topic-Based Search – Quickly find news articles on topics that matter to you using our smart search functionality.

- Browse by Categories – Explore news by categories such as Politics, Technology, Sports, Entertainment, Business, Health, and more.

- Save Your Favorites – Bookmark and save articles you find interesting to read later or revisit at any time.

- Personalized Experience – Tailor your news feed based on your interests and reading habits.

Stay informed, stay curious — News App brings the world’s headlines to your fingertips. 🗞️🌍

 <div align="center">
 <br />
 
![News App](/assets/video.gif)

  <br />
</div>

Main Technologies:

– React Native: A popular framework for building cross-platform mobile applications using JavaScript and React. It enables developers to write native apps for iOS and Android with a single codebase, ensuring seamless performance and a consistent user experience.

– Expo: A powerful framework and platform for developing React Native applications. It offers a managed workflow, over-the-air updates, and access to native APIs without requiring native code, simplifying the development process.

– React Native Vector Icons: A customizable icon library for React Native with support for popular icon sets like FontAwesome, MaterialIcons, Ionicons, and more. It provides easy-to-use and consistent icons across the app.

– React Native Responsive Screen: A library that helps create responsive UI layouts by converting percentage-based dimensions into device-independent pixels, ensuring consistent layout across different screen sizes and resolutions.

– React Native Toast Message: A fully customizable Toast notification library for React Native. It allows you to display messages at the top or bottom of the screen to notify users of various actions.

– Cloudinary React Native: A toolkit that integrates Cloudinary’s media management into React Native apps. It allows uploading, optimizing, and transforming images and videos in the cloud with high performance and flexibility.

– Expo Auth Session: A module in Expo for implementing authentication flows. It enables secure OAuth and OpenID Connect authentication in React Native apps without ejecting, supporting providers like Google, Facebook, and more.

– Expo Image Picker: A module that provides access to the system's UI for selecting images and videos from the phone’s library or camera. Useful for profile photos, galleries, etc.

– Expo Media Library: Allows access to the user's media library and provides functions for reading and writing to the device's media storage. Useful for handling files like images and videos.

– Clerk Expo: An authentication service integration for Expo apps that offers a complete user management solution, including sign-in, sign-up, multi-factor auth, and user sessions across platforms.

– @expo/vector-icons: A library built into Expo that provides a wide range of vector icons with full support for style customization and platform compatibility.

– Strapi: An open-source headless CMS that makes it easy to build and manage content APIs. It supports REST and GraphQL out of the box and integrates well with mobile and web frontends.

– Replicate API: A cloud-based platform for running machine learning models via API. It allows developers to generate images, text, and other outputs using models like Stable Diffusion, LLaMA, and more, all without managing infrastructure.

## How to Install and Run Your React Native App Using Expo

![React Native App](/assets/exp.png)

### Prerequisites

1. **Install Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
2. **Install Expo CLI**: Install Expo globally by running:

   ```bash
   npm install -g expo-cli
   ```

3. Install a Mobile Emulator or Expo Go App:

   Use a simulator/emulator for iOS or Android.
   Or install the Expo Go app on your mobile device from the App Store or Google Play.

### Using Git (recommended)

Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/Solod-S/picmorph-ai-react-native ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Start

0. Prepare .env file

```picmorph-ai-app
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
EXPO_PUBLIC_STRAPI_API_KEY;

EXPO_PUBLIC_REPLICATE_API_KEY;
EXPO_PUBLIC_CLOUD_NAME;
EXPO_PUBLIC_CLOUDINARY_API_KEY;
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
EXPO_PUBLIC_CLOUDINARY_API_SECRET;
```

```picmorph-ai-admin
DATABASE_CLIENT;
DATABASE_HOST;
DATABASE_PORT;
DATABASE_NAME;
DATABASE_USERNAME;
DATABASE_PASSWORD;
DATABASE_SSL;
DATABASE_FILENAME;
JWT_SECRET;


CLOUDINARY_NAME
EXPO_PUBLIC_CLOUDINARY_API_KEY
CLOUDINARY_SECRET
```

1. Start the Project

```picmorph-ai-admin
npm run dev
```

```picmorph-ai-app
npm start
```

2. Open the App on Your Device

- Using Expo Go App:

  - Scan the QR code with the Expo Go app.
  - The app will load directly on your device.

- Using an Emulator:

  - iOS Simulator "i"
  - Android Simulator "a"

3. Enjoy Your App!!!

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request. For major changes, please open an issue first to discuss the changes.

**_NOTE: PLEASE LET ME KNOW IF YOU DISCOVERED ANY BUG OR YOU HAVE ANY SUGGESTIONS_**
