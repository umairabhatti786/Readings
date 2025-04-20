import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
import { images } from '../../assets/pngs';

interface BackgroundContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundSource?:ImageSourcePropType
}

const ScreenLayout: React.FC<BackgroundContainerProps> = ({
  children,
  style,
  backgroundSource
}) => {
  return (
    <ImageBackground
      source={ backgroundSource as ImageSourcePropType  ||images.onbaord_background  as ImageSourcePropType   }
      style={[styles.container, style]}>
        
        <SafeAreaView
        style={{flex:1}}
        >
        {children}

        </SafeAreaView>
    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenLayout;
