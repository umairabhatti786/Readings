import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { theme } from "../../../../utils/Themes";
import sizeHelper from "../../../../utils/Helpers";
import CustomText from "../../../../components/Text";
import { images } from "../../../../assets/pngs";
import { appStyles } from "../../../../utils/GlobalStyles";
import { fonts } from "../../../../utils/Themes/fonts";
import {
  ConnectedPeople,
  DiscoverEventData,
  FollowUp,
} from "../../../../utils/Data";
import CustomButton from "../../../../components/Button";
import TopTab from "../../../../components/TopTab";
import DiscoverEventCard from "../../../../components/Home/DiscoverEventCard";

const ProfileScreen = ({ navigation, route }: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const profile = route?.params?.profile;


  const EventContainer = ({ title }: any) => {
    return (
      <View style={styles.eventMain}>
        <Image
          style={styles.addCalendarImg}
          resizeMode="contain"
          source={images.add_calendar}
        />
        <CustomText
          fontWeight="500"
          fontFam={fonts.Outfit_Regular}
          text={title}
          style={{textAlign:"center"}}
          size={25}
        />
        <CustomText
          fontWeight="700"
          fontFam={fonts.Outfit_Black}
          text={"20"}
          size={37}
        />
      </View>
    );
  };

  const TopHeader = ({ title, isSetting }: any) => {
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
            text={"Jane’s profile"}
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
            size={28}
          />
        </View>

        {profile?.isUserProfile ? (
          <TouchableOpacity style={styles.backContainer}>
            <Image
              style={{ width: "50%", height: "50%" }}
              source={images.setting}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(15) }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("QRScreen")}
              style={styles.backContainer}
            >
              <Image
                style={{ width: "50%", height: "50%" }}
                source={images.qr_code}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.backContainer}
            >
              <Image
                style={{ width: "50%", height: "50%" }}
                source={images.edit_icon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SettingsScreen")}
              style={styles.backContainer}
            >
              <Image
                style={{ width: "50%", height: "50%" }}
                source={images.setting_icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const Header = () => {
    return (
      <View style={{ flexDirection: "row", gap: sizeHelper.calWp(35) }}>
        <Image
          style={{
            width: sizeHelper.calWp(220),
            height: sizeHelper.calWp(220),
            borderRadius: sizeHelper.calWp(45),
          }}
          source={images.user7}
        />
        <View
          style={{
            gap: sizeHelper.calWp(8),
            paddingVertical: sizeHelper.calHp(10),
            width: "68%",
          }}
        >
          <CustomText
            fontWeight="700"
            fontFam={fonts.Outfit_Black}
            text={"Jane Cooper"}
            numberOfLines={1}
            size={37}
          />

          <CustomText numberOfLines={1} text={"@jaooper-12"} size={26} />
          <CustomText
            color={theme.colors.gray_text}
            style={{ marginTop: sizeHelper.calHp(10) }}
            numberOfLines={2}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed deiusmod."
            }
            size={18}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <TopHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{
              gap: sizeHelper.calHp(30),
              paddingBottom: sizeHelper.calHp(20),
            }}
          >
            <Header />
            <TouchableOpacity
              onPress={() => navigation.navigate("Connections")}
              style={appStyles.rowjustify}
            >
              <View
                style={{
                  ...appStyles.row,
                }}
              >
                {ConnectedPeople.map((it: any, ind: any) => {
                  return (
                    <Image
                      key={ind.toString()}
                      style={styles.peopleImg}
                      source={it?.img}
                    />
                  );
                })}
                <CustomText
                  style={{ marginLeft: sizeHelper.calWp(70) }}
                  text={"4 People are connected"}
                  size={20}
                />
              </View>

              <Image
                style={{
                  width: sizeHelper.calWp(30),
                  height: sizeHelper.calWp(30),
                }}
                resizeMode="contain"
                source={images.next}
              />
            </TouchableOpacity>

            {!profile?.isPrivate && (
              <View style={{ gap: sizeHelper.calHp(15) }}>
                <CustomText
                  numberOfLines={1}
                  text={"My interests"}
                  size={20}
                  color={theme.colors.gray_text}
                />

                <View
                  style={{
                    ...appStyles.row,
                    flexWrap: "wrap",
                    gap: sizeHelper.calWp(10),
                  }}
                >
                  {[
                    "Hiking",
                    "Camping",
                    "Rock Climbing",
                    "Cycling",
                    "Kayaking",
                  ].map((it: any, ind: any) => {
                    return (
                      <View
                        key={ind.toString()}
                        style={{ ...appStyles.row, gap: sizeHelper.calWp(15) }}
                      >
                        <View
                          style={{
                            width: sizeHelper.calWp(6),
                            height: sizeHelper.calWp(6),
                            borderRadius: 999,
                            backgroundColor: theme.colors.primary,
                          }}
                        />
                        <CustomText
                          numberOfLines={1}
                          text={`${it}`}
                          style={{ marginRight: sizeHelper.calWp(20) }}
                          size={21}
                          color={theme.colors.primary}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {!profile?.isPrivate && (
              <View style={{ gap: sizeHelper.calHp(15) }}>
                <CustomText
                  numberOfLines={1}
                  text={"Follow me on"}
                  size={20}
                  color={theme.colors.gray_text}
                />

                <View
                  style={{
                    ...appStyles.row,
                    gap: sizeHelper.calWp(20),
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
            )}

            {profile?.isUserProfile ? (
              <View style={{ gap: sizeHelper.calHp(30) }}>
                <CustomButton bgColor={theme.colors.secondry} text="Connect" />

                {/* Tabs */}

                <TopTab
                  selectedTab={activeTab}
                  setSelectedTab={setActiveTab}
                  Tabs={[
                    { title: "Created events", id: 1 },
                    { title: "Events attended", id: 2 },
                  ]}
                />
                {!profile?.isPrivate ? (
                  <View>
                    <FlatList
                      data={DiscoverEventData}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        gap: sizeHelper.calWp(25),
                        paddingBottom: sizeHelper.calHp(30),
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }: any) => {
                        return (
                          <DiscoverEventCard mainWidth="100%" item={item} />
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "25%",
                      gap: sizeHelper.calHp(40),
                    }}
                  >
                    <Image
                      style={{
                        width: sizeHelper.calWp(220),
                        height: sizeHelper.calWp(220),
                        resizeMode: "contain",
                      }}
                      source={images.private}
                    />
                    <CustomText
                      text={"Oops! this account is private."}
                      size={25}
                    />
                  </View>
                )}
              </View>
            ) : (
              <View style={{ gap: sizeHelper.calHp(15) }}>
                <CustomText
                  text={"General Stats"}
                  fontWeight="600"
                  fontFam={fonts.Outfit_Medium}
                  size={30}
                />

                <View
                  style={{
                    ...appStyles.rowjustify,
                    gap: sizeHelper.calWp(20),
                    padding: sizeHelper.calWp(20),
                    backgroundColor: theme.colors.white,
                    borderRadius: sizeHelper.calWp(20),
                  }}
                >
                  <CustomText
                    text={"Member Since"}
                    fontWeight="500"
                    fontFam={fonts.Outfit_Regular}
                    size={25}
                  />
                  <View
                    style={{
                      ...appStyles.row,
                      gap: sizeHelper.calWp(20),
                    }}
                  >
                    <Image
                      style={styles.calendarImg}
                      tintColor={theme?.colors.dark_gray}
                      source={images.calendar}
                    />
                    <CustomText
                      text={"January 2024"}
                      size={25}
                      color={theme?.colors.dark_gray}
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...appStyles.row,
                    flexWrap: "wrap",
                    gap: sizeHelper.calWp(20),
                  }}
                >
                  <EventContainer title="Events Created" />
                  <EventContainer title="Events Attended" />
                  <EventContainer title="Mutual Events with Others" />
                  <EventContainer title="Friends joined via Events" />
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>

     
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
    gap: sizeHelper.calHp(30),
    // paddingBottom:40
  },
  backContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: sizeHelper.calWp(30),
  },
  peopleImg: {
    width: sizeHelper.calWp(90),
    height: sizeHelper.calWp(90),
    borderRadius: sizeHelper.calWp(30),
    marginRight: sizeHelper.calWp(-50),
    borderWidth: 1.5,
    borderColor: theme.colors.white,
  },

  followImg: {
    width: sizeHelper.calWp(65),
    height: sizeHelper.calWp(65),
  },
  calendarImg: {
    width: sizeHelper.calWp(35),
    height: sizeHelper.calWp(35),
  },
  eventMain: {
    borderRadius: sizeHelper.calWp(25),
    alignItems: "center",
    justifyContent: "center",
    gap: sizeHelper.calHp(5),
    backgroundColor: theme.colors.white,
    width: "48%",
    paddingVertical: sizeHelper.calHp(35),
  },
  addCalendarImg: {
    width: sizeHelper.calWp(65),
    height: sizeHelper.calWp(65),
  },
});
