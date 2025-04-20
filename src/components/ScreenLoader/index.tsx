import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { theme } from "../../utils/Themes";
import sizeHelper from "../../utils/Helpers";
import { images } from "../../assets/pngs";
import CustomText from "../Text";

const ScreenLoader = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: 1,
        position: "absolute",
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        gap: sizeHelper.calHp(20),
      }}
    >
      <Image
        style={{ width: sizeHelper.calWp(80), height: sizeHelper.calWp(80) }}
        source={images.loader}
      />

      <CustomText text={"Saving changes"} size={20} />
    </View>
  );
};

export default ScreenLoader;
