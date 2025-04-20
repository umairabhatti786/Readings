import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomButton from "../../../components/Button";
import ScreenLoader from "../../../components/ScreenLoader";
import { images } from "../../../assets/pngs";
import CustomSearch from "../../../components/Search";
import { fonts } from "../../../utils/Themes/fonts";
const InterestsScreen = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState(false);

  const [selectedInterest, setSelectedInterest] = useState([
    { title: "A Capella Singing", id: 1 },
    { title: "Abalone Fishing", id: 2 },
    { title: "Acting", id: 9 },
    { title: "Aikido", id: 14 },
    { title: "Adventure Hobbies", id: 11 },
  ]);

  const [interests, setInterest] = useState([
    { title: "A Capella Singing", id: 1 },
    { title: "Abalone Fishing", id: 2 },
    { title: "Abseiling (Rapelling)", id: 3 },
    { title: "Accordion", id: 4 },
    { title: "Acid Etching", id: 5 },
    { title: "Acro Dance (Acrobatic Dance)", id: 6 },
    { title: "Acro Yoga", id: 7 },
    { title: "Acrobatics", id: 8 },
    { title: "Acting", id: 9 },
    { title: "Action Figures (Making/ Collecting)", id: 10 },
    { title: "Adventure Hobbies", id: 11 },
    { title: "Aerobics", id: 12 },
    { title: "Aeromodeling", id: 13 },
    { title: "Aikido", id: 14 },
  ]);

  const InterestContainer = ({ item, index, onPress, isSelected }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={appStyles.rowjustify}
      >
        <CustomText
          text={item?.title}
          fontWeight="500"
          fontFam={fonts.Outfit_Regular}
          size={23}
        />

        <TouchableOpacity onPress={onPress}>
          <Image
            style={{
              width: sizeHelper.calWp(40),
              height: sizeHelper.calWp(40),
            }}
            source={isSelected ? images.flled_check : images.unfill_check}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader title={"Interests"} />
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(15),
              flexWrap: "wrap",
            }}
          >
            {selectedInterest.map((it: any, ind: any) => {
              return (
                <CustomButton
                  key={ind.toString()}
                  text={it?.title}
                  onPress={() => {
                    setSelectedInterest((prev) => {
                      return prev.filter((team: any) => team.id !== it.id);
                    });
                  }}
                  paddingHorizontal={sizeHelper.calWp(40)}
                  borderRadius={999}
                  size={20}
                  bgColor={theme.colors.white}
                  textColor={theme.colors.black}
                  height={62}
                >
                  <Image
                    style={{
                      width: sizeHelper.calWp(23),
                      height: sizeHelper.calWp(23),
                    }}
                    source={images.cross}
                  />
                </CustomButton>
              );
            })}
          </View>

          <View style={{ ...appStyles.rowjustify, gap: sizeHelper.calWp(20) }}>
            <CustomSearch 
            width={"75%"}
            placeholder="Search anything…" />

            <TouchableOpacity
              onPress={() => navigation.navigate("AddInterest")}
              style={styles.addButton}
            >
              <CustomText text={"+ Add"} color={theme.colors.white} size={23} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calHp(30),
              paddingBottom: sizeHelper.calHp(30),
            }}
          >
            {interests?.map((item, index) => {
              const isSelected = selectedInterest.some((i) => i.id === item.id);

              return (
                <InterestContainer
                  key={index.toString()}
                  isSelected={isSelected}
                  onPress={() => {
                    setSelectedInterest((prev: any) => {
                      const exists = prev.some(
                        (team: any) => team.id === item.id
                      ); // Check if item exists

                      if (exists) {
                        // Remove the specific item
                        return prev.filter((team: any) => team.id !== item.id);
                      } else {
                        // Add the new item
                        return [...prev, item];
                      }
                    });
                  }}
                  item={item}
                  index={index}
                />
              );
            })}
          </ScrollView>
        </View>
        <CustomButton
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);

              navigation.goBack();
            }, 2000);
          }}
          style={{
            marginHorizontal: sizeHelper.calWp(30),
            marginBottom: sizeHelper.calHp(30),
          }}
          text="Update"
        />
      </SafeAreaView>
      {loading && <ScreenLoader />}
    </>
  );
};

export default InterestsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  addButton: {
    paddingHorizontal: sizeHelper.calWp(35),
    paddingVertical: sizeHelper.calHp(20),
    backgroundColor: theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(20),
  },

  squircle: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 12, // half of height/width
    transform: [{ scaleX: 1.7 }, { scaleY: 1.05 }], // adds a more organic look
    marginRight: 40,
  },
});
