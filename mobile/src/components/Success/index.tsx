import React from 'react';

import {
  View, TouchableOpacity, Image, Text
} from 'react-native';
 import successImg  from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

interface SuccessProps {
  onSendAnotherFeedback: ()=>void;
}

export function Success({ onSendAnotherFeedback }:SuccessProps){
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={successImg}
        />

        <Text style={styles.title}>
          Thanks for your feedback!
        </Text>
        <TouchableOpacity 
          onPress={onSendAnotherFeedback}
          style={styles.button}>
          <Text style={styles.buttonTitle}>
            Send Another feedback
          </Text>
        </TouchableOpacity>

        <Copyright />
    </View>
  );
}