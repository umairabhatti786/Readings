import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../utils/Themes";
import { fonts } from "../../utils/Themes/fonts";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { useNavigation, useTheme } from "@react-navigation/native";
import { images } from "../../assets/pngs";
import { appStyles } from "../../utils/GlobalStyles";
import SwitchToggle from "react-native-switch-toggle";

const ToggleSwitch = ({ title, switchOn, onPress,titleSize }: any) => {
  return (
    <View style={appStyles.rowjustify}>
      {
        title&&(
          <CustomText
          text={title}
          // fontWeight="500"
          // fontFam={fonts.Outfit_Regular}
          size={titleSize ||25}
        />

        )
      }
     

      <SwitchToggle
        switchOn={switchOn}
        onPress={onPress}
        circleColorOff="#fff"
        circleColorOn="#fff"
        backgroundColorOn="#4136F1"
        backgroundColorOff="#F0F0F0"
        containerStyle={styles.toggleContainer}
        circleStyle={styles.circle}
      />
    </View>
  );
};
export default ToggleSwitch;

const styles = StyleSheet.create({
  backContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: sizeHelper.calWp(30),
  },
  toggleContainer: {
    width: sizeHelper.calWp(85),
    height: sizeHelper.calHp(40),
    borderRadius: 25,
    padding: sizeHelper.calWp(10),
    // padding: 5,
  },
  circle: {
    width: sizeHelper.calWp(32),
    height: sizeHelper.calWp(32),
    borderRadius: sizeHelper.calWp(35),
    // backgroundColor: 'white',
  },
});
