import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import { images } from "../../../assets/pngs";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import ScreenLoader from "../../../components/ScreenLoader";
const CreateSociallinkScreen = ({ navigation, route }: any) => {
  const [url, setUrl] = useState("https://facebook.com/john snow");
  const [loading, setLoading] = useState(false);

  const scoialParams = route?.params?.data;

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader backSource={images.cross} />

          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              gap: sizeHelper.calHp(10),
            }}
          >
            <Image
              style={styles.socialImg}
              resizeMode="contain"
              source={scoialParams?.img}
            />

            <CustomText text={scoialParams?.name} size={23} />
          </View>
          <CustomInput
            value={url}
            onChangeText={(txt:string)=>setUrl(txt)}
            backgroundColor={theme.colors.background}
            label="URL"
          />
        </View>
        <CustomButton
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);

              navigation.goBack();
            }, 2000);
          }}
          style={{ margin: sizeHelper.calWp(30) }}
          text="Save now"
        />
      </SafeAreaView>
      {loading && <ScreenLoader />}
    </>
  );
};

export default CreateSociallinkScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  socialImg: {
    width: sizeHelper.calWp(150),
    height: sizeHelper.calWp(150),
    borderRadius: sizeHelper.calWp(30),
  },


});
