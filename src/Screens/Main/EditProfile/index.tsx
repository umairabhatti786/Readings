import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import { FollowUp } from "../../../utils/Data";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import { fonts } from "../../../utils/Themes/fonts";
import { images } from "../../../assets/pngs";
import CustomButton from "../../../components/Button";
const EditProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <CustomHeader title={"Edit profile"} />

        {/* Personal info */}

        <View
          style={{
            ...styles.box,
          }}
        >
          <View style={appStyles.rowjustify}>
            <CustomText
              text={"Personal info"}
              numberOfLines={1}
              fontWeight="600"
              fontFam={fonts.Outfit_Medium}
              size={25}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("PersonalInfo")}
            >
              <Image
                style={styles.icon}
                source={images.edit_icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(20),
            }}
          >
            <Image style={styles.userImg} source={images.user1} />
            <View>
              <CustomText
                text={"John Snow"}
                numberOfLines={1}
                fontWeight="600"
                fontFam={fonts.Outfit_SemiBold}
                size={40}
              />
              <CustomText text={"@john-12"} numberOfLines={1} size={22} />
            </View>
          </View>

          <CustomText
            style={{ width: "95%", marginTop: sizeHelper.calHp(20) }}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed deiusmod."
            }
            size={22}
          />
        </View>

        {/* Social links*/}

        <View
          style={{
            ...styles.box,
          }}
        >
          <View style={appStyles.rowjustify}>
            <CustomText
              text={"Social links"}
              numberOfLines={1}
              fontWeight="600"
              fontFam={fonts.Outfit_Medium}
              size={25}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("Sociallinks")}
            >
              <Image
                style={styles.icon}
                source={images.edit_icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(15),
            }}
          >
            {FollowUp.map((it: any, ind: any) => {
              return (
                <Image
                  key={ind.toString()}
                  style={styles.followImg}
                  source={it?.img}
                />
              );
            })}
          </View>
        </View>

        {/* Interests*/}

        <View
          style={{
            ...styles.box,
          }}
        >
          <View style={appStyles.rowjustify}>
            <CustomText
              text={"Interests"}
              numberOfLines={1}
              fontWeight="600"
              fontFam={fonts.Outfit_Medium}
              size={25}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("Interests")}
            >
              <Image
                style={styles.icon}
                source={images.edit_icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(15),
              flexWrap: "wrap",
            }}
          >
            {["Hiking", "Camping", "Cycling", "Rock Climbing", "Kayaking"].map(
              (it: any, ind: any) => {
                return (
                  <CustomButton
                    key={ind.toString()}
                    text={it}
                    disable={true}
                    paddingHorizontal={sizeHelper.calWp(40)}
                    borderRadius={999}
                    bgColor={theme.colors.search_background}
                    textColor={theme.colors.black}
                    height={65}
                  />
                );
              }
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  box: {
    backgroundColor: theme.colors.white,
    padding: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(20),
    borderRadius: sizeHelper.calWp(30),
  },
  icon: { width: sizeHelper.calWp(32), height: sizeHelper.calWp(32) },

  userImg: {
    width: sizeHelper.calWp(170),
    height: sizeHelper.calWp(170),
    borderRadius: sizeHelper.calWp(50),
  },

  followImg: {
    width: sizeHelper.calWp(65),
    height: sizeHelper.calWp(65),
  },
});
