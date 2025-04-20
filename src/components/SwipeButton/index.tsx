import React, { useState } from "react";
import { StyleSheet, View, Animated, Image } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { windowWidth } from "../../utils/Commons/Dimention";
import { images } from "../../assets/pngs";
import { theme } from "../../utils/Themes";
import { fonts } from "../../utils/Themes/fonts";
import CustomText from "../Text";
import sizeHelper from "../../utils/Helpers";
import { SwiperButtonType } from "../../utils/Types";
const SWIPE_THRESHOLD = windowWidth - sizeHelper.calWp(80); // Threshold for a successful swipe

const SwipeButton = ({
  title,
  onSwipe,
  bgColor,
  disable,
}: SwiperButtonType) => {
  const translateX = new Animated.Value(0);
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );
  const onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > 100) {
        onSwipe?.();
        setTimeout(() => {
          Animated.timing(translateX, {
            toValue: 0, // Reset position
            useNativeDriver: true,
          }).start();
        }, 500);
      } else {
        Animated.spring(translateX, {
          toValue: 0, // Reset position

          useNativeDriver: true,
        }).start();
      }
    }
  };
  const interpolatedBgColor = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [theme.colors.primary + "20", theme.colors.primary], // Start with transparent, end with primary color
    extrapolate: "clamp",
  });
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.trackContainer,
            { backgroundColor: interpolatedBgColor }, // Apply animated background color
          ]}
        >
          <CustomText
            text={title}
            size={21}
            fontFam="600"
            fontWeight={fonts.Outfit_Medium}
            color={theme.colors.secondry}
          />
        </Animated.View>
      </View>
      <PanGestureHandler
        onGestureEvent={!disable ? onGestureEvent : () => {}}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.swipeButton,

            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, sizeHelper.calWp(550)],
                    outputRange: [0, sizeHelper.calWp(550)],
                    extrapolate: "clamp", // Prevent overshooting
                  }),
                },
              ],
              backgroundColor: bgColor || theme.colors.white,
            },
          ]}
        >
          <Image
            source={images.next_swipe}
            resizeMode="contain"
            style={styles.img}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  track: {
    height: sizeHelper.calHp(85),
    width: SWIPE_THRESHOLD,

    justifyContent: "center",
    alignItems: "flex-end",
  },
  arrow: {
    fontSize: 24,
    color: "#A0A3A7",
  },
  swipeButton: {
    position: "absolute",
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(75),
    borderRadius: sizeHelper.calWp(20),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: sizeHelper.calWp(10),
    marginTop: sizeHelper.calHp(5),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  img: {
    width: sizeHelper.calWp(35),
    height: sizeHelper.calWp(35),
  },
  trackContainer: {
    width: "100%",
    height: sizeHelper.calHp(90),
    alignItems: "center",
    justifyContent: "center",

    borderRadius: sizeHelper.calWp(20),
    paddingRight: sizeHelper.calWp(50),
  },
});
