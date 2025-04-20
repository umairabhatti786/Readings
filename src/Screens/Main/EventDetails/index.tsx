import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { theme } from "../../../utils/Themes";
import sizeHelper from "../../../utils/Helpers";
import CustomButton from "../../../components/Button";
import { appStyles } from "../../../utils/GlobalStyles";
import { images } from "../../../assets/pngs";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const EventDetails = ({ navigation }: any) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const peoples = [
    { img: images.user2 },
    { img: images.user3 },
    { img: images.user4 },
  ];

  const Header = () => {
    return (
      <View style={{ ...styles.box, marginTop: sizeHelper.calHp(-80) }}>
        <View
          style={{
            ...appStyles.rowjustify,
          }}
        >
          <View style={{ gap: sizeHelper.calWp(8) }}>
            <CustomText
              text={"Forest camping"}
              fontWeight="600"
              fontFam={fonts.Outfit_Medium}
              size={32}
            />
            <CustomText text={"Sat 19 Jan - 6:00 AM"} size={20} />
          </View>
          <CustomButton
            height={50}
            borderRadius={999}
            text="Public - Open to all"
            size={18}
            paddingHorizontal={sizeHelper.calWp(20)}
            bgColor={theme.colors.green}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: sizeHelper.calHp(1),
            backgroundColor: "#F0F0F0",
          }}
        />
        <CustomText
          text={"Hosted by:"}
          color={theme.colors.dark_gray}
          size={20}
        />

        <View
          style={{
            ...appStyles.rowjustify,
          }}
        >
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
            <Image
              style={{
                width: sizeHelper.calWp(90),
                height: sizeHelper.calWp(90),
                borderRadius: sizeHelper.calWp(25),
              }}
              source={images.user1}
            />
            <View style={{ gap: sizeHelper.calWp(8) }}>
              <CustomText
                text={"Jane Cooper"}
                fontFam={fonts.Outfit_Regular}
                fontWeight="500"
                size={25}
              />
              <CustomText text={"+300 connection"} size={20} />
            </View>
          </View>
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
            <CustomText text={"View profile"} size={20} />
            <Image
              style={{
                width: sizeHelper.calWp(25),
                height: sizeHelper.calWp(25),
                tintColor: theme.colors.black,
              }}
              source={images.next_arrow}
            />
          </View>
        </View>
      </View>
    );
  };

  const EventDescription = () => {
    return (
      <View style={styles.box}>
        <CustomText
          text={"Event description"}
          fontFam={fonts.Outfit_Medium}
          fontWeight="600"
          size={30}
        />
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(30) }}>
          <CustomText text={"#Hiking"} color={theme.colors.primary} size={23} />
          <CustomText
            text={"#Camping"}
            color={theme.colors.primary}
            size={23}
          />
          <CustomText
            text={"#Rock Climbing"}
            color={theme.colors.primary}
            size={23}
          />
        </View>

        <CustomText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          }
          color={theme.colors.dark_gray}
          size={23}
        />
        <CustomText
          text={
            "1. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
          color={theme.colors.dark_gray}
          size={23}
        />
        <CustomText
          text={
            "2. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
          color={theme.colors.dark_gray}
          size={23}
        />
      </View>
    );
  };

  const LocationContainer = () => {
    return (
      <View style={styles.box}>
        <CustomText
          text={"location"}
          fontFam={fonts.Outfit_Medium}
          fontWeight="600"
          size={30}
        />
        <View
          style={{ borderRadius: sizeHelper.calWp(20), overflow: "hidden" }}
        >
          <MapView
            zoomControlEnabled={false}
            showsBuildings={true}
            style={{
              height: sizeHelper.calHp(200),
              width: "100%",
              borderRadius: sizeHelper.calWp(20),
            }}
          ></MapView>
        </View>

        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(10) }}>
          <Image
            style={{
              width: sizeHelper.calWp(30),
              height: sizeHelper.calWp(30),
            }}
            source={images.pin_location}
            resizeMode="contain"
          />

          <CustomText
            text={"4140 Parker Rd. Allentown richies place 011ER, 1134"}
            color={theme.colors.dark_gray}
            size={20}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <ScrollView
        style={styles.main}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: sizeHelper.calHp(40),
          gap: sizeHelper.calWp(20),
        }}
      >
        <View style={styles.headerImg}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={images.event1}
          />
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
        </View>
        <Header />
        <View style={styles.box}>
          <View style={appStyles.rowjustify}>
            <TouchableOpacity
              onPress={() => navigation.navigate("GuestUser")}
              style={{
                ...appStyles.row,
              }}
            >
              {peoples.map((it: any, ind: any) => {
                return (
                  <Image
                    key={ind.toString()}
                    style={styles.peopleImg}
                    source={it?.img}
                  />
                );
              })}
              <View
                style={{
                  gap: sizeHelper.calHp(7),
                  marginLeft: sizeHelper.calWp(60),
                }}
              >
                <CustomText
                  text={"View guest list"}
                  fontWeight="500"
                  fontFam={fonts.Outfit_Regular}
                  size={20}
                />
                <CustomText text={"+20 friends are going"} size={18} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ChatScreen")}
              style={styles.chatButton}
            >
              <Image
                style={{
                  width: sizeHelper.calWp(40),
                  height: sizeHelper.calWp(40),
                  resizeMode: "contain",
                }}
                source={images.chat}
              />
              <CustomText
                text={"Chat box"}
                color={theme.colors.white}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>
        <EventDescription />
        <LocationContainer />
      </ScrollView>
      <View style={styles.absoluteBottom}>
        <CustomButton
          bgColor={theme.colors.black}
          borderWidth={1}
          onPress={() => setSelectedEvent("May be")}
          borderColor={theme.colors.dark_gray}
          textColor={theme.colors.white}
          text="May be"
          width={"48%"}
        >
         
        </CustomButton>
        <CustomButton
          onPress={() => setSelectedEvent("I’m in")}
          text="I’m in"
          width={"48%"}
        >
         
        </CustomButton>
      </View>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: sizeHelper.calWp(30),
    position: "absolute",
    top: sizeHelper.calHp(50),
    left: sizeHelper.calWp(40),
  },
  box: {
    marginHorizontal: sizeHelper.calWp(30),
    backgroundColor: theme.colors.white,
    padding: sizeHelper.calWp(30),
    borderRadius: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(20),
  },
  absoluteBottom: {
    width: "100%",
    paddingHorizontal: sizeHelper.calWp(30),
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: sizeHelper.calHp(40),
  },
  headerImg: {
    width: "100%",
    height: sizeHelper.calHp(500),
    borderBottomRightRadius: sizeHelper.calWp(30),
    borderBottomLeftRadius: sizeHelper.calWp(30),
    overflow: "hidden",
  },
  peopleImg: {
    width: sizeHelper.calWp(75),
    height: sizeHelper.calWp(75),
    borderRadius: sizeHelper.calWp(25),
    marginRight: sizeHelper.calWp(-40),
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  buttonImg: {
    width: sizeHelper.calWp(50),
    height: sizeHelper.calWp(50),
    tintColor: theme.colors.dark_gray,
  },
  chatButton: {
    paddingHorizontal: sizeHelper.calWp(30),
    paddingVertical: sizeHelper.calHp(20),
    backgroundColor: theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: sizeHelper.calWp(10),
    borderRadius: 999,
    // paddingHorizontal:sizeHelper.calWp(20),
    // paddingVertical:sizeHelper.calHp(10)
  },
});
