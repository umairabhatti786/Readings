import { Image, StyleSheet, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { windowWidth } from "../../utils/Commons/Dimention";
import { fonts } from "../../utils/Themes/fonts";
import { appStyles } from "../../utils/GlobalStyles";
import { images } from "../../assets/pngs";
import CustomButton from "../Button";
const CreatedByFriendEventCard = ({ item }: any) => {
  return (
    <View style={styles.main}>
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
        }}
      >
        <CustomText
          fontWeight="600"
          fontFam={fonts.Outfit_Medium}
          text={item?.title}
          size={26}
        />
        <CustomText text={"Sat 19 Jan - 6:00 AM"} size={23} />
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}>
          <Image
            style={{
              width: sizeHelper.calWp(35),
              height: sizeHelper.calWp(35),
            }}
            source={images.pin_location}
          />
          <CustomText
            text={"4140 Parker Rd. Allentown, 1134"}
            color={theme.colors.dark_gray}
            size={20}
          />
        </View>
        <View
          style={{
            ...appStyles.rowjustify,
            paddingVertical: sizeHelper.calHp(20),
          }}
        >
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(10),
              width: "47%",
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(80),
                height: sizeHelper.calWp(80),
                borderRadius: sizeHelper.calWp(25),
              }}
              source={images.user3}
            />
            <View style={{ gap: sizeHelper.calWp(4) }}>
              <CustomText
                fontFam={fonts.Outfit_Regular}
                fontWeight="500"
                numberOfLines={1}
                text={"Malisa Stedman"}
                size={20}
              />
              <CustomText text={"Creator"} size={20} />
            </View>
          </View>
          <CustomButton
            text="Going"
            height={65}
            bgColor={theme.colors.black}
            paddingHorizontal={sizeHelper.calWp(30)}
          />
        </View>
      </View>
    </View>
  );
};
export default CreatedByFriendEventCard;

const styles = StyleSheet.create({
  main:{
    padding: sizeHelper.calWp(8),
    borderRadius: sizeHelper.calWp(35),
    width: windowWidth / 1.6,
    backgroundColor: theme.colors.white,
    gap: sizeHelper.calWp(20),
  },

});
