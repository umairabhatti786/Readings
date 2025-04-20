import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert, Platform } from "react-native";
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
import { emailRegex } from "../../../utils/Regex";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation }: any) => {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {
    if (!values.email) {
      Alert.alert("Alert!", "Email is required");
      return;
    }
    if (values.email) {
      let isValid = emailRegex.test(values.email);

      if (!isValid) {
        Alert.alert("Alert!", "Invalid Email Address");

        return;
      }
    }
    if (!values.password) {
      Alert.alert("Alert!", "Password is required");
      return;
    }
    if (values.password.length < 6) {
      Alert.alert("Alert!", "Password must be at least 6 characters long.");
      return;
    }

    navigation.navigate("BottomTab");
  };
  return (
    <ScreenLayout
      backgroundSource={images.background_layout}
      style={{ padding: sizeHelper.calHp(30) }}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <View
          style={{
            paddingTop: sizeHelper.calHp(60),
            gap: sizeHelper.calHp(15),
            flex: 1,
          }}
        >
          <Image
            style={styles.logoContainer}
            resizeMode="contain"
            source={images.logo}
          />
          <CustomText
            text={"Log In"}
            size={35}
            style={{ textAlign: "center" }}
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
          />
          <CustomText
            text={"Log in to your account, start from where you left"}
            style={{ textAlign: "center" }}
            color={theme.colors.dark_gray}
            size={20}
          />
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(20),
              paddingVertical: sizeHelper.calHp(15),
            }}
          >
            <SocialButton icon={images.google} title={"Google"} />
            <SocialButton icon={images.facebook} title={"Facebook"} />
          </View>
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(10) }}>
            <View style={styles.divider} />
            <CustomText text={"Or"} color={theme.colors.dark_gray} size={20} />
            <View style={styles.divider} />
          </View>
          <View style={{ gap: sizeHelper.calHp(25), width: "100%" }}>
            <CustomInput
              label="Email"
              value={values.email}
              onChangeText={(txt: string) => {
                setValues({ ...values, email: txt });
              }}
            />
            <CustomInput
              label="Password"
              value={values.password}
              onChangeText={(txt: string) => {
                setValues({ ...values, password: txt });
              }}
            />
          </View>

          <View style={appStyles.rowjustify}>
            <TouchableOpacity
              onPress={() => setIsRememberMe(!isRememberMe)}
              style={{
                ...appStyles.row,
                gap: sizeHelper.calWp(15),
                paddingVertical: sizeHelper.calHp(20),
              }}
            >
              <TouchableOpacity onPress={() => setIsRememberMe(!isRememberMe)}>
                <Image
                  style={{
                    width: sizeHelper.calWp(35),
                    height: sizeHelper.calWp(35),
                  }}
                  source={
                    isRememberMe ? images.flled_check : images.unfill_check
                  }
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {/* <View style={styles.checkBox}></View> */}
              <CustomText text={"Remember me"} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              style={{ height: sizeHelper.calHp(40), justifyContent: "center" }}
            >
              <CustomText
                color={theme.colors.red}
                text={"Forget password?"}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <CustomButton onPress={() => onLogin()} text="log in" />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignupScreen")}
          style={{
            ...appStyles.row,
            gap: sizeHelper.calWp(5),
            alignSelf: "center",
            height: sizeHelper.calHp(40),
            marginTop:Platform.OS=="ios"?"60%":  "70%",
            // marginTopsizeHelper.calHp(Platform.OS=="ios"?35:  75)

            
          }}
        >
          <CustomText text={"Don’t have an account?"} size={22} />
          <CustomText text={"Sign Up"} color={theme.colors.primary} size={22} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScreenLayout>
  );
};

export default LoginScreen;

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
    width: sizeHelper.calWp(120),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calWp(15),
    alignSelf: "center",
  },
});
