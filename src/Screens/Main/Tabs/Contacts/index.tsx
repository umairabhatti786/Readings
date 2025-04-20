import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { appStyles } from "../../../../utils/GlobalStyles";
import CustomSearch from "../../../../components/Search";
import TopTab from "../../../../components/TopTab";
import { peopleData, requestData } from "../../../../utils/Data";
import sizeHelper from "../../../../utils/Helpers";
import PeopleCard from "../../../../components/PeopleCard";
import { theme } from "../../../../utils/Themes";
import RequestCard from "../../../../components/RequestCard";

const ContactScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState<string>("");

  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <View style={appStyles.rowjustify}>
          <CustomSearch
            value={search}
            onChangeText={(txt: string) => setSearch(txt)}
            placeholder="Search .."
          />
        </View>
        <TopTab
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          Tabs={[
            { title: "All connections", id: 1 },
            { title: "New requests", id: 2 },
          ]}
        />

        {/* Redner Event */}

        {selectedTab == 0 && (
          <FlatList
            data={peopleData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calWp(25),
              paddingBottom: sizeHelper.calHp(20),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              return <PeopleCard isSetting mainWidth={"100%"} item={item} />;
            }}
          />
        )}

        {selectedTab == 1 && (
          <FlatList
            data={requestData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calWp(25),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              return <RequestCard mainWidth={"100%"} item={item} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;

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
