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

const TagsModal = ({
  modalVisible,
  setModalVisible,
  tags,
  selctedTags,
  setSelectedTag,
  title
}: any) => {
  const TagsContainer = ({ item, index, onPress, isSelected }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={appStyles.rowjustify}
      >
        <CustomText
          text={item?.title}
          fontWeight="500"
          fontFam={fonts.Outfit_Regular}
          size={20}
        />

        <TouchableOpacity onPress={onPress}>
          <Image
            style={{
              width: sizeHelper.calWp(40),
              height: sizeHelper.calWp(40),
            }}
            source={isSelected ? images.flled_check : images.unfill_check}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
          text={title}
          fontWeight="500"
          fontFam={fonts.Outfit_Regular}
          color={theme.colors.black}
          size={25}
        />
        <View style={appStyles.row}>
          <CustomSearch placeholder="Search anything…" />
        </View>

        <ScrollView
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
        </ScrollView>

        <View style={appStyles.rowjustify}>
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
            text="Select"
          />
        </View>
      </View>
    </Modal>
  );
};
export default TagsModal;

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
    height: "50%",
    borderRadius: sizeHelper.calWp(30),
    padding: sizeHelper.calWp(30),
    gap: sizeHelper.calHp(30),
    alignSelf: "center",
  },
});
