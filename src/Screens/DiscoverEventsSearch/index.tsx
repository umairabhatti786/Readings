import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { appStyles } from "../../utils/GlobalStyles";
import CustomHeader from "../../components/Header";
import { DiscoverEventData, peopleData } from "../../utils/Data";
import sizeHelper from "../../utils/Helpers";
import DiscoverEventCard from "../../components/Home/DiscoverEventCard";
import { theme } from "../../utils/Themes";
import CombineSearch from "../../components/CombineSearch";


const DiscoverEventsSearch = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState<string>("Forest camping");

  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <CustomHeader
        title={"Discover events"}
        />
        <View style={appStyles.rowjustify}>
          <CombineSearch
          backgroundColor={theme.colors.search_background}
            value={search}
            onChangeText={(txt: string) => setSearch(txt)}
            locationPlaceholder={"My current location"}
            placeholder="Search anything…"
          />

        
        </View>
      

        {/* Redner Event */}
        {selectedTab == 1 && (
          <FlatList
            data={DiscoverEventData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calWp(25),
              paddingBottom:sizeHelper.calHp(30)

            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              return <DiscoverEventCard mainWidth={"100%"} item={item} />;
            }}
          />
        )}
        {selectedTab == 0 && (
          <FlatList
            data={DiscoverEventData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calWp(25),
              paddingBottom:sizeHelper.calHp(30)
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              return <DiscoverEventCard mainWidth={"100%"} item={item} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiscoverEventsSearch;

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
  crossContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(30),
  },
});
