import {
    Alert,
    FlatList,
    Image,
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { theme } from "../../utils/Themes";
  import CustomText from "../Text";
  import { fonts } from "../../utils/Themes/fonts";
  import { images } from "../../assets/pngs";
import { appStyles } from "../../utils/GlobalStyles";
import sizeHelper from "../../utils/Helpers";
import LinearGradient from "react-native-linear-gradient";

  
  const MessageSander = ({
  
    value,

    setValue,

    onSend,
  }: any) => {

  
  
    return (
      <>
        <View style={{...appStyles.rowjustify,gap:sizeHelper.calWp(20),
                      height: sizeHelper.calHp(80),

        }}>
         
  
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: sizeHelper.calWp(20),
              alignItems: "center",
              borderRadius:sizeHelper.calWp(20),
              flex:1,
              height:"100%",
              backgroundColor:theme.colors.white,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                gap: sizeHelper.calWp(20),
                flexDirection: "row",
              }}
            >
              <TextInput
                value={value}
                // editable={editable}
                // onSubmitEditing={onSubmitEditing}
                // onEndEditing={() => {
                //   onEndSumbit();  // Call onEndSumbit when editing ends
                // }}
                allowFontScaling={false} // Disable font scaling
                style={{
                  fontSize: sizeHelper.calHp(24),
                  width: "90%",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                  paddingTop: 0,
                  paddingVertical: 0, // Adjust as needed for centering
                  fontFamily: fonts.Outfit_Regular,
                  fontWeight: "500",
                  color: theme.colors.secondry,
                }}
                placeholder={"Your massage"}
                // placeholder={`${placeholder}${mandatory ? " *" : ""}`}
                multiline={true}
                placeholderTextColor={theme.colors.dark_gray}
                onChangeText={(txt: string) => {
                  setValue(txt);
  
                 
                }}
                autoCapitalize="none"
              />
            </View>
            <Image
                source={images.attach}
                style={{
                  width: sizeHelper.calWp(40),
                  height: sizeHelper.calWp(40),
                }}
                resizeMode={"contain"}
              />
  
          
          </View>

          <LinearGradient
            colors={["#B47AFF", "#4136F1"]}
            style={{ borderRadius: sizeHelper.calWp(30) }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={!value}
              onPress={onSend}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height:sizeHelper.calHp(75),
                width:sizeHelper.calWp(100),
                borderRadius:sizeHelper.calWp(20)
              }}
            >
              <Image
                source={images.send}
                style={{
                  width: sizeHelper.calWp(40),
                  height: sizeHelper.calWp(40),
                }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </LinearGradient>

        
        </View>
      </>
    );
  };
  export default MessageSander;
  
  const styles = StyleSheet.create({
   
   
    
  });
  