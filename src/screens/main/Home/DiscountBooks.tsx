import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../components/CustomText';
import {font} from '../../../utils/font';
import {colors} from '../../../utils/colors';
import {windowWidth} from '../../../utils/Dimensions';
import {images} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';


const DiscountBooks = ({}) => {
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        borderRadius: scale(8),
        overflow: 'hidden',
        backgroundColor: colors.white,
      }}>
      <ImageBackground style={styles.bookImage} source={images.books_sale}>
        <View
          style={{
            padding: scale(10),
            gap: verticalScale(5),
            flexDirection:"row",
            justifyContent:"space-between",
            flex:1
          }}>
          <View
            style={{
              gap: scale(5),
              width: windowWidth / 3,
              paddingHorizontal: scale(10),
              paddingTop: verticalScale(5),

            }}>
            <CustomText
              text={'Grand Sale'}
              color={colors.white}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
              size={19}
            />

            <CustomText
              text={'40% OFF on entire literature collection'}
              lineHeight={20}
              numberOfLines={3}
              color={colors.white}
              size={14}
            />
          </View>

          <View style={{alignSelf: 'flex-end',}}>
            <CustomButton
              width={scale(95)}
              borderRadius={6}
              height={27}
              text={'Pre-Order'}
              bgColor={colors.white}
              textColor={colors.orange}
            />
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.5} style={styles.backCircle}>
          <Image
            style={{width: '60%', height: '60%', tintColor: colors.white}}
            resizeMode="contain"
            source={images.left_arrow}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default DiscountBooks;

const styles = StyleSheet.create({
  backCircle: {
    width: scale(30),
    height: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF33',
    alignSelf: 'center',
    borderRadius: 999,
    position: 'absolute',
    left: scale(10),
    top: '40%',
  },

  bookImage: {
    width: '100%',
    height: verticalScale(110),

  },
});
