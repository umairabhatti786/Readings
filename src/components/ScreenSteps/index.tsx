import {StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sizeHelper from "../../utils/Helpers";
import { appStyles } from "../../utils/GlobalStyles";
import { theme } from "../../utils/Themes";
const ScreenSteps = ({ activeStep = 1,steps=[1, 2, 3,4]}: any) => {
  return (
    <View style={{ ...appStyles.row, gap: sizeHelper.calWp(10),alignSelf:"center" }}>
    {steps.map((item:any, index:any) => {
      return (
        <View
          key={index}
          style={{
            ...styles.container,
            backgroundColor:
            activeStep >= item ? theme.colors.primary : theme.colors.black+"20",
          }}
        />
      );
    })}
  </View>
  );
};
export default ScreenSteps;
const styles = StyleSheet.create({
  container:{
    width: "23%",
    height: sizeHelper.calHp(7),
    borderRadius: 999,
  }

});
