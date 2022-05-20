import React, { useState } from "react";
import { ArrowLeft, X } from "phosphor-react-native";
import { View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import { ScreenshotButton } from "../../components/ScreenshotButton";
import { Button } from "../../components/Button";
import { FeedbackType } from "../../components/Widget";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { captureScreen } from 'react-native-view-shot';
import { styles } from "./styles";
import { theme } from "../../theme";
import { api } from "../../libs/api";
import * as FileSystem from 'expo-file-system';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: ()=> void;
  onFeedbackSent: ()=> void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: FormProps) {
  const feedbackData = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot]  = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback ] = useState(false);
  const [ comment, setComment ] = useState('');

  function handleScreenshot(){
    captureScreen({
      format:'jpg',
      quality: 0.8
    }).then(
      uri=>setScreenshot(uri))
      .catch(error=> console.log(error))
  };

  function handleRemoveScreenShot(){
    setScreenshot(null);
  };

  async function handleSendFeedback(){
    if(isSendingFeedback) return;

    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: FileSystem.EncodingType.Base64 });

    try{
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment,
        
      });
      onFeedbackSent();

    }catch(error){
      console.log(error);
      setIsSendingFeedback(false) 
   }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft
            weight="bold"
            color={theme.colors.text_secondary}
            size={24}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackData.image} style={styles.image} />

          <Text style={styles.titleText}>{feedbackData.title}</Text>
        </View>

        <TouchableOpacity
           onPress={onFeedbackCanceled}
        >
          <X weight="bold" color={theme.colors.text_secondary} size={24} />
        </TouchableOpacity>
      </View>
  
      <TextInput
        placeholder="Please provide details of your feedback. Thank You !"
        placeholderTextColor={theme.colors.text_secondary}
        style={styles.input}
        multiline
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenShot}
        />

        <Button 
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}
