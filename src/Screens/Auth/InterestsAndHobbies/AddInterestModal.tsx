import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
  import { appStyles } from "../../../utils/GlobalStyles";
  import sizeHelper from "../../../utils/Helpers";
  import { theme } from "../../../utils/Themes";
  import { images } from "../../../assets/pngs";
  import CustomText from "../../../components/Text";
  import { fonts } from "../../../utils/Themes/fonts";
  import Modal from "react-native-modal";
  import { windowWidth } from "../../../utils/Commons/Dimention";
  import CustomSearch from "../../../components/Search";
  import CustomButton from "../../../components/Button";
import { useState } from "react";
import CustomInput from "../../../components/Input";
  
  const AddInterestModal = ({
    modalVisible,
    setModalVisible,
 
  }: any) => {
    const [interest,setInterest]=useState()
   
  
    return (
      <Modal
        isVisible={modalVisible}
        deviceWidth={windowWidth}
        backdropColor="rgba(0,0,0,0.5)"
        onBackButtonPress={() => setModalVisible?.(false)}
        onBackdropPress={() => setModalVisible(false)} // Allows closing when tapping outside
        style={{ margin: 0 }}
      >
        <View style={styles.modal}>
          {/* <Header /> */}
          <CustomText
            text={"Add interest"}
            fontWeight="600"
            fontFam={fonts.Outfit_Medium}
            color={theme.colors.black}
            size={25}
          />
              <CustomText
            text={"Add your interest if you have not found the one "}
      
            color={theme.colors.primary}
            size={20}
          />
          <CustomInput
          placeholder="Interest"
          />
        
  
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: sizeHelper.calHp(30),
              paddingBottom: sizeHelper.calHp(30),
            }}
          >
            {tags?.map((item: any, index: any) => {
              const isSelected = selctedTags.some((i: any) => i.id === item.id);
  
              return (
                <TagsContainer
                  key={index.toString()}
                  isSelected={isSelected}
                  onPress={() => {
                    setSelectedTag((prev: any) => {
                      const exists = prev.some(
                        (team: any) => team.id === item.id
                      ); // Check if item exists
  
                      if (exists) {
                        // Remove the specific item
                        return prev.filter((team: any) => team.id !== item.id);
                      } else {
                        // Add the new item
                        return [...prev, item];
                      }
                    });
                  }}
                  item={item}
                  index={index}
                />
              );
            })}
          </ScrollView> */}
  
          <View style={{...appStyles.rowjustify,marginTop:"35%"}}>
            <CustomButton
              width={"48%"}
              onPress={() => setModalVisible(false)}
              bgColor={theme.colors.white}
              borderColor={theme.colors.button_border}
              borderWidth={1}
              textColor={theme.colors.dark_gray}
              text="Cancel"
            />
            <CustomButton
              onPress={() => setModalVisible(false)}
              width={"48%"}
              text="Add"
            />
          </View>
        </View>
      </Modal>
    );
  };
  export default AddInterestModal;
  
  const styles = StyleSheet.create({
    main: {
      padding: sizeHelper.calWp(8),
      borderRadius: sizeHelper.calWp(35),
      width: "49%",
      backgroundColor: theme.colors.white,
      gap: sizeHelper.calWp(20),
    },
  
    modal: {
      width: "90%",
      backgroundColor: theme.colors.white,
      marginHorizontal: sizeHelper.calWp(30),
      borderRadius: sizeHelper.calWp(30),
      padding: sizeHelper.calWp(30),
      gap: sizeHelper.calHp(10),
      alignSelf: "center",
    },
  });
  