import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomSearch from "../../../components/Search";
import TopTab from "../../../components/TopTab";
import { peopleData } from "../../../utils/Data";
import sizeHelper from "../../../utils/Helpers";
import PeopleCard from "../../../components/PeopleCard";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";

const GuestUserScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState<string>("");

  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <CustomHeader title={"Guest list"} />
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
            { title: "Coming on event", id: 1 },
            { title: "May be attending", id: 2 },
          ]}
        />

        {/* Redner Event */}

        <FlatList
          data={peopleData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: sizeHelper.calWp(25),
            paddingBottom: sizeHelper.calHp(20),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }: any) => {
            return (
              <PeopleCard
                disableConnect={true}
                mainWidth={"100%"}
                item={item}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default GuestUserScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

});
