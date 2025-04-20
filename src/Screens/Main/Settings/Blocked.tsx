import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import { appStyles } from "../../../utils/GlobalStyles";
import sizeHelper from "../../../utils/Helpers";
import { peopleData } from "../../../utils/Data";
import PeopleCard from "../../../components/PeopleCard";
import CustomText from "../../../components/Text";
const BlockedScreen = ({ navigation, route }: any) => {
  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader title={"Blocked"} />
          <FlatList
            data={peopleData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calWp(25),
              paddingBottom: sizeHelper.calHp(20),
              flex: 1,
            }}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomText text={"Nothing Here!"} size={23} />
                </View>
              );
            }}
            renderItem={({ item, index }: any) => {
              return (
                <PeopleCard
                  ButtonText={"Unblock"}
                  mainWidth={"100%"}
                  item={item}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default BlockedScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
