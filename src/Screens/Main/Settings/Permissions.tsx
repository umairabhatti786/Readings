import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import { appStyles } from "../../../utils/GlobalStyles";
import ToggleSwitch from "../../../components/ToggleSwitch";
const PermissionsScreen = ({ navigation, route }: any) => {
  const [isLocationAccess, setIsLocationAccess] = useState(true);
  const [isGalleryAccess, setIsGalleryAccess] = useState(true);

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader title={"Permissions"} />
          <ToggleSwitch
            title={"Access location"}
            switchOn={isLocationAccess}
            onPress={() => setIsLocationAccess(!isLocationAccess)}
          />
          <ToggleSwitch
            title={"Access gallery & media"}
            switchOn={isGalleryAccess}
            onPress={() => setIsGalleryAccess(!isGalleryAccess)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
