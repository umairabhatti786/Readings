import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { appStyles } from "../../../utils/AppStyles";
import DropDown from "../../../components/DropDown";
import {
  BookFormatData,
  BookLanguageData,
  BookPriceData,
  CountryData,
  categoriesData,
} from "../../../utils/Data";
import { windowWidth } from "../../../utils/Dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import {
  setBooksAdvanceSearch,
  setIsBooksAdvanceSearch,
} from "../../../redux/reducers/advanceSearchReducer";
import {
  setAuthSearch,
  setIsHighDiscount,
  setSubCategory,
} from "../../../redux/reducers/authReducer";
const FilterScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedPrce, setSelectedPice] = useState("");
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    publication_year: "",
    Book_Language: "",
    PAK_PRICE: "",
    keyword: "",
    Bind_IND: "",
  });

  return (
    <ScreenLayout>
      <View
        style={{
          paddingHorizontal: scale(20),
          paddingBottom: verticalScale(10),
        }}
      >
        <TopHeader title="Advanced Search" />
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.dull_white, flex: 1 }}
        contentContainerStyle={{
          backgroundColor: colors.dull_white,
          gap: verticalScale(20),
          flex: 1,
        }}
      >
        <View
          style={{
            paddingHorizontal: scale(20),
            gap: verticalScale(20),
            flex: 1,
            paddingTop: verticalScale(10),
          }}
        >
          <CustomInput
            placeholder="Keyword"
            value={values.keyword}
            onChangeText={(txt: any) => {
              setValues({ ...values, keyword: txt });
            }}
          />
          <CustomInput
            placeholder="Title"
            value={values.title}
            onChangeText={(txt: any) => {
              setValues({ ...values, title: txt });
            }}
          />
          <CustomInput
            placeholder="Author"
            value={values.author}
            onChangeText={(txt: any) => {
              setValues({ ...values, author: txt });
            }}
          />
          <CustomInput
            placeholder="ISBN"
            keyboard={"numeric"}
            value={values.isbn}
            onChangeText={(txt: any) => {
              setValues({ ...values, isbn: txt });
            }}
          />
          <DropDown
            placeholder={"Category"}
            label="Download"
            setValue={setSelectedCategory}
            search
            value={selectedCategory}
            onSelect={(it: any) => {
              setSelectedCategory(it?.value);
              setValues({ ...values, category: it?.value });
            }}
            // { sub: "Corrections & Erasers", id: 2323 },

            data={categoriesData.map((item, _index) => {
              return {
                id: item?.id,
                label: item?.title,
                value: item?.title,
              };
            })}
          />
            <DropDown
            placeholder={"Price Range"}
            label="Download"
            maxHeight={150}
            setValue={setSelectedPice}
            value={selectedPrce}
            onSelect={(it: any) => {
              setSelectedPice(it?.label);
              setValues({ ...values, PAK_PRICE: it?.value });
            }}
            data={BookPriceData.map((item, _index) => {
              return {
                id: item?.id,
                label: item?.label,
                value: item?.value,
              };
            })}
          />

        

          <View style={appStyles.rowjustify}>
            <DropDown
              placeholder={"language"}
              mainWidth={windowWidth - scale(200)}
              dropWidth={windowWidth - scale(200)}
              label="Download"
              setValue={setSelectedLanguage}
              value={selectedLanguage}
              onSelect={(it: any) => {
                setSelectedLanguage(it?.label);
                setValues({ ...values, Book_Language: it?.value });
              }}
              data={BookLanguageData.map((item, _index) => {
                return {
                  id: item?.id,
                  label: item?.label,
                  value: item?.value,
                };
              })}
            />

            <DropDown
              placeholder={"Formats"}
              mainWidth={windowWidth - scale(200)}
              dropWidth={windowWidth - scale(200)}
              label="Download"
              setValue={setSelectedFormat}
              value={selectedFormat}
              onSelect={(it: any) => {
                setSelectedFormat(it?.label);
                setValues({ ...values, Bind_IND: it?.value });
              }}
              data={BookFormatData.map((item, _index) => {
                return {
                  id: item?.id,
                  label: item?.label,
                  value: item?.value,
                };
              })}
            />
          </View>

          <View style={appStyles.rowjustify}>
            <CustomInput
              width={"48.3%"}
              placeholder="Publisher"
              value={values.publisher}
              onChangeText={(txt: any) => {
                setValues({ ...values, publisher: txt });
              }}
            />

            <CustomInput
              width={"48.3%"}
              maxLength={4}
              keyboard={"numeric"}
              placeholder="Publication Year"
              value={values.publication_year}
              onChangeText={(txt: any) => {
                setValues({ ...values, publication_year: txt });
              }}
            />
          </View>
        
        </View>
        <View style={styles.continueBtnContainer}>
          <CustomButton
            onPress={() => {
              dispatch(setAuthSearch(""));
              dispatch(setSubCategory({}));
              dispatch(setIsHighDiscount(false));
              dispatch(setIsBooksAdvanceSearch(true));
              dispatch(setBooksAdvanceSearch(values));
              navigation.navigate("SearchResultScreen",{isFilter:true});
            }}
            text="Search"
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenLayout>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  continueBtnContainer: {
    paddingBottom: verticalScale(30),
    paddingHorizontal: scale(20),
  },
});
