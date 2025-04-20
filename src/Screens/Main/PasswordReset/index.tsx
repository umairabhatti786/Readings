import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import ScreenLoader from "../../../components/ScreenLoader";
import { fonts } from "../../../utils/Themes/fonts";
import { images } from "../../../assets/pngs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const PasswordResetScreen = ({ navigation, route }: any) => {
  const [interest, setInterest] = useState("Camping");
  const [isLogout, setIsLogout] = useState(true);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    current_password: "",
    new_password: "",
    retype_password: "",
  });

  return (
    <>
      <SafeAreaView style={styles.main}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "space-between",
            paddingBottom: sizeHelper.calHp(15),
          }}
        >
          <View style={appStyles.Container}>
            <CustomHeader title={"Password reset"} />
            <CustomText
              text={
                "Your password should be at least 6 characters and should include a combination of the numbers, letters and special characters (!@#$)"
              }
              color={theme.colors.gray_text}
              size={18}
            />
            <View style={{ gap: sizeHelper.calHp(15) }}>
              <CustomInput
                value={values.current_password}
                onChangeText={(txt: any) =>
                  setValues({ ...values, current_password: txt })
                }
                backgroundColor={theme.colors.background}
                label="Current password"
              />
              <CustomInput
                value={values.new_password}
                onChangeText={(txt: any) =>
                  setValues({ ...values, new_password: txt })
                }
                backgroundColor={theme.colors.background}
                label="New password"
              />
              <CustomInput
                value={values.retype_password}
                onChangeText={(txt: any) =>
                  setValues({ ...values, retype_password: txt })
                }
                backgroundColor={theme.colors.background}
                label="Re-type password"
              />
              <TouchableOpacity style={{ paddingTop: sizeHelper.calHp(10) }}>
                <CustomText
                  text={"Forget password?"}
                  fontWeight="500"
                  color={theme.colors.red}
                  fontFam={fonts.Outfit_Regular}
                  size={22}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsLogout(!isLogout)}
                style={{
                  ...appStyles.row,
                  gap: sizeHelper.calHp(17),
                  paddingTop: sizeHelper.calHp(10),
                }}
              >
                <Image
                  style={{
                    width: sizeHelper.calWp(35),
                    height: sizeHelper.calWp(35),
                  }}
                  source={isLogout ? images.flled_check : images.unfill_check}
                  resizeMode="contain"
                />
                <CustomText
                  style={{ width: "90%" }}
                  text={
                    "Log out of other devices. Choose this if someone else used your account"
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <CustomButton
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);

                navigation.goBack();
              }, 2000);
            }}
            style={{
              marginHorizontal: sizeHelper.calWp(30),
              marginTop: "90%",
            }}
            text="Add now"
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {loading && <ScreenLoader />}
    </>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
