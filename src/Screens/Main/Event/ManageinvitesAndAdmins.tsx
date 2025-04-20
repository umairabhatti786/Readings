import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
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
import ScreenLoader from "../../../components/ScreenLoader";
import CustomSearch from "../../../components/Search";
import { peopleData } from "../../../utils/Data";
import ManageAdminCard from "../../../components/Event/ManageAdminCard";
import CustomButton from "../../../components/Button";
import ToggleSwitch from "../../../components/ToggleSwitch";
const ManageinvitesAndAdmins = ({ navigation,route }: any) => {

  const [loading, setloading] = useState(false);
  const [isEventCreated, setIsEventCreated] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState([
    { title: "All friends", isActive: false },
    { title: "Past events joiners", isActive: false },
    { title: "Connections with matching activity tags ", isActive: false },
    { title: "Connections with matching geography tags", isActive: false },
    { title: "Connections near by location", isActive: false },
  ]);
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
              text={"4.  Manage invites & admins"}
              size={37}
              style={{ textAlign: "center" }}
              fontWeight="600"
              fontFam={fonts.Outfit_SemiBold}
            />
          </View>
          <ScreenSteps activeStep={4} />
          <View>
            <View
              style={{
                gap: sizeHelper.calHp(40),
                height: sizeHelper.calHp(75),
              }}
            >
              {/* <Header /> */}
              <CustomSearch
                onFilter={() => setIsFilterVisible(!isFilterVisible)}
                isfilter={true}
                placeholder="Search anything…"
              />
            </View>
            {isFilterVisible && (
              <View style={styles.filterAbsolute}>
                {/* <Header /> */}
                <CustomText
                  text={"Filters"}
                  fontWeight="600"
                  fontFam={fonts.Outfit_SemiBold}
                  color={theme.colors.black}
                  size={25}
                />

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: sizeHelper.calHp(30),
                    paddingBottom: sizeHelper.calHp(30),
                  }}
                >
                  {filterData?.map((item: any, index: any) => {
                    return (
                      <ToggleSwitch
                      key={index.toString()}
                        titleSize={20}
                        title={item?.title}
                        switchOn={item?.isActive}
                        onPress={() => {
                          setFilterData((prevData) =>
                            prevData.map((item, i) =>
                              i === index
                                ? { ...item, isActive: !item.isActive }
                                : item
                            )
                          );
                        }}
                      />
                    );
                  })}
                </ScrollView>

                <View style={appStyles.rowjustify}>
                  <CustomButton
                    width={"48%"}
                    onPress={() => setIsFilterVisible(false)}
                    bgColor={theme.colors.white}
                    borderColor={theme.colors.button_border}
                    borderWidth={1}
                    textColor={theme.colors.dark_gray}
                    text="Cancel"
                  />
                  <CustomButton
                    onPress={() => setIsFilterVisible(false)}
                    width={"48%"}
                    text="Apply filters"
                  />
                </View>
              </View>
            )}
          </View>

          <FlatList
            data={peopleData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calWp(25),
              paddingBottom: sizeHelper.calHp(30),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              return <ManageAdminCard mainWidth={"100%"} item={item} />;
            }}
          />
          
        </View>
        <View
          style={{
            paddingHorizontal: sizeHelper.calHp(30),
            paddingBottom: sizeHelper.calHp(30),
          }}
        >
          <BottomSteps
            onNext={() => {
              setloading(true);
              setTimeout(() => {
                setloading(false);
                setIsEventCreated(true);
              }, 2000);
            }}
            activeStep={4}
            steps={4}

            
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

export default ManageinvitesAndAdmins;

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

  filterAbsolute: {
    width: "100%",
    backgroundColor: theme.colors.white,
    marginHorizontal: sizeHelper.calWp(30),
    height: sizeHelper.calHp(550),
    position: "absolute",
    top: sizeHelper.calHp(90),
    borderRadius: sizeHelper.calWp(30),
    padding: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(30),
    alignSelf: "center",
    zIndex: 999,
  },
});
