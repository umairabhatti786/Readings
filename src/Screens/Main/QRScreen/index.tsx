import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomSearch from "../../../components/Search";
import TopTab from "../../../components/TopTab";
import { peopleData, requestData } from "../../../utils/Data";
import sizeHelper from "../../../utils/Helpers";
import PeopleCard from "../../../components/PeopleCard";
import RequestCard from "../../../components/RequestCard";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import LinearGradient from "react-native-linear-gradient";
import { images } from "../../../assets/pngs";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";

const QRScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState<string>("");

  return (
    <LinearGradient colors={["#B47AFF", "#4136F1"]} style={styles.main}>
      <View style={{ ...appStyles.Container, backgroundColor: "transparent",paddingTop:sizeHelper.calHp(Platform.OS=="ios"? 110:0) }}>
        <CustomHeader />
        <View
          style={{
            alignItems: "center",
            paddingTop: "40%",
            gap: sizeHelper.calHp(30),
          }}
        >
          <View
            style={{
              ...styles.boxContainer,
              borderRadius: sizeHelper.calWp(100),
              padding: sizeHelper.calWp(60),
            }}
          >
            <Image
              style={{
                width: sizeHelper.calWp(350),
                height: sizeHelper.calWp(350),
              }}
              source={images.qrcode}
            />
             <CustomText
                text={"@john-12"}
                fontWeight="600"
                style={{marginTop:sizeHelper.calHp(10)}}
                // color={theme.colors.red}
                fontFam={fonts.Outfit_SemiBold}
                size={30}
              />
          </View>
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(30) }}>
            <TouchableOpacity
              style={{
                ...styles.boxContainer,
                borderRadius: sizeHelper.calWp(40),
                width: sizeHelper.calWp(90),
                height: sizeHelper.calHp(85),
              }}
            >
              <Image
                style={styles.icon}
                source={images.share}
                resizeMode="contain"
              />
              <CustomText
                text={"Share"}
                fontWeight="500"
                // color={theme.colors.red}
                // fontFam={fonts.Outfit_Regular}
                size={18}
              />
            </TouchableOpacity>

            <TouchableOpacity
             style={{
                ...styles.boxContainer,
                borderRadius: sizeHelper.calWp(40),
                width: sizeHelper.calWp(90),
                height: sizeHelper.calHp(85),
              }}
            >
              <Image
                style={styles.icon}
                source={images.copy}
                resizeMode="contain"
              />
              <CustomText
                text={"URL"}
                fontWeight="500"
                // color={theme.colors.red}
                // fontFam={fonts.Outfit_Regular}
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Redner Event */}
      </View>
    </LinearGradient>
  );
};

export default QRScreen;

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
  boxContainer: {
    // width: sizeHelper.calWp(70),
    // height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
  },
  icon: {
    width: sizeHelper.calWp(45),
    height: sizeHelper.calWp(35),
  },
});
