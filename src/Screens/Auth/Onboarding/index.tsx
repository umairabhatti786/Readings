import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import sizeHelper from "../../../utils/Helpers";
import AppIntroSlider from "react-native-app-intro-slider";
import { onboardSlider } from "../../../utils/Data";
import { fonts } from "../../../utils/Themes/fonts";
import { theme } from "../../../utils/Themes";
import SwipeButton from "../../../components/SwipeButton";
import {
  XPayProvider,
  PaymentElement,
} from '@xstak/xpay-element-react-native-stage';
const OnboardingScreen = ({ navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<AppIntroSlider>(null);

  // render slider
  const renderSlide = ({ item }: any) => (
    <View
      style={{
        gap: sizeHelper.calHp(30),
        paddingHorizontal: sizeHelper.calWp(30),
      }}
    >
      <Image
        source={item?.img}
        style={styles.sliderImg}
        resizeMode="contain"
      />

      <View
        style={styles.sliderTextContainer}
      >
        <CustomText
          text={item.title}
          size={45}
          style={{ textAlign: "center" }}
          fontWeight="600"
          fontFam={fonts.Outfit_Medium}
        />
        <CustomText
          text={item?.description}
          style={{ textAlign: "center" }}
          color={theme.colors.dark_gray}
          size={20}
        />
      </View>
    </View>
  );

  const onSlideChange = (index: any) => {
    setCurrentIndex(index);
  };

  return (
    <ScreenLayout>
      <View
        style={{
          paddingTop: sizeHelper.calHp(30),
        }}
      >
        <View
          style={{
            height: "90%",
            marginHorizontal:sizeHelper.calWp(30)
          }}
        >
          <XPayProvider
        xpay={{
          publishableKey: '',
          hmacSecret: '',
          accountId: '',
        }}>
        <PaymentElement
          onReady={(data: {
            complete: boolean | ((prevState: boolean) => boolean);
          }) => {
            // setEnabled(data.complete);
            console.log(data.complete);
          }}
        />
      </XPayProvider>
          {/* Slider  */}
          {/* <AppIntroSlider
            renderItem={renderSlide}
            data={onboardSlider}
            ref={flatListRef}
            onSlideChange={onSlideChange}
            showNextButton={false}
            showDoneButton={false}
            renderPagination={() => null} // Disable dots
          /> */}
          {/* <View style={styles.dotsContainer}>
            {onboardSlider.map((it, ind) => {
              return (
                <View
                  key={ind.toString()}
                  style={{
                    ...styles.dots,
                    backgroundColor:
                      currentIndex == ind
                        ? theme.colors.primary
                        : theme.colors.secondry + "15",
                  }}
                />
              );
            })}
          </View> */}
        </View>
      </View>

      <View style={{ alignSelf: "center" }}>
        <SwipeButton title={"Get started"}
        onSwipe={()=>navigation.navigate("SignupScreen")}
         />
      </View>
    </ScreenLayout>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizeHelper.calWp(8),
    alignSelf: "center",
  },
  dots: {
    width: sizeHelper.calWp(45),
    height: sizeHelper.calWp(12),
    borderRadius: 999,
  },
  sliderImg:{
    width: "100%",
    height: sizeHelper.calHp(650),
    borderRadius: sizeHelper.calWp(30),
  },
  sliderTextContainer:{
    gap: sizeHelper.calHp(20),
    marginTop: sizeHelper.calHp(30),
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 20,
  }
});
