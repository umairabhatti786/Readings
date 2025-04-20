import React, { useEffect, useState } from "react";
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
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import { images } from "../../../assets/pngs";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const PersonalInfoScreen = ({ navigation }: any) => {
  const [first_name, setFirst_name] = useState("John");
  const [last_name, setLast_name] = useState("@john-12");
  const [username, setUsername] = useState("@john-12");
  const [about_me, setAbout_me] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed deiusmod. Sit amet, consectetur adipiscing elit,"
  );

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "space-between",
          paddingBottom: sizeHelper.calHp(15),
        }}
      >
        <View style={appStyles.Container}>
          <CustomHeader title={"Personal info"} />

          {/* Personal info */}

          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Image style={styles.userImg} source={images.user1} />

            <TouchableOpacity style={styles.editAbsolute}>
              <Image
                style={{
                  width: sizeHelper.calWp(30),
                  height: sizeHelper.calWp(30),
                }}
                source={images.edit_icon}
              />
            </TouchableOpacity>
          </View>

          <View style={{ gap: sizeHelper.calHp(25), width: "100%" }}>
            <View style={appStyles.rowjustify}>
              <CustomInput
                width={"48%"}
                value={first_name}
                backgroundColor={theme.colors.background}
                label="First name"
                onChangeText={(txt: string) => setFirst_name(txt)}
              />
              <CustomInput
                width={"48%"}
                value={last_name}
                backgroundColor={theme.colors.background}
                label="Last name"
                onChangeText={(txt: string) => setLast_name(txt)}
              />
            </View>

            <CustomInput
              value={username}
              backgroundColor={theme.colors.background}
              label="Username"
              onChangeText={(txt: string) => setUsername(txt)}
            />
            <View style={{ gap: sizeHelper.calHp(10) }}>
              <CustomInput
                value={about_me}
                height={150}
                multiline={true}
                textAlignVertical={"top"}
                backgroundColor={theme.colors.background}
                label="About me"
                onChangeText={(txt: string) => setAbout_me(txt)}
              />

              <CustomText
                size={20}
                color={theme.colors.dark_gray}
                text={"0/200 characters"}
              />
            </View>
          </View>
        </View>
        <CustomButton
          style={{
            marginHorizontal: sizeHelper.calWp(30),
            marginTop: "65%",
          }}
          text="Update"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;

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

  editAbsolute: {
    borderRadius: 999,
    backgroundColor: theme.colors.white,
    position: "absolute",
    right: sizeHelper.calWp(-20),
    bottom: sizeHelper.calHp(10),
    padding: sizeHelper.calWp(15),
  },
  icon: { width: sizeHelper.calWp(32), height: sizeHelper.calWp(32) },

  userImg: {
    width: sizeHelper.calWp(220),
    height: sizeHelper.calWp(220),
    borderRadius: sizeHelper.calWp(60),
  },

  followImg: {
    width: sizeHelper.calWp(65),
    height: sizeHelper.calWp(65),
  },
});
