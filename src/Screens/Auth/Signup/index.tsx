import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
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
import { windowHeight } from "../../../utils/Commons/Dimention";

const SignupScreen = ({ navigation }: any) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onCreate = () => {
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

    navigation.navigate("UploadPhoto");
  };
  return (
    <ScreenLayout
      backgroundSource={images.background_layout}
      style={{ padding: sizeHelper.calHp(30) }}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        // style={{ flex:1,backgroundColor:"red" }}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <View
          style={{
            paddingTop: sizeHelper.calHp(60),
            gap: sizeHelper.calHp(15),
            height: "100%",
          }}
        >
          <Image
            style={styles.logoContainer}
            resizeMode="contain"
            source={images.logo}
          />
          <CustomText
            text={"Sign Up Account"}
            size={35}
            style={{ textAlign: "center" }}
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
          />
          <CustomText
            text={"Create your account it takes less then a minute"}
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
            <View style={{ ...appStyles.rowjustify, width: "100%" }}>
              <CustomInput
                value={values.first_name}
                onChangeText={(txt: string) =>
                  setValues({ ...values, first_name: txt })
                }
                width={"49%"}
                label="First name"
              />
              <CustomInput
                value={values.last_name}
                onChangeText={(txt: string) =>
                  setValues({ ...values, last_name: txt })
                }
                width={"49%"}
                label="Last name"
              />
            </View>
            <CustomInput
              value={values.username}
              onChangeText={(txt: string) =>
                setValues({ ...values, username: txt })
              }
              width={"100%"}
              label="Username"
            />
            <CustomInput
              width={"100%"}
              value={values.email}
              onChangeText={(txt: string) => {
                setValues({ ...values, email: txt });
              }}
              label="Email"
            />
            <CustomInput
              value={values.password}
              onChangeText={(txt: string) => {
                setValues({ ...values, password: txt });
              }}
              width={"100%"}
              label="Password"
            />
          </View>

          <TouchableOpacity
            onPress={() => setIsAgree(!isAgree)}
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(15),
              paddingVertical: sizeHelper.calHp(30),
              alignSelf: "flex-start",
            }}
          >
            <TouchableOpacity onPress={() => setIsAgree(!isAgree)}>
              <Image
                style={{
                  width: sizeHelper.calWp(35),
                  height: sizeHelper.calWp(35),
                }}
                source={isAgree ? images.flled_check : images.unfill_check}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* <View style={styles.checkBox}></View> */}
            <View style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}>
              <CustomText text={"Agree upon"} size={18} />
              <CustomText
                text={"terms & conditions"}
                color={theme.colors.primary}
                size={18}
              />
            </View>
          </TouchableOpacity>
          <CustomButton onPress={() => onCreate()} text="Create account" />
        </View>
        <View style={{ height: "100%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              ...appStyles.row,
              ...styles?.bottomContainer,
              // backgroundColor:s"red"
            }}
          >
            <CustomText text={"Already have an account?"} size={22} />
            <CustomText
              text={"Log in"}
              color={theme.colors.primary}
              size={22}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScreenLayout>
  );
};

export default SignupScreen;

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
  bottomContainer: {
    gap: sizeHelper.calWp(5),
    alignSelf: "center",
    height: sizeHelper.calHp(40),

    marginTop:sizeHelper.calHp(Platform.OS=="ios"?35:  75)
  },
  logoContainer: {
    width: sizeHelper.calWp(120),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calWp(15),
    alignSelf: "center",
  },
});
