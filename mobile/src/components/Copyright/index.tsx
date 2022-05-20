import React from 'react';

import {
  View, Text
} from 'react-native';

import { styles } from './styles';

export function Copyright(){
  return (
    <>
        <Text style={styles.text}>Made with<Text style={styles.heart}>♥</Text> by Rocketseat</Text>
    </>
  );
}