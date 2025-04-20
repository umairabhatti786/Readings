import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { windowWidth } from "../../utils/Commons/Dimention";
import { appStyles } from "../../utils/GlobalStyles";
import { images } from "../../assets/pngs";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../utils/Themes/fonts";
const DiscoverEventCard = ({ item, mainWidth }: any) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EventDetails")}
      style={{ ...styles.main, width: mainWidth || windowWidth / 1.2 }}
    >
      <Image
        style={{
          width: "33%",
          height: sizeHelper.calWp(250),
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
        <View style={{ ...appStyles.row, gap: sizeHelper.calHp(10) }}
        >
          <CustomText 
          fontWeight="600"
          fontFam={fonts.Outfit_Medium}
          text={item?.title} size={26} />
        <CustomText text={"Sat 19 Jan - 6:00 AM"} size={18} />

        </View>
        
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}>
          <Image
            style={{
              width: sizeHelper.calWp(30),
              height: sizeHelper.calWp(30),
            }}
            source={images.pin_location}
          />
          <CustomText
            text={"4140 Parker Rd. Allentown, 1134"}
            color={theme.colors.dark_gray}
            size={16}
          />
        </View>

        <View
          style={{
            ...appStyles.row,
            flexWrap: "wrap",
            gap: sizeHelper.calWp(10),
          }}
        >
          {["Hiking", "Camping", "Rock Climbing"].map((it: any, ind: any) => {
            return (
              <View
                key={ind.toString()}
                style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}
              >
                <CustomText
                  numberOfLines={1}
                  text={`#${it}`}
                  // style={{ marginRight: sizeHelper.calWp(20) }}
                  size={21}
                  color={theme.colors.primary}
                />
              </View>
            );
          })}
        </View>
        <CustomText 
        color={theme.colors.primary}
        text={"(+3 more)"} size={18} />


        <View
          style={{
            ...appStyles.row,
          }}
        >
          {item?.users.map((it: any, ind: any) => {
            return (
              <Image
                key={ind.toString()}
                style={styles.usersImg}
                source={it?.img}
              />
            );
          })}
          <CustomText
            style={{ marginLeft: sizeHelper.calWp(50) }}
            text={"+ 20 Friends are going"}
            size={18}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default DiscoverEventCard;

const styles = StyleSheet.create({
  main: {
    padding: sizeHelper.calWp(8),
    borderRadius: sizeHelper.calWp(35),
    backgroundColor: theme.colors.white,
    gap: sizeHelper.calWp(20),
    flexDirection: "row",
  },
  usersImg: {
    width: sizeHelper.calWp(60),
    height: sizeHelper.calWp(60),
    borderRadius: sizeHelper.calWp(15),
    marginRight: sizeHelper.calWp(-40),
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
});
