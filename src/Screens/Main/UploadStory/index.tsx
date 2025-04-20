import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import CustomText from "../../../components/Text";
import { images } from "../../../assets/pngs";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomButton from "../../../components/Button";
import { windowWidth } from "../../../utils/Commons/Dimention";
import CustomHeader from "../../../components/Header";
import CustomInput from "../../../components/Input";
const UploadStory = ({ navigation }: any) => {
  const FrameContainer = ({ onPress }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.photoFrameContainer}
      >
        <Image
          source={images.photo_upload}
          style={{
            width: sizeHelper.calWp(120),
            height: sizeHelper.calWp(120),
          }}
          resizeMode="contain"
        />
        <CustomText text={"Upload photo or video"} size={20} />
        <CustomText
          text={"than 5MB (PNG,JPG)"}
          color={theme.colors.dark_gray}
          size={19}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: sizeHelper.calWp(30),
        }}
      >
        <CustomHeader title={"Upload a story"} />
        <View
          style={{
            gap: sizeHelper.calHp(30),
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              gap: sizeHelper.calHp(30),
              alignItems: "center",
              paddingTop: sizeHelper.calHp(30),
              width: "100%",
            }}
          >
            <FrameContainer />

            <CustomInput
              mode={"none"}
              multiline={true}
              height={150}
              borderRadius={sizeHelper.calWp(20)}
              paddingTop={Platform.OS=="android"? sizeHelper.calHp(20):0}
              placeholder="Write something about it"
              backgroundColor={"transparent"}
            />
          </View>
        </View>

        <CustomButton
          bgColor={theme.colors.secondry}
          text="Post now"
        />
      </View>
    </SafeAreaView>
  );
};

export default UploadStory;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  photoFrameContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeHelper.calWp(35),
    width: windowWidth / 1.8,
    height: sizeHelper.calHp(320),
    gap: sizeHelper.calHp(8),
    paddingVertical: sizeHelper.calHp(30),
    borderWidth: sizeHelper.calWp(10),
    borderColor: "#C9C9C940",
    backgroundColor: theme.colors.white,
  },
});
