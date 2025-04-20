import { Image, StyleSheet, TouchableOpacity } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
type Props = {
  icon?: any;
  onPress?: () => void;
  title?: any;
  width?: any;
};

const SocialButton = ({ icon, onPress, title, width }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        width: width,
        flex: 1,
        height: sizeHelper.calHp(80),
        backgroundColor: "#F6F6F6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: sizeHelper.calHp(18),
        gap: sizeHelper.calWp(20),
        flexDirection: "row",
      }}
    >
      <Image source={icon} style={styles.socialImg} resizeMode="contain" />
      <CustomText text={title} size={23} />
    </TouchableOpacity>
  );
};
export default SocialButton;

const styles = StyleSheet.create({
  socialBtn: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calWp(80),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(70),
    backgroundColor: "#ECECEC",
  },
  socialImg: {
    width: sizeHelper.calWp(42),
    height: sizeHelper.calWp(42),
  },
});
