import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../utils/Themes";
import { fonts } from "../../utils/Themes/fonts";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { useNavigation, useTheme } from "@react-navigation/native";
import { images } from "../../assets/pngs";
import { appStyles } from "../../utils/GlobalStyles";
const CustomHeader = ({ title, isSetting,backSource }: any) => {
  const navigation: any = useNavigation();
  const { colors }: any = useTheme(); // Get the current theme's colors

  return (
    <View style={appStyles.rowjustify}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: sizeHelper.calWp(20),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}
        >
          <Image
            style={{ width: "50%", height: "50%" }}
            source={backSource||  images.back_round}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {
          title&&(

            <CustomText
            text={title}
            color={colors.text}
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
            size={28}
          />
          )
        }

       
      </View>
      {isSetting && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}
        >
          <Image
            style={{ width: "50%", height: "50%" }}
            source={images.setting}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  backContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: sizeHelper.calWp(30),
  },
});
