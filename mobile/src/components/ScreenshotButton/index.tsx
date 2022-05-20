import React from 'react';
import { Camera , Trash} from 'phosphor-react-native';
import { theme }  from '../../theme';

import {
  View, 
  Image,
  TouchableOpacity
} from 'react-native';

import { styles } from './styles';

interface ScreenshotButtonProps {
    screenshot: string | null;
    onTakeShot: ()=>void;
    onRemoveShot: ()=>void;
}

export function ScreenshotButton({ screenshot,onTakeShot,onRemoveShot }: ScreenshotButtonProps){

  return (
    <TouchableOpacity
        style={styles.container}
        onPress={screenshot ? onRemoveShot : onTakeShot}
    >
        { screenshot ? 
        <>
          <Image 
            source={{ uri:screenshot }}
            style={styles.image}  
            />

          <Trash
              weight='fill'
              size={22}
              color={theme.colors.text_secondary}
              style={styles.removeIcon}
          />
        </>
        
            : 
    
        <Camera
            weight='bold'
            color={theme.colors.text_primary}
            size={24}
        />
    }

    </TouchableOpacity>
  );
}