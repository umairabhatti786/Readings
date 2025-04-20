import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { windowWidth } from "../../utils/Commons/Dimention";
import { fonts } from "../../utils/Themes/fonts";
import CustomButton from "../Button";
const CreaterCard = ({ item,onPress }: any) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={{ width: windowWidth / 2.2, }}>
      <Image
        style={{
          width: "70%",
          height: sizeHelper.calWp(220),
          borderRadius: sizeHelper.calWp(35),
          position: "absolute",
          alignSelf: "center",
        }}
        source={item?.img}
      />

      <View
        style={styles.card}
      >
        <CustomText
          fontWeight="600"
          fontFam={fonts.Outfit_Medium}
          text={item?.user_name}
          size={23}
        />
        <CustomText text={item?.connection} size={20} />

        <CustomButton
          style={{ marginTop: sizeHelper.calHp(20) }}
          text="Connect"
          height={65}
          width={"90%"}
          bgColor={theme.colors.black}
          paddingHorizontal={sizeHelper.calWp(60)}
        />
      </View>
    </TouchableOpacity>
  );
};
export default CreaterCard;

const styles = StyleSheet.create({
  main: {
    padding: sizeHelper.calWp(8),
    borderRadius: sizeHelper.calWp(35),
    width: windowWidth / 1.2,
    backgroundColor: theme.colors.white,
    gap: sizeHelper.calWp(20),
    flexDirection: "row",
  },
  card:{
    padding: sizeHelper.calWp(8),
    borderRadius: sizeHelper.calWp(35),
    backgroundColor: theme.colors.white,
    gap: sizeHelper.calWp(10),
    alignItems: "center",
    marginTop: sizeHelper.calHp(80),
    zIndex: -1,
    paddingTop: sizeHelper.calHp(120),
    paddingBottom: sizeHelper.calHp(20),
  },
});
