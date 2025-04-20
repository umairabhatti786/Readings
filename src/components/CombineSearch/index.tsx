import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { appStyles } from "../../utils/GlobalStyles";
import sizeHelper from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import { theme } from "../../utils/Themes";
import { images } from "../../assets/pngs";

type Props = {
  placeholder?: string;
  navigation?: any;
  value?: any;
  onPressClose?: any;
  backgroundColor?: string;
  width?: any;
  onChangeText?: (text: any) => void;
  onFocus?: () => void;
  onFocuslocation?: any;
  onSubmitEditing?: () => void;
  onChangeTextlocation?: any;
  location?: any;
  locationPlaceholder?: any;
};

const CombineSearch = ({
  placeholder,
  onChangeText,
  value,
  backgroundColor,
  width,
  onFocus,
  onSubmitEditing,
  onChangeTextlocation,
  location,
  locationPlaceholder,
  onFocuslocation,
}: Props) => {
  const searchContainerStyle = useMemo(() => {
    return {
      ...styles.searchContainer,
      width: width || "100%",
      backgroundColor: backgroundColor || theme.colors.white,
      gap: sizeHelper.calWp(20),
    };
  }, [width, backgroundColor]);

  const iconStyle = useMemo(() => ({
    width: sizeHelper.calWp(30),
    height: sizeHelper.calWp(30),
  }), []);

  return (
    <View style={searchContainerStyle}>
      {/* Location Row */}
      <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
        <Image
          source={images.pin_location}
          resizeMode="contain"
          style={{
            ...iconStyle,
            tintColor: theme.colors.dark_gray,
          }}
        />
        <TextInput
          allowFontScaling={false}
          style={{ ...styles.inputContainer, color: theme.colors.black }}
          placeholder={locationPlaceholder}
          value={location}
          onChangeText={onChangeTextlocation}
          onFocus={onFocuslocation}
          placeholderTextColor={theme.colors.dark_gray}
        />
      </View>

      {/* Divider */}
      <View
        style={{
          width: "100%",
          height: sizeHelper.calHp(1),
          backgroundColor: theme.colors.gray_placeholder,
        }}
      />

      {/* Search Row */}
      <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
        <Image
          source={images.search}
          resizeMode="contain"
          style={{
            ...iconStyle,
            tintColor: theme.colors.black,
          }}
        />
        <TextInput
          allowFontScaling={false}
          style={{ ...styles.inputContainer, color: theme.colors.black }}
          placeholder={placeholder}
          value={value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholderTextColor={theme.colors.dark_gray}
        />
      </View>
    </View>
  );
};

export default React.memo(CombineSearch);

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  img: {
    width: 23,
    height: 23,
  },
  searchContainer: {
    paddingHorizontal: sizeHelper.calWp(25),
    paddingVertical: sizeHelper.calHp(10),
    borderRadius: sizeHelper.calWp(25),
  },
  inputContainer: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.Outfit_Regular,
    padding: 0,
  },
});
