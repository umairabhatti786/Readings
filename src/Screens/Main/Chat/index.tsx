import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  StatusBar,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import { fonts } from "../../../utils/Themes/fonts";
import { images } from "../../../assets/pngs";
import MessageSander from "../../../components/MessageSander";

const ChatScreen = ({ navigation }: any) => {
  const peoples = [
    { img: images.user2 },
    { img: images.user3 },
    { img: images.user4 },
  ];

  const chatData = [
    {
      name: "Jane Cooper",
      isHost: true,
      message:
        "Hey everyone! We’re all set for the camping trip this weekend! Who’s excited?",
      time: "12:13",
      to: true,
      img: images.user1,
    },
    {
      name: "You",
      message: "Super excited! What’s the exact meeting point?",
      time: "12:13",
      from: true,
      img: images.user2,
    },
    {
      name: "Emily White",
      message: "Also, what’s the weather forecast? Need to know what to pack.",
      time: "12:13",
      to: true,
      img: images.user3,
    },
    {
      name: "Sarah Khan",
      message: " Great!.",
      time: "12:13",
      to: true,
      img: images.user4,
    },
  ];
  const Header = () => {
    return (
      <View
        style={{
          ...appStyles.rowjustify,
          backgroundColor: theme.colors.white,
          padding: sizeHelper.calWp(30),
        }}
      >
        <View
          style={{
            ...appStyles.row,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              ...styles.backContainer,
              marginRight: sizeHelper.calWp(25),
            }}
          >
            <Image
              style={{ width: "50%", height: "50%" }}
              source={images.back_round}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {peoples.map((it: any, ind: any) => {
            return (
              <Image
                key={ind.toString()}
                style={styles.peopleImg}
                source={it?.img}
              />
            );
          })}
          <View
            style={{
              gap: sizeHelper.calHp(4),
              marginLeft: sizeHelper.calWp(60),
            }}
          >
            <CustomText
              text={"Forest camping"}
              fontWeight="600"
              fontFam={fonts.Outfit_SemiBold}
              size={25}
            />
            <CustomText text={"+20 peoples"} size={18} />
          </View>
        </View>
        <TouchableOpacity
          // onPress={() => navigation.goBack()}
          style={styles.backContainer}
        >
          <Image
            style={{ width: "50%", height: "50%" }}
            source={images.setting}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderChats = ({ item, index }: any) => {
    return (
      <View style={item?.from ? styles.rightContainer : styles.leftContainer}>
        {item?.to && (
          <Image
            // key={ind.toString}
            style={styles.groupImg}
            source={item?.img}
          />
        )}

        <View style={{ gap: sizeHelper.calHp(10) }}>

          <CustomText
            color={theme.colors.black}
            style={{
              textAlign: item?.from ? "right" : "left",
            }}
            fontFam={fonts.Outfit_Regular}
            text={item?.name}
            size={22}
          />

          <View style={item?.from ? styles.rightInner : styles.leftInner}>
            <View>
              <Text style={item?.from ? styles.rightText : styles.leftText}>
                {item?.message}
              </Text>
            </View>

            <Text style={item?.from ? styles.rightTime : styles.leftTime}>
              {item?.time}
            </Text>
          </View>
        </View>

        {item?.from && (
          <Image
            style={styles.groupImg}
            source={item?.img}
          />
        )}
      </View>
    );
  };
  return (
    <>

      <SafeAreaView style={styles.main}>
        <View style={styles.main}>
          <Header />
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0} // Adjust as per your header height
          >
            <View style={{ flex: 1, paddingHorizontal: sizeHelper.calWp(30) }}>
              <FlatList
                data={chatData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  gap: sizeHelper.calHp(30),
                  paddingTop: sizeHelper.calHp(35),
                  paddingBottom:sizeHelper.calHp(10)
                }}
               
                showsHorizontalScrollIndicator={false}
                renderItem={renderChats}
              />
            </View>
            <View style={{ paddingHorizontal: sizeHelper.calWp(30),paddingBottom:sizeHelper.calHp(10) }}>
              <MessageSander
               
                height={100}
                multiline={true}
                textAlignVertical="bottom"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  box: {
    backgroundColor: theme.colors.white,
    padding: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(20),
    borderRadius: sizeHelper.calWp(30),
  },

 

  backContainer: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    borderRadius: sizeHelper.calWp(30),
  },
  groupImg: {
    width: sizeHelper.calWp(90),
    height: sizeHelper.calWp(90),
    borderRadius: sizeHelper.calWp(25),
  },
  peopleImg: {
    width: sizeHelper.calWp(75),
    height: sizeHelper.calWp(75),
    borderRadius: sizeHelper.calWp(25),
    marginRight: sizeHelper.calWp(-40),
    borderWidth: 1,
    borderColor: theme.colors.white,
  },

  rightContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: sizeHelper.calWp(25),
  },
  leftContainer: {
    flexDirection: "row",
    // gap: sizeHelper.calWp(60),
    alignSelf: "flex-start",
    gap: sizeHelper.calWp(25),

    // backgroundColor:"red"
  },
  rightInner: {
    backgroundColor: "#EEE3FD",
    borderBottomLeftRadius: sizeHelper.calWp(30),
    borderBottomRightRadius: sizeHelper.calWp(30),
    borderTopLeftRadius: sizeHelper.calWp(30),
    justifyContent: "space-between",
    minHeight: 30,
    padding: sizeHelper.calWp(30),
    alignSelf: "flex-end",
    minWidth: "30%",
    maxWidth: "80%",
  },
  leftInner: {
    backgroundColor: theme.colors.white,

    borderTopRightRadius: sizeHelper.calWp(30),
    borderBottomLeftRadius: sizeHelper.calWp(30),
    borderBottomRightRadius: sizeHelper.calWp(30),

    justifyContent: "space-between",
    minHeight: 30,
    paddingHorizontal: sizeHelper.calWp(20),
    paddingVertical: sizeHelper.calHp(10),
    minWidth: "30%",
    maxWidth: "80%",
  },
  rightText: {
    color: theme.colors.black,
    fontFamily: fonts.Outfit_Regular,
    fontWeight: "500",
    fontSize: sizeHelper.calWp(27),
    lineHeight: sizeHelper.calHp(25),
  },
  rightTime: {
    color: theme.colors.dark_gray,
    fontFamily: fonts.Outfit_Regular,
    fontSize: 10,
    textAlign: "right",
  },
  leftTime: {
    color: theme.colors.dark_gray,
    fontFamily: fonts.Outfit_Regular,
    fontSize: 10,
    textAlign: "right",
  },
  leftText: {
    color: theme.colors.secondry,
    fontFamily: fonts.Outfit_Regular,
    fontWeight: "500",
    fontSize: sizeHelper.calWp(27),
    lineHeight: sizeHelper.calHp(25),
  },
});
