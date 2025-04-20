import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { TextType } from "../../utils/Types";
import { theme } from "../../utils/Themes";
import { fonts } from "../../utils/Themes/fonts";
import sizeHelper from "../../utils/Helpers";
import { images } from "../../assets/pngs";
import CustomText from "../Text";
const AddStory = ({onPress}:any) => {
  return (
    <TouchableOpacity
    onPress={onPress}
     style={styles.main}>
      <View
        style={{
          borderRadius: sizeHelper.calWp(35),
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            width: sizeHelper.calWp(115),
            height: sizeHelper.calWp(115),
            borderRadius: sizeHelper.calWp(35),
          }}
          source={images.user1}
        />
        <View style={styles.absoluteContainer}>
          <TouchableOpacity
              onPress={onPress}

            style={styles.addImgContainer}
          >
            <Image
              style={styles.addImg}
              source={images.plus}
            />
          </TouchableOpacity>
        </View>
      </View>
      <CustomText color={theme.colors.dark_gray} text={"You"} size={18} />
    </TouchableOpacity>
  );
};
export default AddStory;

const styles = StyleSheet.create({
  main: { alignItems: "center", gap: sizeHelper.calHp(10) },
  absoluteContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primary + "60",
    alignItems: "center",
    justifyContent: "center",
  },
  addImgContainer:{
    padding: sizeHelper.calWp(15),
    backgroundColor: theme.colors.white,
    borderRadius: sizeHelper.calWp(20),
    alignItems: "center",
    justifyContent: "center",
  },
  addImg:{
    width: sizeHelper.calWp(20),
    height: sizeHelper.calWp(20),
  }
});
