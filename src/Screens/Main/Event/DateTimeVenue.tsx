import React, { useEffect, useState } from "react";
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
import ScreenLoader from "../../../components/ScreenLoader";
const DateTimeVenue = ({ navigation, route }: any) => {
  const selectedEvent = route?.params?.selectedEvent;
  const [loading, setloading] = useState(false);
  const [isEventCreated, setIsEventCreated] = useState(false);
  const DatePickerContainer = ({ onPress, label, width }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={{ ...styles.dateContainer, width: width || "48%" }}
      >
        <CustomText
          text={label}
          color={theme.colors.gray_placeholder}
          size={22}
        />
        <Image source={images.down} style={styles.icon} resizeMode="contain" />
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
              text={"3.  Date, time & venue"}
              size={37}
              style={{ textAlign: "center" }}
              fontWeight="600"
              fontFam={fonts.Outfit_SemiBold}
            />
          </View>
          <ScreenSteps
            steps={
              selectedEvent?.title == "Private event" ? [1, 2, 3, 4] : [1, 2, 3]
            }
            activeStep={3}
          />
          <View
            style={{
              gap: sizeHelper.calHp(20),
            }}
          >
            <View
              style={{ ...appStyles.rowjustify, gap: sizeHelper.calWp(20) }}
            >
              <DatePickerContainer label={"Starting date"} />

              <DatePickerContainer label={"End date (optional)"} />
            </View>
            <DatePickerContainer width={"100%"} label={"Time"} />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: sizeHelper.calHp(30),
            paddingBottom: sizeHelper.calHp(30),
          }}
        >
          <BottomSteps
            steps={selectedEvent.id == 1 ? 3 : 4}
            onNext={() => {
              if (selectedEvent?.title == "Private event") {
                navigation.navigate("ManageinvitesAndAdmins");

                return;
              }
              setloading(true);
              setTimeout(() => {
                setloading(false);
                setIsEventCreated(true);
              }, 2000);
            }}
            activeStep={3}
          />
        </View>
      </SafeAreaView>
      {loading && <ScreenLoader />}
      {isEventCreated && (
        <View
          style={{
            width: "100%",
            height: "100%",
            zIndex: 1,
            position: "absolute",
            backgroundColor: theme.colors.background,
            padding: sizeHelper.calHp(30),

            gap: sizeHelper.calHp(20),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("BottomTab")}
            style={appStyles.backBtn}
          >
            <Image
              style={{ width: "35%", height: "35%" }}
              source={images.cross}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              height: "20%",
            }}
          />

          <Image
            style={{
              width: sizeHelper.calWp(400),
              height: sizeHelper.calWp(400),
              alignSelf: "center",
            }}
            source={images.happiness}
          />
          <CustomText
            fontFam={fonts.Outfit_SemiBold}
            fontWeight="600"
            style={{ textAlign: "center" }}
            text={"Event created successfullys"}
            size={30}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("EventDetails")}
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(15),
              alignSelf: "center",
            }}
          >
            <CustomText
              text={"Saving changes"}
              color={theme.colors.primary}
              size={20}
            />
            <Image
              style={{
                width: sizeHelper.calWp(20),
                height: sizeHelper.calWp(20),
                resizeMode: "contain",
              }}
              source={images.next_arrow}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DateTimeVenue;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  dateContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    borderRadius: sizeHelper.calWp(20),
    // flex:1,
    gap: sizeHelper.calHp(8),
    height: sizeHelper.calHp(80),
    paddingHorizontal: sizeHelper.calWp(20),
    borderWidth: 1,
    borderColor: "#E4E2E2",
  },
  icon: {
    width: sizeHelper.calWp(25),
    height: sizeHelper.calWp(25),
  },
});
