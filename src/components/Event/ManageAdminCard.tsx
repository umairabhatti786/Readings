import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { theme } from "../../utils/Themes";
import { appStyles } from "../../utils/GlobalStyles";
import { fonts } from "../../utils/Themes/fonts";
import CustomButton from "../Button";
import { images } from "../../assets/pngs";
import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";
import Collapsible from 'react-native-collapsible';

const ManageAdminCard = ({ item, onPress, isSetting, ButtonText }: any) => {
  const [isActionVisible, setIsActionVisible] = useState<boolean>(true);
  const [isToggleEnable,setIsToggleEnable]=useState(false)

  return (
    <View
    style={{
          ...styles.box,
          marginLeft: sizeHelper.calHp(20),
          borderRadius: sizeHelper.calWp(30),
        }}
    >
         
      <View
        style={{
          ...appStyles.rowjustify,
     
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

          <View style={{ gap: sizeHelper.calWp(7) }}>
            <CustomText
              text={item?.name}
              numberOfLines={1}
              fontWeight="600"
              fontFam={fonts.Outfit_Medium}
              size={27}
            />

            <CustomText text={item?.connection} numberOfLines={1} size={19} />
          </View>
        </View>
        <TouchableOpacity
            onPress={()=>setIsActionVisible(!isActionVisible)}
        style={{ ...appStyles.row, gap: sizeHelper.calWp(30) }}>
            <TouchableOpacity
            onPress={()=>setIsActionVisible(!isActionVisible)}
            style={{padding:sizeHelper.calWp(10),}}
            >
            <Image
              style={{
                width: sizeHelper.calWp(27),
                height: sizeHelper.calWp(27),
              }}
              source={ !isActionVisible?images.up_arrow: images.down}
              resizeMode="contain"
            />

            </TouchableOpacity>
         
          

            <Image
              style={{
                width: sizeHelper.calWp(35),
                height: sizeHelper.calWp(35),
              }}
              source={images.flled_check}
              resizeMode="contain"
            />
        </TouchableOpacity>
      </View>
      <Collapsible
      collapsed={isActionVisible}
      >

      <View
          style={{
            ...appStyles.rowjustify,
            gap: sizeHelper.calWp(20),
            marginLeft: sizeHelper.calWp(80),
          }}
        >
             <CustomText
              text={"Add this person as admin"}
            //   numberOfLines={1}
            //   fontWeight="600"
              color={theme.colors.dark_gray}
              fontFam={fonts.Outfit_Medium}
              size={20}
            />
             <ToggleSwitch
            // title={"General Notification"}
            switchOn={isToggleEnable}
            onPress={() => setIsToggleEnable(!isToggleEnable)}
          />
            </View>
            </Collapsible>


    </View>
  );
};
export default ManageAdminCard;

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
    gap: sizeHelper.calHp(10),
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
    gap: sizeHelper.calHp(20),
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
