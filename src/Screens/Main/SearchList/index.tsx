import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import { appStyles } from "../../../utils/GlobalStyles";
import { images } from "../../../assets/pngs";
import CustomSearch from "../../../components/Search";

const SearchListScreen = ({ navigation }: any) => {
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

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.crossContainer}
          >
            <Image
              style={{ width: "40%", height: "40%" }}
              source={images.cross}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchListScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  crossContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(30),
  },
});
