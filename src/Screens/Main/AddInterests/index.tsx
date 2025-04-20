import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import CustomText from "../../../components/Text";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import ScreenLoader from "../../../components/ScreenLoader";
const AddInterestScreen = ({ navigation, route }: any) => {
  const [interest, setInterest] = useState("Camping");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader title={"Add interests"} />
          <CustomText
            text={"Add your interest if you have not found the one "}
            color={theme.colors.primary}
            size={20}
          />

          <CustomInput
            value={interest}
            backgroundColor={theme.colors.background}
            onChangeText={(txt: any) => setInterest(txt)}
            label="Interest"
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
          style={{ marginHorizontal: sizeHelper.calWp(30) }}
          text="Add now"
        />
      </SafeAreaView>
      {loading && <ScreenLoader />}
    </>
  );
};

export default AddInterestScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
