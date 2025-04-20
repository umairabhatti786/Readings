import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { images } from "../../assets/pngs";
import { appStyles } from "../../utils/GlobalStyles";
import { fonts } from "../../utils/Themes/fonts";

const RequestCard = ({ item,onPress }: any) => {
  return (
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
          <Image
            style={styles.userImg}
            source={item?.img}
          />

          <View >
            <View style={{ ...appStyles.row, gap: sizeHelper.calWp(5) }}>
              <CustomText
                text={item?.name}
                numberOfLines={1}
                fontWeight="600"
                fontFam={fonts.Outfit_Medium}
                size={25}
              />
              <CustomText
                color={theme.colors.gray_text}
                style={{ textAlign: "justify", marginTop: sizeHelper.calHp(5) }}
                text={"with similar"}
                numberOfLines={1}
                size={18}
              />
            </View>

            <CustomText
              color={theme.colors.gray_text}
              text={item?.message}
              numberOfLines={1}
              size={18}
            />
            <CustomText
              color={theme.colors.gray_text}
              text={item?.date}
              size={18}
            />
          </View>
        </View>

        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
          <TouchableOpacity
            style={{
              ...styles.actionContainer,
              backgroundColor: "#CE000010",
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(27),
                height: sizeHelper.calWp(27),
                tintColor: "#CE0000",
              }}
              source={images.cross}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.actionContainer,
              backgroundColor: theme.colors.primary + "10",
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(30),
                height: sizeHelper.calWp(30),
              }}
              source={images.tick}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
  );
};
export default RequestCard;

const styles = StyleSheet.create({
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
      userImg:{
        width: sizeHelper.calWp(110),
        height: sizeHelper.calWp(110),
        borderRadius: sizeHelper.calWp(30),
      }
});
