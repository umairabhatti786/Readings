import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { appStyles } from "../../utils/GlobalStyles";
import { images } from "../../assets/pngs";

const SociallinkCard = ({ item, onPress, isNext }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        ...appStyles.rowjustify,
        ...styles.box,
        borderRadius: sizeHelper.calWp(30),
      }}
    >
      <View
        style={{
          ...appStyles.row,
          gap: sizeHelper.calWp(20),
        }}
      >
        <Image style={styles.socialImg} source={item?.img} />

        <CustomText text={item?.name} numberOfLines={1} size={22} />
      </View>

      <TouchableOpacity
        //   onPress={() => setIsActionVisible(!isActionVisible)}
        style={styles.settingBox}
      >
        <Image
          style={{ width: "40%", height: "40%" }}
          source={isNext ? images.next : images.edit_icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default SociallinkCard;

const styles = StyleSheet.create({
  box: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: sizeHelper.calWp(30),
    paddingVertical: sizeHelper.calWp(20),

    gap: sizeHelper.calHp(20),
  },

  socialImg: {
    width: sizeHelper.calWp(67),
    height: sizeHelper.calWp(67),
    borderRadius: sizeHelper.calWp(20),
  },

  settingBox: {
    width: sizeHelper.calWp(75),
    height: sizeHelper.calWp(75),
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: sizeHelper.calWp(25),
  },
});
