import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/Text";
import { theme } from "../../utils/Themes";
import sizeHelper from "../../utils/Helpers";
import HomeScreen from "../../Screens/Main/Tabs/Home";
import { images } from "../../assets/pngs";
import CalendarScreen from "../../Screens/Main/Tabs/Calendar";
import AddEvent from "../../Screens/Main/Tabs/AddEvent";
import ProfileScreen from "../../Screens/Main/Tabs/Profile";
import ContactScreen from "../../Screens/Main/Tabs/Contacts";
const BottomTab = ({navigation}: any) => {
  const Bottom = createBottomTabNavigator();
  const TabItem = ({ focused, title, img, }: any) => {
    return (
      <View style={[style.itemStyle]}>
        <View
          style={{
            width: sizeHelper.calWp(7),
            height: sizeHelper.calWp(7),
            borderRadius: sizeHelper.calWp(7),
            backgroundColor: focused ? theme.colors.primary : "transparent",
          }}
        />

        <Image
          resizeMode="contain"
          source={img}
          style={{
            ...style.img,
            tintColor: focused
              ? theme.colors.primary
              : theme.colors.gray_placeholder,
          }}
        />
        <CustomText
          text={title}
          size={18}
          color={focused ? theme.colors.primary : theme.colors.gray_placeholder}
        />
      </View>
    );
  };

  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        animationEnabled: false,
        gestureEnabled: true,
        keyboardHidesTabBar: true,

        cardStyleInterpolator: ({ current, next, layouts }: any) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          justifyContent: "center",
          alignItems: "center",
          height: sizeHelper.calHp(130),
          borderTopWidth: -1,
          paddingTop: sizeHelper.calHp(20),
        },

        headerShown: false,
      })}
    >
      {/* Home Tab */}
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem
                title={"Home"}
                colors={theme.colors}
                img={images.home}
                focused={focused}
              />
            );
          },
        }}
      />
      {/* Calendar Tab */}
      <Bottom.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem
                colors={theme.colors}
                title={"Calendar"}
                img={images.calendar}
                focused={focused}
              />
            );
          },
        }}
      />
      {/* AddEvent Tab */}

      <Bottom.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity

            onPress={()=>navigation.navigate("CreateEvent")}
              >
                   <Image
                resizeMode="contain"
                source={images.add_event}
                style={{
                  height: sizeHelper.calHp(70),
                  width: sizeHelper.calHp(70),
                  borderRadius: sizeHelper.calWp(25),
                }}
              />

              </TouchableOpacity>
           
            );
          },
        }}
      />
      {/* Contacts Tab */}
      <Bottom.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem
                colors={theme.colors}
                title={"Contacts"}
                img={images.users_group}
                focused={focused}
              />
            );
          },
        }}
      />
      {/* profile Tab */}
      <Bottom.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem
                colors={theme.colors}
                title={"Profile"}
                img={images.profile}
                focused={focused}
              />
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};
export default BottomTab;

const style = StyleSheet.create({
  itemStyle: {
    width: sizeHelper.calWp(130),
    backgroundColor: "transparent", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: sizeHelper.calHp(5),
  },
  img: {
    height: sizeHelper.calHp(35),
    width: sizeHelper.calHp(35),
  },
  tabBarStyle:{
    
  }
});
