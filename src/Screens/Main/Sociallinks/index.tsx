import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import { FollowUp, peopleData, socialLinkData } from "../../../utils/Data";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import { fonts } from "../../../utils/Themes/fonts";
import { images } from "../../../assets/pngs";
import CustomButton from "../../../components/Button";
import SociallinkCard from "../../../components/SociallinkCard";
const SociallinksScreen = ({ navigation }: any) => {
  const Header = () => {
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
              source={images.back_round}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <CustomText
            text={"Social links"}
            fontWeight="500"
            fontFam={fonts.Outfit_Regular}
            size={28}
          />
        </View>
        <TouchableOpacity
        onPress={()=>navigation.navigate("AddSociallink")}
          style={{
            paddingHorizontal: sizeHelper.calWp(35),
            paddingVertical:sizeHelper.calHp(15),
            backgroundColor: theme.colors.black,
            alignItems: "center",
            justifyContent: "center",
            borderRadius:sizeHelper.calWp(20)
          }}
        >
             <CustomText
            text={"+ Add"}
            // fontWeight="500"
            color={theme.colors.white}
            size={23}
          />

        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <Header />

        <FlatList
            data={socialLinkData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calWp(25),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              return <SociallinkCard mainWidth={"100%"} item={item} />;
            }}
          />

       
      </View>
    </SafeAreaView>
  );
};

export default SociallinksScreen;

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
  backContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: sizeHelper.calWp(30),
  },
});
