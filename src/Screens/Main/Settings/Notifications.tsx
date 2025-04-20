import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { theme } from "../../../utils/Themes";
import CustomHeader from "../../../components/Header";
import { appStyles } from "../../../utils/GlobalStyles";
import ToggleSwitch from "../../../components/ToggleSwitch";
const NotificationsScreen = ({ navigation, route }: any) => {
  const [values,setValues]=useState({
    isGeneralNotification:true,
    isAppUpdates:false,
    isNewRequest:true,
    isPushNotifications:true,
    isAccountVerification:true,
    isFeatureEnhancements:false,
    isMonthlySummary:true,
    isSecurityAlerts:false,
    isUserFeedback:false




  })

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={appStyles.Container}>
          <CustomHeader title={"Notifications"} />
          <ToggleSwitch
            title={"General Notification"}
            switchOn={values.isGeneralNotification}
            onPress={() => setValues({...values,isGeneralNotification:!values?.isGeneralNotification})}
          />
           <ToggleSwitch
            title={"App updates"}
            switchOn={values.isAppUpdates}
            onPress={() => setValues({...values,isAppUpdates:!values?.isAppUpdates})}
          />
            <ToggleSwitch
            title={"New request"}
            switchOn={values.isNewRequest}
            onPress={() => setValues({...values,isNewRequest:!values?.isNewRequest})}
          />
            <ToggleSwitch
            title={"Push notifications"}
            switchOn={values.isPushNotifications}
            onPress={() => setValues({...values,isPushNotifications:!values?.isPushNotifications})}
          />
            <ToggleSwitch
            title={"Account verification"}
            switchOn={values.isAccountVerification}
            onPress={() => setValues({...values,isAccountVerification:!values?.isAccountVerification})}
          />
            <ToggleSwitch
            title={"Feature enhancements"}
            switchOn={values.isFeatureEnhancements}
            onPress={() => setValues({...values,isFeatureEnhancements:!values?.isFeatureEnhancements})}
          />
            <ToggleSwitch
            title={"Monthly summary"}
            switchOn={values.isMonthlySummary}
            onPress={() => setValues({...values,isMonthlySummary:!values?.isMonthlySummary})}
          />
            <ToggleSwitch
            title={"Security alerts"}
            switchOn={values.isSecurityAlerts}
            onPress={() => setValues({...values,isSecurityAlerts:!values?.isSecurityAlerts})}
          />
              <ToggleSwitch
            title={"User feedback"}
            switchOn={values.isUserFeedback}
            onPress={() => setValues({...values,isUserFeedback:!values?.isUserFeedback})}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
