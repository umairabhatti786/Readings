import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle
} from "react-native";
import sizeHelper from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import { theme } from "../../utils/Themes";
import { images } from "../../assets/pngs";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  placeholder?: string;
  navigation?: any;
  value?: any;
  onPressClose?: any;
  backgroundColor?: string;
  width?: any;
  onChangeText?: (text: any) => void;
  onFocus?: () => void;
  onFilter?: () => void;
  onSubmitEditing?: () => void;
  isfilter?: any;
  isAdd?: any;
  onAdd?: any;
  ContainerStyle?:StyleProp<ViewStyle>;
};

const CustomSearch = ({
  placeholder,
  onChangeText,
  value,
  backgroundColor,
  width,
  onFocus,
  onFilter,
  onSubmitEditing,
  isfilter,
  isAdd,
  onAdd,
  ContainerStyle
}: Props) => {
  return (
    <>
      <View
      style={[
        {
          ...styles.searchContainer,
          width: width || "100%",
          backgroundColor: backgroundColor || theme.colors.search_background,
          height: sizeHelper.calHp(75),
          gap: sizeHelper.calWp(20),
        },
        ContainerStyle  as StyleProp<ViewStyle>
      ]}
    >
      <Image
        source={images.search}
        resizeMode="contain"
        style={{
          width: sizeHelper.calWp(30),
          height: sizeHelper.calWp(30),
          tintColor: theme.colors.dark_gray,
        }}
      />
      <TextInput
        allowFontScaling={false} // Disable font scaling
        style={{ ...styles.inputContainer, color: theme.colors.black }}
        placeholder={placeholder}
        value={value}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholderTextColor={theme.colors.dark_gray}
      />
      {isfilter && (
        <LinearGradient
          colors={["#8743FF", "#4136F1"]}
          style={{ borderRadius: sizeHelper.calWp(23) }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onFilter}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
              width: sizeHelper.calWp(80),
              borderRadius: sizeHelper.calWp(10),
            }}
          >
            <Image
              source={images.filter}
              style={{
                width: sizeHelper.calWp(30),
                height: sizeHelper.calWp(30),
              }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </LinearGradient>
      )}

      {isAdd && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onAdd}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "85%",
            width: sizeHelper.calWp(75),
            marginRight:sizeHelper.calWp(-50),
            borderRadius: sizeHelper.calWp(30),
            backgroundColor: theme.colors.black,
          }}
        >
          <Image
            source={images.plus}
            style={{
              width: sizeHelper.calWp(30),
              height: sizeHelper.calWp(30),
              tintColor: theme.colors.white,
            }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      )}
    </View>
    </>
  
  );
};
export default CustomSearch;

const styles = StyleSheet.create({

  img: { width: 23, height: 23 },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizeHelper.calWp(25),
    borderRadius: sizeHelper.calWp(25),
  },
  inputContainer: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.Outfit_Regular,
    padding: 0,
  },
});
