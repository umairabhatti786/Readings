import { StyleProp, ViewStyle, RefreshControlProps, TextStyle } from "react-native";

//  Custom text props
export type TextType = {
  color?: string;
  size?: number;
  fontFam?: string;
  text?: any;
  style?: StyleProp<TextStyle>; // Style for the screen container
  lineHeight?: number;
  numberOfLines?: number;
  fontWeight?: string;
  textDecorationLine?: string;
  label?: string;
  textTransform?: any;
};


export type SwiperButtonType = {
  title?:string,
  onSwipe?:()=>void,
  bgColor?:string,
  disable?:boolean,
};
//  Custom button props

export type ButtonProps = {
  text?: string;
  onPress?: () => void;
  width?: any;
  height?: number;
  size?: number;
  fontFam?: any;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>; // Style for the screen container
  bgColor?: any;
  textColor?: any;
  borderColor?: any;
  disable?: boolean;
  borderWidth?: number;
  paddingHorizontal?: number;
  isLoading?: any;
  fontWeight?:string,
  colors?:any
  children?:any

};
//  Custom input props

export type InputProps = {
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboard?: any;
  props?: any;
  value?: any;
  onChangeText?: any;
  onBlur?: any;
  onShowPassword?: any;
  editable?: boolean;
  color?: string;
  maxLength?: number;
  leftSource?: any;
  fontWeight?: any;
  multiline?: boolean;
  height?: any;
  width?: any;
  fontSize?: any;
  placeholderTextColor?: any;
  borderWidth?: any;
  borderRadius?: any;
  backgroundColor?: any;
  borderColor?: any;
  rightSourceSize?: any;
  textAlign?: any;
  textAlignVertical?: any;
  paddingTop?: any;
  onSubmitEditing?: () => void;
  mandatory?:boolean
  label?:string
  rightSourceColor?:any
  onFocus?:()=>void
  labelImg?:any
  labelSize?:any
  rightlabel?:any
  mode?:any
};
//  Custom screen layout props

export type ScreenType = {
  bgColor?: string; // Background color
  isScrollEnabled?: boolean; // Indicates if scrolling is enabled
  ScrollRef?: React.Ref<any>; // Reference to the scroll view
  onScroll?: (event: any) => void; // Scroll event handler
  style?: StyleProp<ViewStyle>; // Style for the screen container
  children?: React.ReactNode; // Children components
  refreshControl?: React.ReactElement<RefreshControlProps>; // Refresh control component
  StatusBarColor?:any
};

  // App Stack Params
export type AppStackParamList = {
  BottomTab: undefined;
  Login: undefined;
  OnboardingScreen: undefined;
  SignupScreen: undefined;
  ForgotPassword: undefined;
  ProfileSetup: undefined;
  UploadPhoto: undefined;
  InterestsAndHobbies: undefined;
  EventDetails: undefined;
  UploadStory: undefined;
  NotificationScreen: undefined;
  ProfileScreen:undefined
  DiscoverEvent:undefined
  EventSearch:undefined
  EditProfile:undefined
  PersonalInfo:undefined
  Sociallinks:undefined
  AddSociallink:undefined
  CreateSociallink:undefined
  AddInterest:undefined
  Interests:undefined
  SettingsScreen:undefined
  PasswordReset:undefined
  AddAddress:undefined
  AccountPrivacy:undefined
  PermissionsScreen:undefined
  Notifications:undefined
  BlockedScreen:undefined
  RestrictedScreen:undefined
  ChatScreen:undefined
  CreateEvent:undefined
  AddEventPhoto:undefined
  DateTimeVenue:undefined
  ManageinvitesAndAdmins:undefined
  GuestUser:undefined
  QRScreen:undefined
  SearchList:undefined
  DiscoverEventsSearch:undefined
  Connections:undefined
  SplashScreen:undefined
};
