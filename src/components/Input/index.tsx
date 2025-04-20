import {View } from "react-native";
import CustomText from "../Text";
import { InputProps } from "../../utils/Types";
import { theme } from "../../utils/Themes";
import { fonts } from "../../utils/Themes/fonts";
import sizeHelper from "../../utils/Helpers";
import { TextInput } from "react-native-paper";

const CustomInput = ({
  placeholder,
  keyboard,
  secureTextEntry,
  props,
  fontWeight,
  multiline,
  height,
  fontSize,
  value,
  onChangeText,
  onBlur,
  error,
  editable,
  color,
  maxLength,
  width,
  placeholderTextColor,
  borderRadius,
  backgroundColor,
  textAlign,
  textAlignVertical,
  paddingTop,
  onSubmitEditing,
  label,
  onFocus,
}: InputProps) => {
  return (
    <View
      style={{
        ...props,
        width: width || "100%",
        height: sizeHelper.calHp(height || 80),
      }}
    >
      <TextInput
        value={value}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
        
        mode={"outlined"}
        label={label}
        textColor={theme.colors.black}
        theme={{
          colors: {
            onSurfaceVariant: theme.colors.gray_placeholder, // Label color
          },
        }}
        outlineColor="#E4E2E2" // Light grey border
        activeOutlineColor="#E4E2E2" // Slightly darker when focused
        outlineStyle={{
          borderRadius: borderRadius || sizeHelper.calWp(15),
          borderWidth: 0.5,
        }}
        allowFontScaling={false} // Disable font scaling
        style={{
          backgroundColor: backgroundColor || theme.colors.white,
          fontSize: fontSize || 14,
          width: "100%",
          height: "100%",
          textAlign: textAlign,
          textAlignVertical: textAlignVertical,
          paddingTop: paddingTop || 0,
          paddingVertical: 0, // Adjust as needed for centering
          fontFamily: fonts.Outfit_Regular,
          fontWeight: fontWeight || "400",
          color: color || theme.colors.black,
        }}
        placeholder={placeholder}
        multiline={multiline}
        placeholderTextColor={
          placeholderTextColor || theme.colors.gray_placeholder
        }
        keyboardType={keyboard}
        maxLength={maxLength}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry || false}
        onChangeText={onChangeText}
        onBlur={onBlur}
        autoCapitalize="none"
      />

      {error && (
        <View
          style={{
            marginTop: sizeHelper.calHp(10),
          }}
        >
          <CustomText
            size={12}
            text={error}
            color={theme.colors.red}
          />
        </View>
      )}
    </View>
  );
};
export default CustomInput;
