import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CustomText from "../../../components/Text";
import { images } from "../../../assets/pngs";
import sizeHelper from "../../../utils/Helpers";
import { fonts } from "../../../utils/Themes/fonts";
import { theme } from "../../../utils/Themes";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomButton from "../../../components/Button";
import ScreenSteps from "../../../components/ScreenSteps";
import CustomInput from "../../../components/Input";
import CustomHeader from "../../../components/Header";
import TagsModal from "./TagsModal";
import BottomSteps from "../../../components/Event/BottomSteps";
const CreateEvent = ({ navigation }: any) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(  { title: "Public event", des: "Anyone can join", id: 1 });
  const [values, setValues] = useState({
    event_name: "",
    about_event: "",
  });
  const [isActivitytTagsVisible, setIsActivitytTagsVisible] = useState(false);
  const [isGeographicTagsVisible, setIsGeographicTagsVisible] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(1);
  const [selectedPostMessages, setSelectedPostMessages] = useState(1);

  const eventData = [
    { title: "Public event", des: "Anyone can join", id: 1 },
    { title: "Private event", des: "Invites can join only", id: 2 },
  ];

  const AttendanceData = [
    { title: "Approved Automatically", id: 1 },
    { title: "Approved Manually", id: 2 },
  ];

  const PostMessagesData = [
    { title: "Only Admins", id: 1 },
    { title: "All Attendees", id: 2 },
  ];
  const [selectedActivityTags, setSelectedActivityTags] = useState([]);

  const [activityTags, setActivityTags] = useState([
    { title: "#Camping", id: 1 },
    { title: "#Hiking", id: 2 },
    { title: "#Kayaking", id: 3 },
    { title: "#Fishing", id: 4 },
    { title: "#WildlifePhotography", id: 5 },
    { title: "#BirdWatching", id: 6 },
    { title: "#RockClimbing", id: 7 },
    { title: "#Backpacking", id: 8 },
  ]);

  const [geographicTags, setGeographicTags] = useState([
    { title: "#Lake", id: 1 },
    { title: "#Forest", id: 2 },
    { title: "#Mountain", id: 3 },
    { title: "#Park", id: 4 },
    { title: "#River", id: 5 },
    { title: "#Valley", id: 6 },
    { title: "#Beach", id: 7 },
    { title: "#Desert", id: 8 },
  ]);
  const EventContainer = ({ title, onPress, width, id, des }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          ...styles.eventContainer,
          borderWidth: selectedEvent?.id == id ? -1 : 1,
          borderColor: selectedEvent?.id == id ? "transparent" : "#E4E2E2",
          backgroundColor:
            selectedEvent?.id == id ? theme.colors.primary : theme.colors.white,
        }}
      >
        <View>
          <CustomText
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
            color={
              selectedEvent?.id == id
                ? theme.colors.white
                : theme.colors.gray_placeholder
            }
            text={title}
            size={25}
          />
          {selectedEvent?.id == id && (
            <CustomText color={theme.colors.white} text={des} size={18} />
          )}
        </View>

        {selectedEvent?.id == id && (
          <Image
            source={images.check_box}
            style={{
              width: sizeHelper.calWp(35),
              height: sizeHelper.calWp(35),
            }}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  };

  const CheckBoxButton = ({ title, id, selected, setSelected }: any) => {
    return (
      <CustomButton
        bgColor={theme.colors.white}
        borderWidth={1}
        borderColor={theme.colors.button_border}
        textColor={theme.colors.secondry}
        borderRadius={999}
        size={19}
        paddingHorizontal={sizeHelper.calWp(20)}
        onPress={() => setSelected(id)}
        text={title}
      >
        <TouchableOpacity
          onPress={() => setSelected(id)}
          style={{
            ...styles.checkBoxContainer,
            borderColor: "#BABABA",
            borderWidth: selected == id ? -1 : 1,
            backgroundColor:
              selected == id ? theme.colors.primary : "transparent",
          }}
        >
          {selected == id && <View style={styles.checkBoxInner} />}
        </TouchableOpacity>
      </CustomButton>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.main}>
        <ScrollView>
          <View
            style={{
              ...appStyles.Container,
              paddingBottom: sizeHelper.calHp(30),
            }}
          >
            <CustomHeader />
            <View style={{ gap: sizeHelper.calHp(4) }}>
              <CustomText
                text={"Let’s create an event"}
                style={{ textAlign: "center" }}
                color={theme.colors.dark_gray}
                size={22}
              />

              <CustomText
                text={"1.  Event datils"}
                size={37}
                style={{ textAlign: "center" }}
                fontWeight="600"
                fontFam={fonts.Outfit_SemiBold}
              />
            </View>
            <ScreenSteps 
            steps={selectedEvent.id==1?[1,2,3]: [1, 2, 3,4]}
            activeStep={1} />
            <View
              style={{
                gap: sizeHelper.calHp(20),
                paddingTop: sizeHelper.calHp(40),
              }}
            >
              <View
                style={{
                  ...appStyles.row,
                  gap: sizeHelper.calWp(20),
                  flexWrap: "wrap",
                }}
              >
                {eventData.map((item, index) => {
                  return (
                    <EventContainer
                      key={index.toString()}
                      id={item?.id}
                      des={item?.des}
                      onPress={() => setSelectedEvent(item)}
                      title={item?.title}
                    />
                  );
                })}
              </View>
            </View>
            <View style={{ gap: sizeHelper.calHp(20), width: "100%" }}>
              <CustomInput backgroundColor={"transparent"}
              value={values.event_name}
              onChangeText={(txt:any)=>setValues({...values,event_name:txt})}
               label="Event name" />
              <CustomInput
                height={200}
                backgroundColor={"transparent"}
                multiline={true}       
                textAlignVertical={"top"}
                value={values.about_event}
                onChangeText={(txt:any)=>setValues({...values,about_event:txt})}
                label="About this event.."
              />
            </View>
            <View style={{ gap: sizeHelper.calHp(20), width: "100%" }}>
              <CustomText text={"Attendance "} size={22} />
              <View
                style={{
                  ...appStyles.row,
                  gap: sizeHelper.calWp(15),
                  flexWrap: "wrap",
                }}
              >
                {AttendanceData.map((it: any, ind: any) => {
                  return (
                    <CheckBoxButton
                      key={ind.toString()}
                      selected={selectedAttendance}
                      setSelected={setSelectedAttendance}
                      id={it?.id}
                      title={it?.title}
                    />
                  );
                })}
              </View>
            </View>

            <View style={{ gap: sizeHelper.calHp(20), width: "100%" }}>
              <CustomText text={"Attendance "} size={22} />
              <View
                style={{
                  ...appStyles.row,
                  gap: sizeHelper.calWp(15),
                  flexWrap: "wrap",
                }}
              >
                {PostMessagesData.map((it: any, ind: any) => {
                  return (
                    <CheckBoxButton
                    key={ind.toString()}
                      selected={selectedPostMessages}
                      setSelected={setSelectedPostMessages}
                      id={it?.id}
                      title={it?.title}
                    />
                  );
                })}
              </View>
            </View>

            <View style={{ gap: sizeHelper.calHp(15) }}>
              <CustomText text={"Activity tags"} size={22} />
              <CustomText
                color={theme.colors.dark_gray}
                text={"Help full to see what’s inside the event"}
                size={20}
              />
              <View style={appStyles.row}>
                <TouchableOpacity
                  onPress={() => setIsActivitytTagsVisible(true)}
                  style={{
                    ...styles.addButton,
                    borderRadius: 999,
                    backgroundColor: theme.colors.search_background,
                  }}
                >
                  <CustomText
                    text={"+ Add tags"}
                    color={theme.colors.dark_gray}
                    size={23}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ gap: sizeHelper.calHp(15) }}>
              <CustomText text={"Geographic tagss"} size={22} />
              <CustomText
                color={theme.colors.dark_gray}
                text={"Help full to see where even is going happen"}
                size={20}
              />
              <View style={appStyles.row}>
                <TouchableOpacity
                  onPress={() => setIsGeographicTagsVisible(true)}
                  style={{
                    ...styles.addButton,
                    borderRadius: 999,
                    backgroundColor: theme.colors.search_background,
                  }}
                >
                  <CustomText
                    text={"+ Add tags"}
                    color={theme.colors.dark_gray}
                    size={23}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: sizeHelper.calHp(40) }} />

            <BottomSteps 
            steps={selectedEvent.id==1?3:4}
            onNext={() => navigation.navigate("AddEventPhoto",{selectedEvent:selectedEvent})} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <TagsModal
        modalVisible={isActivitytTagsVisible}
        setModalVisible={setIsActivitytTagsVisible}
        tags={activityTags}
        title={"Activity tags"}
        selctedTags={selectedActivityTags}
        setSelectedTag={setSelectedActivityTags}
      />
      <TagsModal
        modalVisible={isGeographicTagsVisible}
        setModalVisible={setIsGeographicTagsVisible}
        tags={geographicTags}
        title={"Geographic tags"}
        selctedTags={selectedActivityTags}
        setSelectedTag={setSelectedActivityTags}
      />
    </>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  checkBox: {
    width: sizeHelper.calWp(35),
    height: sizeHelper.calWp(35),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B1B1B1",
    borderRadius: sizeHelper.calWp(35),
  },
  eventContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    width: "48%",
    height: sizeHelper.calWp(110),
    paddingHorizontal: sizeHelper.calWp(5),
    // paddingVertical: sizeHelper.calHp(30),
  },
  addButton: {
    paddingHorizontal: sizeHelper.calWp(35),
    paddingVertical: sizeHelper.calHp(20),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: sizeHelper.calWp(10),
  },
  crossImg: {
    width: sizeHelper.calHp(20),
    height: sizeHelper.calHp(20),
    tintColor: theme.colors.black,
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
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
