import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { theme } from "../../../../utils/Themes";
import { appStyles } from "../../../../utils/GlobalStyles";
import sizeHelper from "../../../../utils/Helpers";
import { images } from "../../../../assets/pngs";
import CustomText from "../../../../components/Text";
import { fonts } from "../../../../utils/Themes/fonts";
import CustomButton from "../../../../components/Button";
import {
  CreaterData,
  DiscoverEventData,
} from "../../../../utils/Data";
import DiscoverEventCard from "../../../../components/Home/DiscoverEventCard";
import CreaterCard from "../../../../components/Home/CreaterCard";
import CombineSearch from "../../../../components/CombineSearch";
const HomeScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState("All");

  const Header = () => {
    return (
      <View
        style={{
          ...appStyles.rowjustify,
          paddingHorizontal: sizeHelper.calWp(30),
        }}
      >
        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
          <Image
            style={styles.profileImg}
            source={images.user1}
          />
          <View style={{ gap: sizeHelper.calWp(5) }}>
            <CustomText
              text={"Good morning"}
              color={theme.colors.dark_gray}
              size={22}
            />
            <CustomText
              text={"John Snow"}
              fontWeight="600"
              fontFam={fonts.Outfit_Medium}
              size={29}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Image
            style={styles.bellImg}
            source={images.bell}
          />
          <View
            style={styles.notificationContainerAbsoluate}
          >
            <CustomText text={"2"} color={theme.colors.white} size={13} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ViewMoreHeader = ({ onSeeAll }: any) => {
    return (
      <TouchableOpacity
        onPress={onSeeAll}
        style={{
          ...appStyles.row,
          paddingHorizontal: sizeHelper.calWp(30),
          alignSelf: "center",
          gap: sizeHelper.calWp(15),
        }}
      >
        <CustomText
          fontWeight="500"
          fontFam={fonts.Outfit_Regular}
          text={"View More"}
          size={23}
        />

        <TouchableOpacity
          onPress={onSeeAll}
          style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}
        >
          <Image
            style={{
              width: sizeHelper.calWp(20),
              height: sizeHelper.calWp(20),
              resizeMode: "contain",
              tintColor: theme.colors.black,
            }}
            source={images.next_arrow}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
  <FlatList
    data={CreaterData} // or any main list – you can also pass a dummy array like `[1]` to render everything in header
    keyExtractor={(item, index) => index.toString()}
    ListHeaderComponent={
      <>
        {/* Top Header + Search */}
        <View style={{  gap: sizeHelper.calHp(40), paddingTop: sizeHelper.calHp(20) }}>
          <Header />
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(10),
                paddingHorizontal: sizeHelper.calWp(30),

           }}>
            <CustomText
              color={theme.colors.black}
              fontWeight="600"
              fontFam={fonts.Outfit_SemiBold}
              text={"Discover\nEvents"}
              size={35}
            />
            <CombineSearch
              onFocuslocation={() => {
                navigation.navigate("DiscoverEventsSearch");
                Keyboard.dismiss();
              }}
              width={"75%"}
              locationPlaceholder={"My current location"}
              placeholder="Activity"
            />
          </View>
        </View>

        {/* Category Tabs */}
        <FlatList
          data={[
            "All",
            "Creativity",
            "Fun",
            "Exploration",
            "Innovation",
            "Discovery",
            "Learning",
            "Adventure",
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: sizeHelper.calWp(30), marginTop: sizeHelper.calHp(20) }}
          contentContainerStyle={{
            paddingRight: sizeHelper.calWp(Platform.OS == "ios" ? 30 : 60),
            gap: sizeHelper.calWp(25),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CustomButton
              text={item}
              onPress={() => setSelectedTab(item)}
              paddingHorizontal={sizeHelper.calWp(40)}
              borderRadius={999}
              bgColor={
                selectedTab === item
                  ? theme.colors.primary
                  : theme.colors.primary + "20"
              }
              textColor={
                selectedTab === item
                  ? theme.colors.white
                  : theme.colors.black
              }
              height={65}
            />
          )}
        />

        {/* Discover Events */}
        <FlatList
          data={DiscoverEventData}
          scrollEnabled={false}
          style={{ paddingHorizontal: sizeHelper.calWp(30), marginTop: sizeHelper.calHp(20),gap:sizeHelper.calHp(25) }}
          contentContainerStyle={{ gap: sizeHelper.calWp(25) }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <DiscoverEventCard mainWidth="100%" item={item} />}
        />
        <View style={{height:sizeHelper.calHp(25)}}/>
        {/* Suggested Header */}
        <ViewMoreHeader
          onSeeAll={() => navigation.navigate("DiscoverEventsSearch")}
        />

        <CustomText
          color={theme.colors.black}
          fontWeight="600"
          style={{ marginLeft: sizeHelper.calWp(30), marginTop: sizeHelper.calHp(30) }}
          fontFam={fonts.Outfit_SemiBold}
          text={"Suggested for you"}
          size={30}
        />
      </>
    }
    columnWrapperStyle={{ justifyContent: "space-between" }}
    numColumns={2}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: sizeHelper.calHp(40),
      gap: sizeHelper.calWp(25),
    }}
    renderItem={({ item ,index}) => (
      <View
     
      >
          <CreaterCard
        onPress={() =>
          navigation.navigate("ProfileScreen", {
            profile: {
              isUserProfile: true,
              isPrivate: item?.isPrivate,
            },
          })
        }
        item={item}
      />

      </View>
    
    )}
    ListFooterComponent={
      <ViewMoreHeader onSeeAll={() => navigation.navigate("EventSearch")} />
    }
  />
</SafeAreaView>
     
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  profileImg:{
    width: sizeHelper.calWp(90),
    height: sizeHelper.calWp(90),
    borderRadius: sizeHelper.calWp(25),
  },
  notificationContainerAbsoluate:{
    width: sizeHelper.calWp(25),
    height: sizeHelper.calWp(25),
    borderRadius: sizeHelper.calHp(25),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    position: "absolute",
    top: sizeHelper.calHp(-7),
    right: sizeHelper.calWp(-5),
  },
  bellImg:{
    width: sizeHelper.calWp(45),
    height: sizeHelper.calWp(45),
  }

});
