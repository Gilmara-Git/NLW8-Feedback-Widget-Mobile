import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height: 40,
    backgroundColor: theme.colors.brand,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: theme.colors.text_on_brand_color,
    fontFamily: theme.fonts.medium,
    fontSize: 14
  }
});