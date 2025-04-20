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
import { peopleData, } from "../../../utils/Data";
import sizeHelper from "../../../utils/Helpers";
import PeopleCard from "../../../components/PeopleCard";
import { theme } from "../../../utils/Themes";
import { images } from "../../../assets/pngs";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";

const ConnectionsScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState<string>("");

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
            style={appStyles.backBtn}
          >
            <Image
              style={{ width: "50%", height: "50%" }}
              source={images.back_round}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <CustomText
            text={"Jane’s circle"}
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
            size={28}
          />
        </View>

        <TouchableOpacity style={appStyles.backBtn}>
          <Image
            style={{ width: "50%", height: "50%" }}
            source={images.setting}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <TopHeader/>
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
            { title: "Mutale connections", id: 1 },
            { title: "All connections", id: 2 },
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
            return <PeopleCard mainWidth={"100%"} item={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConnectionsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
 
});
