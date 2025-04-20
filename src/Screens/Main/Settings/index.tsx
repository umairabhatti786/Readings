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
const SettingsScreen = ({ navigation }: any) => {
  const SettingContainer = ({ icon, title, onPress }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={appStyles.rowjustify}
      >
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
          <Image style={styles.icon} source={icon} resizeMode="contain" />
          <CustomText
            text={title}
            numberOfLines={1}
            fontWeight="500"
            fontFam={fonts.Outfit_Regular}
            size={23}
          />
        </View>

        <TouchableOpacity onPress={onPress}>
          <Image
            style={styles.settingIcon}
            source={images.setting_next}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const AccountSettings = () => {
    return (
      <View
        style={{
          ...styles.box,
        }}
      >
        <CustomText
          text={"Account settings"}
          numberOfLines={1}
          color={theme.colors.dark_gray}
          size={22}
        />
        <SettingContainer
          onPress={() => navigation.navigate("PasswordReset")}
          title={"Password reset"}
          icon={images.safety}
        />
        <SettingContainer
          onPress={() => navigation.navigate("AccountPrivacy")}
          title={"Account privacy (Public)"}
          icon={images.lock}
        />
      </View>
    );
  };

  const GeneralSettings = () => {
    return (
      <View
        style={{
          ...styles.box,
        }}
      >
        <CustomText
          text={"General settings"}
          numberOfLines={1}
          color={theme.colors.dark_gray}
          size={22}
        />
        <SettingContainer
          onPress={() => navigation.navigate("Notifications")}
          title={"Notifications"}
          icon={images.settng_noti}
        />
        <SettingContainer
          onPress={() => navigation.navigate("PermissionsScreen")}
          title={"Permissions"}
          icon={images.permissions}
        />
      </View>
    );
  };

  const ContentSettings = () => {
    return (
      <View
        style={{
          ...styles.box,
        }}
      >
        <CustomText
          text={"Content settings"}
          numberOfLines={1}
          color={theme.colors.dark_gray}
          size={22}
        />
        <SettingContainer
          onPress={() => navigation.navigate("AccountPrivacy")}
          title={"Account privacy (Public)"}
          icon={images.lock}
        />

        <SettingContainer
          onPress={() => navigation.navigate("BlockedScreen")}
          title={"Blocked"}
          icon={images.blocked}
        />
        <SettingContainer
          onPress={() => navigation.navigate("RestrictedScreen")}
          title={"Restricted"}
          icon={images.block_user}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <CustomHeader title={"Settings"} />

        {/* Personal info */}
        <AccountSettings />
        <ContentSettings />
        <GeneralSettings />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}
        >
          <Image
            style={styles.icon}
            source={images.log_out}
            resizeMode="contain"
          />
          <CustomText
            text={"Log Out"}
            numberOfLines={1}
            fontWeight="500"
            color={theme.colors.logout}
            fontFam={fonts.Outfit_Regular}
            size={23}
          />
        </TouchableOpacity>
        {/* Social links*/}

        {/* Interests*/}
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  box: {
    backgroundColor: theme.colors.white,
    padding: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calWp(30),
  },
  icon: { width: sizeHelper.calWp(45), height: sizeHelper.calWp(45) },
  settingIcon: { width: sizeHelper.calWp(32), height: sizeHelper.calWp(32) },

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
