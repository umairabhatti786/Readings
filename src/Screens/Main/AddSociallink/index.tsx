import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import { AddSocialLinkData } from "../../../utils/Data";
import { appStyles } from "../../../utils/GlobalStyles";
import SociallinkCard from "../../../components/SociallinkCard";
const AddSociallinkScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={appStyles.Container}>
        <CustomHeader title={"Add social link"} />

        <FlatList
          data={AddSocialLinkData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: sizeHelper.calWp(25),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }: any) => {
            return (
              <SociallinkCard
                isNext
                onPress={() =>
                  navigation.navigate("CreateSociallink", { data: item })
                }
                item={item}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddSociallinkScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
