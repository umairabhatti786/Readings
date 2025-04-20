import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { appStyles } from "../../utils/GlobalStyles";
import { fonts } from "../../utils/Themes/fonts";
import CustomButton from "../Button";
import { images } from "../../assets/pngs";
import { useState } from "react";

const PeopleCard = ({ item, onPress, isSetting,ButtonText,disableConnect }: any) => {
  const [isActionVisible, setIsActionVisible] = useState<boolean>(false);

  return (
    <View>
      <View
        style={{
          ...appStyles.rowjustify,
          ...styles.box,
          marginLeft: sizeHelper.calHp(20),
          borderRadius: sizeHelper.calWp(30),
        }}
      >
        <View
          style={{
            ...appStyles.row,
            gap: sizeHelper.calWp(20),
            marginLeft: sizeHelper.calWp(-40),
          }}
        >
          <Image style={styles.userImg} source={item?.img} />

          <View style={{ gap: sizeHelper.calWp(10) }}>
            <CustomText
              text={item?.name}
              numberOfLines={1}
              fontWeight="600"
              fontFam={fonts.Outfit_Medium}
              size={25}
            />

            <CustomText text={item?.connection} numberOfLines={1} size={18} />
          </View>
        </View>
        {
          !disableConnect&&(
            <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
            <CustomButton
              text={ButtonText ||"Connect"}
              paddingHorizontal={sizeHelper.calWp(40)}
              height={60}
              bgColor={theme.colors.black}
            />
            {isSetting && (
              <TouchableOpacity
                onPress={() => setIsActionVisible(!isActionVisible)}
                style={styles.settingBox}
              >
                <Image
                  style={{ width: "50%", height: "50%" }}
                  source={images.setting}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>

          )
        }
      
      </View>
      {isActionVisible && (
        <View style={styles.settingContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsActionVisible(false);
              // navigation.navigate('EditAppointment', {detail: detail});
            }}
            style={{ width: "100%" }}
          >
            <CustomText 
            fontWeight="500"
            fontFam={fonts.Outfit_Regular}
            text={ "Block"} numberOfLines={1} size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "100%" }}>
            <CustomText
             fontWeight="500"
             fontFam={fonts.Outfit_Regular}
             text={"Restrict"} numberOfLines={1} size={22} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default PeopleCard;

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

  box: {
    backgroundColor: theme.colors.white,
    padding: sizeHelper.calWp(20),
    gap: sizeHelper.calHp(20),
  },

  actionContainer: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calWp(80),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(20),
  },

  settingContainer: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.colors.white,
    right: sizeHelper.calWp(50),
    zIndex: 999,
    top: sizeHelper.calHp(110),
    padding: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(10),
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 5,
    borderTopLeftRadius: sizeHelper.calWp(30),
    borderBottomLeftRadius: sizeHelper.calWp(30),
    borderBottomRightRadius: sizeHelper.calWp(30),
  },
  userImg: {
    width: sizeHelper.calWp(110),
    height: sizeHelper.calWp(110),
    borderRadius: sizeHelper.calWp(30),
  },

  settingBox: {
    width: sizeHelper.calWp(75),
    height: sizeHelper.calWp(75),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    borderRadius: sizeHelper.calWp(25),
  },
});
