import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { windowWidth } from "../../utils/Commons/Dimention";
import { fonts } from "../../utils/Themes/fonts";
import { appStyles } from "../../utils/GlobalStyles";
import { images } from "../../assets/pngs";
import CustomButton from "../Button";
const EventCard = ({ item,onPress }: any) => {
  return (
    <TouchableOpacity
    onPress={onPress}
     style={styles.main}>
      <Image
        style={{
          width: "100%",
          height: sizeHelper.calWp(280),
          borderRadius: sizeHelper.calWp(35),
        }}
        source={item?.img}
      />
      <View
        style={{
          gap: sizeHelper.calHp(10),
          padding: sizeHelper.calWp(10),
          width:"85%"
        }}
      >
        <CustomText
          fontWeight="500"
          fontFam={fonts.Outfit_Regular}
          text={item?.title}
          size={24}
        />
        <CustomText text={"Sat 19 Jan - 6:00 AM"} size={22} />
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}>
          <Image
            style={{
              width: sizeHelper.calWp(35),
              height: sizeHelper.calWp(35),
            }}
            source={images.pin_location}
          />
          <CustomText
          numberOfLines={1}
            text={"4140 Parker Rd. Allentown, 1134"}
            color={theme.colors.dark_gray}
            size={19}
          />
        </View>
       
      </View>
    </TouchableOpacity>
  );
};
export default EventCard;

const styles = StyleSheet.create({
  main:{
    padding: sizeHelper.calWp(8),
    borderRadius: sizeHelper.calWp(35),
    width: "49%",
    backgroundColor: theme.colors.white,
    gap: sizeHelper.calWp(20),
  },

});
