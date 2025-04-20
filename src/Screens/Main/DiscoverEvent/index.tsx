import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import { DiscoverEventData } from "../../../utils/Data";
import { appStyles } from "../../../utils/GlobalStyles";
import { images } from "../../../assets/pngs";
import CustomButton from "../../../components/Button";
import LinearGradient from "react-native-linear-gradient";
import DiscoverEventCard from "../../../components/Home/DiscoverEventCard";

const DiscoverEvent = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <CustomHeader title={"Discover events"} />

        {/* Redner Event */}
        <View style={appStyles.row}>
          <View style={{ flex: 1, marginRight: sizeHelper.calWp(10) }}>
            <FlatList
              data={["All", "Creativity", "Fun", "Exploration", "Innovation"]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: sizeHelper.calWp(20),
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }: any) => {
                return (
                  <CustomButton
                    text={item}
                    onPress={() => setSelectedTab(item)}
                    paddingHorizontal={sizeHelper.calWp(40)}
                    borderRadius={999}
                    bgColor={
                      selectedTab == item
                        ? theme.colors.primary
                        : theme.colors.white
                    }
                    textColor={
                      selectedTab == item
                        ? theme.colors.white
                        : theme.colors.gray100
                    }
                    height={65}
                  />
                );
              }}
            />
          </View>

          <LinearGradient
            colors={["#B47AFF", "#4136F1"]}
            style={{ borderRadius: sizeHelper.calWp(30) }}
          >
            <TouchableOpacity
            onPress={()=>navigation.navigate("EventSearch")}
              style={{
                ...styles.actionContainer,
              }}
            >
              <Image
                style={{
                  width: sizeHelper.calWp(40),
                  height: sizeHelper.calWp(40),
                  tintColor: "#FFFFFF",
                }}
                source={images.search}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>

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
      </View>
    </SafeAreaView>
  );
};

export default DiscoverEvent;

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
});
