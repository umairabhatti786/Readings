import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import sizeHelper from "../../utils/Helpers";
import { appStyles } from "../../utils/GlobalStyles";
import { theme } from "../../utils/Themes";
import CustomText from "../Text";
import { images } from "../../assets/pngs";
import { useNavigation } from "@react-navigation/native";

type Props = {
  activeStep?: number;
  steps?: number;
  onNext?: () => void;
};

const BottomSteps = ({ activeStep = 1, steps = 3, onNext }: Props) => {
  const navigation = useNavigation();

  const stepText = useMemo(() => `${activeStep}/${steps}`, [activeStep, steps]);

  const buttonContainerStyle = useMemo(() => styles.buttonContainer, []);
  const iconStyle = useMemo(() => styles.backIcon, []);

  return (
    <View
      style={{
        ...appStyles.rowjustify,
        gap: sizeHelper.calWp(10),
        paddingHorizontal: sizeHelper.calWp(60),
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={buttonContainerStyle}>
        <Image style={iconStyle} source={images.calendar_back} />
        <CustomText text={"Back"} color={theme.colors.white} size={20} />
      </TouchableOpacity>

      <CustomText text={stepText} size={25} />

      <TouchableOpacity onPress={onNext} style={buttonContainerStyle}>
        <CustomText text={"Next"} color={theme.colors.white} size={20} />
        <Image style={iconStyle} source={images.calendar_next} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(BottomSteps);

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: sizeHelper.calWp(35),
    paddingVertical: sizeHelper.calHp(20),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: theme.colors.black,
    gap: sizeHelper.calWp(10),
    borderRadius: sizeHelper.calWp(20),
  },
  backIcon: {
    width: sizeHelper.calWp(20),
    height: sizeHelper.calWp(20),
    tintColor: theme.colors.white,
    resizeMode: "contain",
  },
});
