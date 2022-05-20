import React, { useState} from 'react';
import { Copyright } from '../Copyright';
import { Option } from '../../components/Option';
import { feedbackTypes } from '../../utils/feedbackTypes';


import { 
  View, Text
} from 'react-native';

import { styles } from './styles';
import { FeedbackType } from '../Widget';

interface OptionsProps {
  onFeedbackTypeChange: (feedbackType:FeedbackType) => void;
}

export function Options({ onFeedbackTypeChange } : OptionsProps){
 

  return (
    <View style={styles.container}>

          <Text style={styles.title}>Leave your feedback</Text>
          <View style={styles.options}>
            { 
              Object.entries(feedbackTypes).map(([key, value])=> 
               ( <Option 
                  key={key}
                  title={value.title}
                  image={value.image}
                  onPress={()=>onFeedbackTypeChange(key as FeedbackType )}
                /> 
                )
              )
              
              }
          </View>
        <Copyright />
    </View>
  )
  
};
 

