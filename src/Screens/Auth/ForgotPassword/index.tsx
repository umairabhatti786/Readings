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
const ForgotPassword = ({ navigation }: any) => {
  const [isSubmited, setIsSubmited] = useState(false);
  return (
    <ScreenLayout
      backgroundSource={images.background_layout}
      style={{ padding: sizeHelper.calHp(30) }}
    >
      <View
        style={{
          paddingTop: sizeHelper.calHp(20),
          gap: sizeHelper.calHp(15),
          flex: 1,
        }}
      >
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
          style={{
            width: sizeHelper.calWp(70),
            height: sizeHelper.calWp(70),
            borderRadius: sizeHelper.calWp(25),
            backgroundColor: theme.colors.white,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: sizeHelper.calHp(20),
              height: sizeHelper.calHp(20),
              tintColor: theme.colors.black,
            }}
            source={images.cross}
          />
        </TouchableOpacity>

        <CustomText
          text={"Enter your email"}
          size={40}
          style={{ textAlign: "center" }}
          fontWeight="600"
          fontFam={fonts.Outfit_SemiBold}
        />
        <CustomText
          text={"You will recive a password reset link on your email address"}
          style={{ textAlign: "center", width: "80%",alignSelf:"center" }}
          color={theme.colors.dark_gray}
          size={20}
        />

        <CustomInput label="Email" />

        <CustomButton
          style={{ marginTop: sizeHelper.calHp(20) }}
          text={isSubmited?"Submitted":"Submit"}
          bgColor={isSubmited?theme.colors.black:theme.colors.primary}
          onPress={()=>setIsSubmited(true)}
        />
        {isSubmited && (
          <View
            style={{
              ...appStyles.rowjustify,
              paddingVertical: sizeHelper.calHp(20),
            }}
          >
            <CustomText color={theme.colors.black} text={"01:00"} size={18} />
            <View
              style={{
                ...appStyles.row,
                gap: sizeHelper.calWp(5),
              }}
            >
              <CustomText text={"Didn’t receive the email?"} size={20} />

              <CustomText text={"Resend"} color="#3579F6" size={20} />
            </View>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    height: sizeHelper.calHp(0.5),
    backgroundColor: "#9E9E9E",
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
});
