import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import { images } from "../../../assets/pngs";
import sizeHelper from "../../../utils/Helpers";
import { fonts } from "../../../utils/Themes/fonts";
import { theme } from "../../../utils/Themes";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomButton from "../../../components/Button";
import ScreenSteps from "../../../components/ScreenSteps";
import { windowWidth } from "../../../utils/Commons/Dimention";
const UploadPhoto = ({ navigation }: any) => {
  const FrameContainer = ({ title, onPress, width }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.photoFrame}
      >
        <Image
          source={images.photo_upload}
          style={styles.photoImg}
          resizeMode="contain"
        />
        <CustomText
          text={"less than 5MB (PNG,JPG)"}
          style={{ textAlign: "center" }}
          color={theme.colors.dark_gray}
          size={15}
        />
      </TouchableOpacity>
    );
  };
  return (
    <ScreenLayout
      backgroundSource={images.background_layout}
      style={{ padding: sizeHelper.calHp(30) }}
    >
      <View
        style={{
          gap: sizeHelper.calHp(25),
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
        onPress={() => navigation.navigate("InterestsAndHobbies")}
        style={{
            ...appStyles.row,
            gap: sizeHelper.calWp(15),
            alignSelf: "flex-end",
          }}
        >
          <CustomText text={"Skip"} size={27} />
          <Image style={styles.crossImg} source={images.cross} />
        </TouchableOpacity>
        <View
          style={{ gap: sizeHelper.calHp(4), paddingTop: sizeHelper.calHp(40) }}
        >
          <CustomText
            text={"Let’s set up your profile"}
            style={{ textAlign: "center" }}
            color={theme.colors.dark_gray}
            size={20}
          />

          <CustomText
            text={"Upload your photo"}
            size={32}
            style={{ textAlign: "center" }}
            fontWeight="600"
            fontFam={fonts.Outfit_SemiBold}
          />
        </View>

        <ScreenSteps steps={[1, 2]} activeStep={1} />

        <View
          style={{
            gap: sizeHelper.calHp(10),
            alignItems: "center",
            paddingTop: sizeHelper.calHp(30),
          }}
        >
          <FrameContainer />
          <CustomText
            text={"Upload your photo to get peopple know you faster"}
            style={{ textAlign: "center", marginHorizontal: "20%" }}
            color={theme.colors.secondry}
            size={20}
          />
        </View>
      </View>

      <CustomButton
        onPress={() => navigation.navigate("InterestsAndHobbies")}
        bgColor={theme.colors.secondry}
        style={{marginBottom:sizeHelper.calHp(10)}}
        text="Next"
      />
    </ScreenLayout>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  photoFrame: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeHelper.calWp(35),
    width: windowWidth / 2.3,
    height: sizeHelper.calHp(270),
    gap: sizeHelper.calHp(8),
    paddingVertical: sizeHelper.calHp(30),
    borderWidth: sizeHelper.calWp(10),
    borderColor: "#C9C9C960",
    backgroundColor: theme.colors.white,
  },
  photoImg: {
    width: sizeHelper.calWp(120),
    height: sizeHelper.calWp(120),
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
  crossImg: {
    width: sizeHelper.calHp(20),
    height: sizeHelper.calHp(20),
    tintColor: theme.colors.black,
  },
});
