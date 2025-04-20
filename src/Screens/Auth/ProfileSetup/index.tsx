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
const ProfileSetup = ({ navigation }: any) => {
  const [selectedPersonality, setSelectedPersonality] = useState<any>("");

  const personalityType = [
    { title: "An Introvert" },
    { title: "An Extrovert" },
  ];

  const PersonalityContainer = ({ title, onPress, width }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          ...styles.intersetContainer,
          borderWidth: selectedPersonality == title ? -1 : 1,
          borderColor: selectedPersonality == title ? "transparent" : "#E4E2E2",
          backgroundColor:
            selectedPersonality == title
              ? theme.colors.primary
              : theme.colors.white,
        }}
      >
        <CustomText
          color={
            selectedPersonality == title
              ? theme.colors.white
              : theme.colors.gray_placeholder
          }
          text={title}
          size={23}
        />
        {selectedPersonality == title && (
          <Image
            source={images.check_box}
            style={{
              width: sizeHelper.calWp(32),
              height: sizeHelper.calWp(32),
            }}
            resizeMode="contain"
          />
        )}
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
          onPress={() => navigation.goBack()}
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
            text={"Your personality type"}
            size={32}
            style={{ textAlign: "center" }}
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
          />
        </View>

        <ScreenSteps />

        <Image
          style={styles.modeImg}
          source={
            selectedPersonality == "An Introvert"
              ? images.mode_off
              : selectedPersonality == "An Extrovert"
              ? images.smile
              : images.mode
          }
          resizeMode="contain"
        />
        <View style={{ gap: sizeHelper.calHp(20) }}>
          <CustomText
            text={"What type of personality you potray"}
            style={{ textAlign: "center" }}
            color={theme.colors.secondry}
            size={20}
          />
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(20),
              flexWrap: "wrap",
            }}
          >
            {personalityType.map((item, index) => {
              return (
                <PersonalityContainer
                  key={index.toString()}
                  onPress={() => setSelectedPersonality(item?.title)}
                  title={item?.title}
                />
              );
            })}
          </View>
        </View>
      </View>

      <CustomButton
        onPress={() => navigation.navigate("UploadPhoto")}
        bgColor={theme.colors.secondry}
        text="Next"
      />
    </ScreenLayout>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  intersetContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    gap: "18%",
    flexDirection: "row",
    width: "45%",
    paddingVertical: sizeHelper.calHp(30),
  },
  crossImg: {
    width: sizeHelper.calHp(20),
    height: sizeHelper.calHp(20),
    tintColor: theme.colors.black,
  },
  modeImg: {
    width: sizeHelper.calWp(300),
    height: sizeHelper.calHp(300),
    marginVertical: sizeHelper.calHp(40),
  },
});
