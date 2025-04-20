import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import { images } from "../../../assets/pngs";
import sizeHelper from "../../../utils/Helpers";
import { fonts } from "../../../utils/Themes/fonts";
import { theme } from "../../../utils/Themes";
import { appStyles } from "../../../utils/GlobalStyles";
import SocialButton from "../../../components/SocialButton";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import { CommonActions } from "@react-navigation/native";

const SplashScreen = ({ navigation }: any) => {

    useEffect(()=>{

        setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name:"OnboardingScreen" }],
              })
            );
      
            // navigation.navigate(token ? "BottomTab" : "WelcomeScreen");
          }, 2000);



    },[])
  return (
  <Image
  style={{width:"100%",height:"100%"}}
  source={images.splash}
  />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    height: sizeHelper.calHp(0.5),
    backgroundColor: theme.colors.divider,
  },
  checkBox: {
    width: sizeHelper.calWp(35),
    height: sizeHelper.calWp(35),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B1B1B1",
    borderRadius: sizeHelper.calWp(35),
  },
  logoContainer: {
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(80),
    borderRadius: sizeHelper.calWp(15),
    alignSelf: "center",
  },
});
