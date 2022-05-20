import React, { useState } from 'react';
import  { ChatTeardropDots } from 'phosphor-react-native';
import { gestureHandlerRootHOC }  from 'react-native-gesture-handler'; // allow gesture to work in one component inside another

import {
 TouchableOpacity, 
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../theme';
import { useRef, useMemo } from 'react'; // This is for the BottomSheet
import BottomSheet from '@gorhom/bottom-sheet';
import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';
import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget(){
  const [ feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null);
  const [ feedbackSent, setFeedbackSent ] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null); // for the BottomSheet
  const snaPoints = useMemo(()=>[1, 280], []); // for the BottomSheet, closed 1, open 280 

  function handleOpen(){
    // we will use the ref, to verify, if it is null; then expand the BottomSheet
    bottomSheetRef.current?.expand();
  };

  function handleSelectedFeedbackType(key:FeedbackType){
    setFeedbackType(key)
  };

  function handleRestartFeedback(){
    setFeedbackType(null)
    setFeedbackSent(false)
  };

  function handleFeedbackSent(){
    setFeedbackSent(true)
  };

  return (
    <>
   <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
   >
     <ChatTeardropDots
        size={24}
        color={theme.colors.text_on_brand_color}
        weight='bold'
     />
   </TouchableOpacity>

   <BottomSheet
      ref={bottomSheetRef}     
      snapPoints={snaPoints}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicatorCloseBottomSheet}   
      >

       { 
       
        feedbackSent ? 
        <Success
          onSendAnotherFeedback={handleRestartFeedback}
        /> : 

       <>
          { 
          feedbackType ? 
          <Form
            feedbackType={feedbackType}
            onFeedbackCanceled={handleRestartFeedback}
            onFeedbackSent={handleFeedbackSent}
          /> : 

          <Options
            onFeedbackTypeChange={handleSelectedFeedbackType}
          /> 
          }
       </>

  }
        

   </BottomSheet>
   </>
  );
}

export default gestureHandlerRootHOC(Widget);