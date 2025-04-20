import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import { images } from "../../../assets/pngs";
import sizeHelper from "../../../utils/Helpers";
import { fonts } from "../../../utils/Themes/fonts";
import { theme } from "../../../utils/Themes";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomButton from "../../../components/Button";
import ScreenSteps from "../../../components/ScreenSteps";
import { PersonalityType } from "../../../utils/Data";
import AddInterestModal from "./AddInterestModal";
import CustomSearch from "../../../components/Search";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const InterestsAndHobbies = ({ navigation }: any) => {
  const [selectedPersonality, setSelectedPersonality] = useState<any>("");
  const [isAddInterestVisible, setIsAddInterestVisible] = useState(false);
  const InterestContainer = ({ title, onPress, width }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          ...styles.intersetContainer,
          borderWidth: selectedPersonality == title ? -1 : 1,
          borderColor: selectedPersonality == title ? "transparent" : "#E4E2E2",
          backgroundColor:
            selectedPersonality == title
              ? theme.colors.primary
              : theme.colors.white,
        }}
      >
        <CustomText
          color={
            selectedPersonality == title
              ? theme.colors.white
              : theme.colors.gray_placeholder
          }
          text={title}
          size={23}
        />
        {selectedPersonality == title && (
          <Image
            source={images.check_box}
            style={{
              width: sizeHelper.calWp(32),
              height: sizeHelper.calWp(32),
            }}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <>
      <ScreenLayout
        backgroundSource={images.background_layout}
        style={{ padding: sizeHelper.calHp(30) }}
      >
         <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        // style={{ flex:1,backgroundColor:"red" }}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >

        
        <View
          style={{
            gap: sizeHelper.calHp(25),
            flex: 1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("BottomTab")}
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(15),
              alignSelf: "flex-end",
            }}
          >
            <CustomText text={"Skip"} size={27} />
            <Image style={styles.crossImg} source={images.cross} />
          </TouchableOpacity>
          <View
            style={{
              gap: sizeHelper.calHp(4),
              paddingTop: sizeHelper.calHp(40),
            }}
          >
            <CustomText
              text={"Let’s set up your profile"}
              style={{ textAlign: "center" }}
              color={theme.colors.dark_gray}
              size={20}
            />

            <CustomText
              text={"Interests and hobbies"}
              size={32}
              style={{ textAlign: "center" }}
              fontWeight="600"
              fontFam={fonts.Outfit_SemiBold}
            />
          </View>
          <ScreenSteps steps={[1, 2]} activeStep={2} />
          <View
            style={{
              gap: sizeHelper.calHp(20),
              paddingTop: sizeHelper.calHp(40),
              // backgroundColor:"red"
            }}
          >
            {/* <View style={{ height: sizeHelper.calHp(75) }}> */}
              <CustomSearch
              width={"95%"}
              // ContainerStyle={{elevation:2}}
                onAdd={() => setIsAddInterestVisible(true)}
                // backgroundColor={theme.colors.white}
                placeholder="Search .."
                isAdd={true}
              />
            {/* </View> */}
            <View
              style={{
                ...appStyles.row,
                gap: sizeHelper.calWp(20),
                flexWrap: "wrap",
              }}
            >
              {PersonalityType.map((item, index) => {
                return (
                  <InterestContainer
                    key={index.toString()}
                    onPress={() => setSelectedPersonality(item?.title)}
                    title={item?.title}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <CustomButton
          onPress={() => navigation.navigate("BottomTab")}
          bgColor={theme.colors.secondry}
          style={{marginTop:"20%"}}
          text="Proceed"
        />
              </KeyboardAwareScrollView>

      </ScreenLayout>

      <AddInterestModal
        modalVisible={isAddInterestVisible}
        setModalVisible={setIsAddInterestVisible}
      />
    </>
  );
};

export default InterestsAndHobbies;

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    height: sizeHelper.calHp(0.5),
    backgroundColor: "#9E9E9E",
  },
  checkBox: {
    width: sizeHelper.calWp(35),
    height: sizeHelper.calWp(35),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B1B1B1",
    borderRadius: sizeHelper.calWp(35),
  },
  intersetContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    minWidth: sizeHelper.calWp(300),
    paddingVertical: sizeHelper.calHp(30),
  },
  crossImg: {
    width: sizeHelper.calHp(20),
    height: sizeHelper.calHp(20),
    tintColor: theme.colors.black,
  },
});
