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
import { images } from "../../assets/pngs";
import sizeHelper from "../../utils/Helpers";
import CustomText from "../Text";
import { fonts } from "../../utils/Themes/fonts";
import { theme } from "../../utils/Themes";
import CustomHeader from "../Header";
import { appStyles } from "../../utils/GlobalStyles";

const TopTab = ({ navigation, Tabs, selectedTab, setSelectedTab }: any) => {
  return (
    <>
      <View
        style={{
          ...appStyles.rowjustify,
          borderBottomWidth: sizeHelper.calWp(0.5),
          borderBottomColor: theme.colors.gray_text,
          width: "100%",
        }}
      >
        {Tabs?.map((item: any, index: any) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={{
                // backgroundColor:"red",
                width: "50%",
                alignItems: "center",
              }}
              onPress={() => setSelectedTab(index)}
            >
              <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
                <CustomText
                  text={item?.title}
                  size={23}
                  color={
                    selectedTab == index
                      ? theme.colors.primary
                      : theme?.colors.dark_gray
                  }
                />
                {item?.icon && (
                  <Image
                    style={{
                      width: sizeHelper.calWp(35),
                      height: sizeHelper.calWp(35),
                      // tintColor:
                    }}
                    tintColor={theme?.colors.dark_gray}
                    source={item?.icon}
                  />
                )}
              </View>
              {/* underline active tab */}
              <View
                style={{
                  height: sizeHelper.calHp(10),
                  width: "100%",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: sizeHelper.calHp(5),
                }}
              >
                {selectedTab == index && (
                  <View
                    style={{
                      width: "100%",
                      height: sizeHelper.calHp(1),
                      backgroundColor: theme.colors.primary,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
    gap: sizeHelper.calHp(30),
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
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
  },
});
