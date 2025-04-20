import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import ToggleSwitch from "../../../components/ToggleSwitch";
const AccountPrivacyScreen = ({ navigation, route }: any) => {
  const [isToggle, setIsToggle] = useState(true);

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader title={"Account privacy"} />
          <ToggleSwitch
            title={"Private account"}
            switchOn={isToggle}
            onPress={() => setIsToggle(!isToggle)}
          />
          <CustomText
            text={
              "When your account is public everyone can see your profile and the events created by you.\n\nWhen your account is private only your circle can see your full profile and the content you create (events, stories)."
            }
            color={theme.colors.gray_text}
            size={20}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default AccountPrivacyScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
