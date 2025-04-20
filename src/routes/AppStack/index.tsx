import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../Screens/Auth/Login";
import OnboardingScreen from "../../Screens/Auth/Onboarding";
import SignupScreen from "../../Screens/Auth/Signup";
import ForgotPassword from "../../Screens/Auth/ForgotPassword";
import ProfileSetup from "../../Screens/Auth/ProfileSetup";
import UploadPhoto from "../../Screens/Auth/UploadPhoto";
import InterestsAndHobbies from "../../Screens/Auth/InterestsAndHobbies";
import BottomTab from "../BottomTab";
import EventDetails from "../../Screens/Main/EventDetails";
import UploadStory from "../../Screens/Main/UploadStory";
import NotificationScreen from "../../Screens/Main/Notification";
import { AppStackParamList } from "../../utils/Types";
import ProfileScreen from "../../Screens/Main/Tabs/Profile";
import DiscoverEvent from "../../Screens/Main/DiscoverEvent";
import EventSearch from "../../Screens/Main/EventSearch";
import EditProfileScreen from "../../Screens/Main/EditProfile";
import PersonalInfoScreen from "../../Screens/Main/PersonalInfo";
import SociallinksScreen from "../../Screens/Main/Sociallinks";
import AddSociallinkScreen from "../../Screens/Main/AddSociallink";
import CreateSociallinkScreen from "../../Screens/Main/CreateSociallink";
import AddInterestScreen from "../../Screens/Main/AddInterests";
import InterestsScreen from "../../Screens/Main/Interests";
import SettingsScreen from "../../Screens/Main/Settings";
import PasswordResetScreen from "../../Screens/Main/PasswordReset";
import AccountPrivacyScreen from "../../Screens/Main/Settings/AccountPrivacy";
import PermissionsScreen from "../../Screens/Main/Settings/Permissions";
import NotificationsScreen from "../../Screens/Main/Settings/Notifications";
import BlockedScreen from "../../Screens/Main/Settings/Blocked";
import RestrictedScreen from "../../Screens/Main/Settings/Restricted";
import ChatScreen from "../../Screens/Main/Chat";
import CreateEvent from "../../Screens/Main/Event/CreateEvent";
import AddEventPhoto from "../../Screens/Main/Event/AddEventPhoto";
import DateTimeVenue from "../../Screens/Main/Event/DateTimeVenue";
import ManageinvitesAndAdmins from "../../Screens/Main/Event/ManageinvitesAndAdmins";
import GuestUserScreen from "../../Screens/Main/GuestUser";
import QRScreen from "../../Screens/Main/QRScreen";
import SearchListScreen from "../../Screens/Main/SearchList";
import DiscoverEventsSearch from "../../Screens/DiscoverEventsSearch";
import ConnectionsScreen from "../../Screens/Main/Connections";
import SplashScreen from "../../Screens/Auth/Splash";
const Stack = createNativeStackNavigator<AppStackParamList>();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"SplashScreen"} component={SplashScreen} />

      <Stack.Screen name={"OnboardingScreen"} component={OnboardingScreen} />
      <Stack.Screen name={"SignupScreen"} component={SignupScreen} />
      <Stack.Screen name={"BottomTab"} component={BottomTab} />
      <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} />
      <Stack.Screen name={"DiscoverEvent"} component={DiscoverEvent} />
      <Stack.Screen name={"EventSearch"} component={EventSearch} />
      <Stack.Screen name={"EventDetails"} component={EventDetails} />
      <Stack.Screen name={"UploadStory"} component={UploadStory} />
      <Stack.Screen name={"EditProfile"} component={EditProfileScreen} />
      <Stack.Screen name={"PersonalInfo"} component={PersonalInfoScreen} />
      <Stack.Screen name={"Sociallinks"} component={SociallinksScreen} />
      <Stack.Screen name={"AddSociallink"} component={AddSociallinkScreen} />
      <Stack.Screen name={"CreateSociallink"} component={CreateSociallinkScreen} />
      <Stack.Screen name={"AddInterest"} component={AddInterestScreen} />
      <Stack.Screen name={"Interests"} component={InterestsScreen} />
      <Stack.Screen name={"PermissionsScreen"} component={PermissionsScreen} />
      <Stack.Screen name={"Notifications"} component={NotificationsScreen} />
      <Stack.Screen name={"BlockedScreen"} component={BlockedScreen} />
      <Stack.Screen name={"RestrictedScreen"} component={RestrictedScreen} />
      <Stack.Screen name={"ChatScreen"} component={ChatScreen} />
      <Stack.Screen name={"CreateEvent"} component={CreateEvent} />
      <Stack.Screen name={"AddEventPhoto"} component={AddEventPhoto} />
      <Stack.Screen name={"DateTimeVenue"} component={DateTimeVenue} />
      <Stack.Screen name={"ManageinvitesAndAdmins"} component={ManageinvitesAndAdmins} />
      <Stack.Screen name={"GuestUser"} component={GuestUserScreen} />
      <Stack.Screen name={"QRScreen"} component={QRScreen} />
      <Stack.Screen name={"SearchList"} component={SearchListScreen} />
      <Stack.Screen name={"DiscoverEventsSearch"} component={DiscoverEventsSearch} />
      <Stack.Screen name={"Connections"} component={ConnectionsScreen} />

      
      
      
      
      
      
      <Stack.Screen
        name={"NotificationScreen"}
        component={NotificationScreen}
      />
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
      <Stack.Screen name={"ProfileSetup"} component={ProfileSetup} />
      <Stack.Screen name={"UploadPhoto"} component={UploadPhoto} />
      <Stack.Screen name={"SettingsScreen"} component={SettingsScreen} />
      <Stack.Screen name={"PasswordReset"} component={PasswordResetScreen} />
      <Stack.Screen name={"AccountPrivacy"} component={AccountPrivacyScreen} />

      
      

      <Stack.Screen
        name={"InterestsAndHobbies"}
        component={InterestsAndHobbies}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
