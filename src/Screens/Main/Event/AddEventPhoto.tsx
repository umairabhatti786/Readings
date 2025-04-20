import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomText from "../../../components/Text";
import { images } from "../../../assets/pngs";
import sizeHelper from "../../../utils/Helpers";
import { fonts } from "../../../utils/Themes/fonts";
import { theme } from "../../../utils/Themes";
import { appStyles } from "../../../utils/GlobalStyles";
import ScreenSteps from "../../../components/ScreenSteps";
import CustomHeader from "../../../components/Header";
import BottomSteps from "../../../components/Event/BottomSteps";
import { windowWidth } from "../../../utils/Commons/Dimention";
const AddEventPhoto = ({ navigation, route }: any) => {
  const selectedEvent = route?.params?.selectedEvent;
  const FrameContainer = ({ onPress }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.photoFrame}
      >
        <Image
          source={images.photo_upload}
          style={styles.photoImg}
          resizeMode="contain"
        />
        <CustomText
          text={"less than 5MB (PNG,JPG)"}
          style={{ textAlign: "center" }}
          color={theme.colors.dark_gray}
          size={15}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader />
          <View style={{ gap: sizeHelper.calHp(4) }}>
            <CustomText
              text={"Let’s create an event"}
              style={{ textAlign: "center" }}
              color={theme.colors.dark_gray}
              size={20}
            />

            <CustomText
              text={"2.  Add Event Photo"}
              size={37}
              style={{ textAlign: "center" }}
              fontWeight="600"
              fontFam={fonts.Outfit_SemiBold}
            />
          </View>

          <ScreenSteps
            activeStep={2}
            steps={
              selectedEvent?.title == "Private event" ? [1, 2, 3, 4] : [1, 2, 3]
            }
          />
          <View
            style={{
              gap: sizeHelper.calHp(10),
              alignItems: "center",
              paddingTop: sizeHelper.calHp(30),
            }}
          >
            <FrameContainer />
            <CustomText
              text={"Upload a photo to get people engaged  faster"}
              style={{ textAlign: "center", marginHorizontal: "25%" }}
              color={theme.colors.secondry}
              size={18}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: sizeHelper.calHp(30),
            paddingBottom: sizeHelper.calHp(30),
          }}
        >
          <BottomSteps
            activeStep={2}
            steps={selectedEvent.id == 1 ? 3 : 4}
            onNext={() =>
              navigation.navigate("DateTimeVenue", {
                selectedEvent: selectedEvent,
              })
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default AddEventPhoto;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  photoFrame: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeHelper.calWp(35),
    width: windowWidth / 2.3,
    height: sizeHelper.calHp(270),
    gap: sizeHelper.calHp(8),
    paddingVertical: sizeHelper.calHp(30),
    borderWidth: sizeHelper.calWp(10),
    borderColor: "#C9C9C960",
    backgroundColor: theme.colors.white,
  },
  photoImg: {
    width: sizeHelper.calWp(120),
    height: sizeHelper.calWp(120),
  },
});
