import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  SectionList,
  ScrollView,
} from "react-native";
import { appStyles } from "../../../../utils/GlobalStyles";
import TopTab from "../../../../components/TopTab";
import { UpcomingEvent } from "../../../../utils/Data";
import sizeHelper from "../../../../utils/Helpers";
import { theme } from "../../../../utils/Themes";
import CustomText from "../../../../components/Text";
import { fonts } from "../../../../utils/Themes/fonts";
import { images } from "../../../../assets/pngs";
import CustomButton from "../../../../components/Button";
import DiscoverEventCard from "../../../../components/Home/DiscoverEventCard";
import { Calendar } from "react-native-calendars";

const CalendarScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState("Events created");
  const [selectedDates, setSelectedDates] = useState({
    "2025-03-02": { selected: true, selectedColor: theme.colors.primary },
    "2025-03-14": { selected: true, selectedColor: theme.colors.primary },
  });
  const Header = () => {
    return (
      <View style={appStyles.rowjustify}>
        <CustomText
          text={"Calender"}
          fontWeight="600"
          fontFam={fonts.Outfit_Medium}
          size={33}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchList")}
          style={styles.circleContainer}
        >
          <Image
            style={{
              width: "50%",
              height: "50%",
              tintColor: theme.colors.black,
            }}
            source={images.search}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSectionHeader = ({ section }: any) => (
    <View style={appStyles.rowjustify}>
      <CustomText
        size={27}
        color={section?.title}
        fontWeight="600"
        fontFam={fonts.Outfit_Medium}
        text={section.title}
      />
      <CustomText
        size={18}
        fontWeight="500"
        fontFam={fonts.Outfit_Regular}
        text={section.time}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: sizeHelper.calWp(30),
          }}
        >
          <View style={appStyles.rowjustify}>
            <CustomButton
              bgColor={theme.colors.white}
              borderWidth={1}
              borderColor={theme.colors.button_border}
              textColor={theme.colors.secondry}
              borderRadius={999}
              onPress={() => setSelectedEvent("Events created")}
              text="Events created"
              width={"48%"}
            >
              <TouchableOpacity
                onPress={() => setSelectedEvent("Events created")}
                style={{
                  ...styles.checkBoxContainer,
                  borderColor: "#BABABA",
                  borderWidth: selectedEvent == "Events created" ? -1 : 1,
                  backgroundColor:
                    selectedEvent == "Events created"
                      ? theme.colors.primary
                      : "transparent",
                }}
              >
                {selectedEvent == "Events created" && (
                  <View style={styles.checkBoxInner} />
                )}
              </TouchableOpacity>
            </CustomButton>

            <CustomButton
              bgColor={theme.colors.white}
              borderWidth={1}
              borderColor={theme.colors.button_border}
              textColor={theme.colors.secondry}
              borderRadius={999}
              onPress={() => setSelectedEvent("Events joined")}
              text="Events joined"
              width={"48%"}
            >
              <TouchableOpacity
                onPress={() => setSelectedEvent("Events joined")}
                style={{
                  ...styles.checkBoxContainer,
                  borderColor: "#BABABA",
                  borderWidth: selectedEvent == "Events joined" ? -1 : 1,
                  backgroundColor:
                    selectedEvent == "Events joined"
                      ? theme.colors.primary
                      : "transparent",
                }}
              >
                {selectedEvent == "Events joined" && (
                  <View style={styles.checkBoxInner} />
                )}
              </TouchableOpacity>
            </CustomButton>
          </View>

          <View style={styles.calendarContainer}>
            <Calendar
              current={"2025-03-01"}
              markingType={"custom"}
              markedDates={selectedDates}
              renderArrow={(direction) => (
                <View
                  style={{
                    backgroundColor: "#E7E5FF", // light background like your screenshot
                    padding: 10,
                    borderRadius: 50,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    shadowOffset: { width: 0, height: 1 },
                  }}
                >
                  <Image
                    style={{
                      width: sizeHelper.calWp(20),
                      height: sizeHelper.calWp(20),
                      tintColor: theme.colors.primary,
                    }}
                    resizeMode="contain"
                    source={
                      direction === "left"
                        ? images.calendar_back
                        : images.calendar_next
                    }
                  />
                </View>
              )}
              theme={{
                backgroundColor: "white",
                calendarBackground: "white",
                textSectionTitleColor: theme.colors.primary,
                selectedDayBackgroundColor: theme.colors.primary,
                selectedDayTextColor: "#ffffff",
                todayTextColor: theme.colors.primary,
                dayTextColor: "#202224",
                textDisabledColor: "#8B8C8D",
                monthTextColor: "#202224",
                arrowColor: theme.colors.primary,
                textMonthFontSize: sizeHelper.calHp(30),
                textMonthFontWeight: "500",
                textDayFontWeight: "500",
                textDayFontSize: sizeHelper.calHp(23),
                textDayFontFamily: fonts.Outfit_Regular,
                textDayHeaderFontFamily: fonts.Outfit_Regular,
                textMonthFontFamily: fonts.Outfit_Regular,
                textDayHeaderFontWeight: "500",
              }}
              onDayPress={(day) => {
                const key = day.dateString;
                setSelectedDates((prev) => {
                  const updated: any = { ...prev };
                  if (updated[key]) {
                    delete updated[key];
                  } else {
                    updated[key] = { selected: true, selectedColor: "#6C4DE6" };
                  }
                  return updated;
                });
              }}
            />
          </View>

          <TopTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            Tabs={[
              { title: "Upcoming events", id: 1 },
              { title: "Past events", id: 2 },
            ]}
          />

          {/* Redner Event */}

          {selectedTab == 0 && (
            <SectionList
              sections={UpcomingEvent}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={renderSectionHeader}
              contentContainerStyle={{
                gap: sizeHelper.calWp(15),
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }: any) => {
                return <DiscoverEventCard mainWidth={"100%"} item={item} />;
              }}
            />
          )}

          {selectedTab == 1 && (
            <SectionList
              sections={UpcomingEvent}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={renderSectionHeader}
              contentContainerStyle={{
                gap: sizeHelper.calWp(15),
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }: any) => {
                return <DiscoverEventCard mainWidth={"100%"} item={item} />;
              }}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  actionContainer: {
    width: sizeHelper.calWp(85),
    height: sizeHelper.calWp(85),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(20),
  },
  circleContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(30),
    backgroundColor: theme.colors.white,
  },

  checkBoxContainer: {
    width: sizeHelper.calWp(30),
    height: sizeHelper.calWp(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(30),
  },
  checkBoxInner: {
    width: "40%",
    height: "40%",
    backgroundColor: theme.colors.white,
    borderRadius: 999,
  },
  calendarContainer: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F8F8F8",
    // elevation: 1,
  },
});
