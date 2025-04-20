import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";

const StoryCard = ({ item,onPress }: any) => {
  return (
    <TouchableOpacity
    onPress={onPress}
     style={styles.main}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={item?.img} />
      </View>
      <CustomText text={item?.name} size={18} />
    </TouchableOpacity>
  );
};
export default StoryCard;

const styles = StyleSheet.create({
  main: { alignItems: "center", gap: sizeHelper.calHp(10) },
  imgContainer: {
    padding: sizeHelper.calWp(5),
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: sizeHelper.calWp(35),
  },
  img: {
    width: sizeHelper.calWp(100),
    height: sizeHelper.calWp(100),
    borderRadius: sizeHelper.calWp(35),
  },
});
