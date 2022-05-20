import React from 'react';
import { StatusBar } from 'expo-status-bar';
import  'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {Inter_500Medium,  Inter_400Regular } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import Widget  from './src/components/Widget';
import { theme } from './src/theme';


export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [ fontsLoaded ] = useFonts({
    Inter_500Medium,
    Inter_400Regular 
  }); 

  if(!fontsLoaded){
    return null;
  }

  SplashScreen.hideAsync();
   return (
      <View style={{ flex:1, backgroundColor: theme.colors.background }}>
      <StatusBar 
       style="light"
       backgroundColor='transparent'
       translucent
       />
       <Widget />
    </View>
  );
}

