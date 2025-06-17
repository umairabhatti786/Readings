import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import { font } from "../../../utils/font";
import CustomButton from "../../../components/CustomButton";
import { appStyles } from "../../../utils/AppStyles";
import AddressCard from "../../../components/AddressCard";
import PaymentCard from "../../../components/PaymentCard";
import DeleteAccountModal from "./DeleteAccountModal";
import { ApiServices } from "../../../apis/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  setAuthData,
  setAuthToken,
} from "../../../redux/reducers/authReducer";
import { useIsFocused } from "@react-navigation/native";
import { ProfileLayout } from "../../../utils/Loyout/ProfileLayout";
import CustomToast from "../../../components/CustomToast";
import {
  AUTHDATA,
  StorageServices,
  TOKEN,
} from "../../../utils/StorageService";
import { sessionCheck } from "../../../utils/CommonHooks";
import ActionModal from "../../../components/ActionModal";
const ProfileScreen = ({ navigation }: any) => {
  const [isAccountDeleteModal, setIsAccountDeleteModal] = useState(false);
  const [isDeleteAdddressModal, setIsDeleteAdddressModal] = useState(false);
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false);

  const [userAddresses, setUserAddresses] = useState<any>();
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState<any>();
  const [laoding, setlaoding] = useState(false);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [deletetText, setDeleteText] = useState("");

  console.log("token", token);

  // useEffect(() => {
  //   getUserAddresses();
  //   getUserProfile();
  // }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      // Code to run when the screen is focused
      getUserAddresses();
      getUserProfile();
      // Perform any other actions or fetch data
    } else {
      // Code to run when the screen is unfocused (if needed)
    }
  }, [isFocused]);
  const getUserAddresses = () => {
    setlaoding(true);
    ApiServices.GetAddress(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        console.log("AddressRes", result);

        if (result?.data) {
          setUserAddresses(result?.data?.addresses);
          setlaoding(false);
        } else {
          if (result?.error == "Invalid token") {
            sessionCheck(dispatch, navigation);

            return;
          }
          setlaoding(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setlaoding(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const getUserProfile = () => {
    ApiServices.GetProfile(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.data) {
          setProfile(result?.data?.user);
          StorageServices.setItem(AUTHDATA, result?.data?.user);
          dispatch(setAuthData(result?.data?.user));
        } else {
          // setMessage(result?.error);
          // setIsMessage(true);
        }
      } else {
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const deleteUserAddress = () => {
    let params = {
      id: selectedAddress?.id,
      token: token,
    };

    ApiServices.DeleteAddresses(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.success) {
            setMessage(result?.message);
            let filterAddress = userAddresses?.filter(
              (it: any) => it.id != selectedAddress?.id
            );
            setUserAddresses(filterAddress);
            setIsMessage(true);
          } else {
            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };

  const onDeleteAccount = () => {
    ApiServices.DeleteAccount(token, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        // console.log("result",result?.error)
        if (result?.success) {
          setMessage(result?.message);
          setIsMessage(true);

          dispatch(setAuthData(null));
          dispatch(setAuthToken(null));
          StorageServices.removeItem(TOKEN);
          StorageServices.removeItem(AUTHDATA);
          navigation.goBack();
        } else {
          setIsAccountDeleteModal(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setIsAccountDeleteModal(false);

        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };
  return (
    <>
      <ScreenLayout>
        {laoding ? (
          <ProfileLayout />
        ) : (
          <>
            <View
              style={{
                paddingHorizontal: scale(20),
                paddingBottom: verticalScale(10),
              }}
            >
              <TopHeader
                title="Profile"
                rightTitleColor={colors.red}
                rightTitle="Delete Account"
                onRightPress={() => {
                  setIsAccountDeleteModal(true);
                }}
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                backgroundColor: colors.dull_white,
                flex: 1,
              }}
              contentContainerStyle={{
                backgroundColor: colors.dull_white,
                gap: verticalScale(20),
              }}
            >
              <View style={{ paddingHorizontal: scale(20) }}>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: colors.white,
                    padding: scale(15),
                    borderRadius: scale(10),
                    gap: verticalScale(15),
                    marginTop: verticalScale(10),
                  }}
                >
                  <View style={{ ...appStyles.rowjustify }}>
                    <CustomText color={colors.grey} text={"Name"} size={14} />
                    <CustomText
                      style={styles.profileTextContainer}
                      color={colors.black}
                      text={`${profile?.first_name} ${profile?.last_name}`}
                      size={14}
                    />
                  </View>
                  <View style={{ ...appStyles.rowjustify }}>
                    <CustomText color={colors.grey} text={"Email"} size={14} />
                    <CustomText
                      color={colors.black}
                      style={styles.profileTextContainer}
                      text={`${profile?.email}`}
                      size={14}
                    />
                  </View>

                  <View style={{ ...appStyles.rowjustify }}>
                    <CustomText
                      color={colors.grey}
                      text={"Phone number"}
                      size={14}
                    />
                    <CustomText
                      color={colors.black}
                      text={profile?.phone ? profile?.phone : "-"}
                      size={14}
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...appStyles.rowjustify,
                    marginTop: verticalScale(8),
                  }}
                >
                  <CustomButton
                    width={"48%"}
                    onPress={() => navigation.navigate("ChangePasswordScreen")}
                    text="Change Password"
                    bgColor={colors.white}
                    textColor={colors.primary}
                  />
                  <CustomButton
                    onPress={() =>
                      navigation.navigate("EditProfileScreen", {
                        data: profile,
                      })
                    }
                    width={"48%"}
                    text="Edit Info"
                    bgColor={colors.white}
                    textColor={colors.primary}
                  />
                </View>
              </View>
              <View>
                <CustomText
                  text={"Saved Addresses"}
                  color={colors.black}
                  fontWeight="600"
                  style={{
                    marginLeft: scale(20),
                    marginBottom: verticalScale(5),
                    marginTop: verticalScale(5),
                  }}
                  fontFam={font.WorkSans_SemiBold}
                  size={18}
                />
                {userAddresses?.length > 0 && (
                  <>
                    <FlatList
                      data={userAddresses}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ paddingLeft: scale(20) }}
                      contentContainerStyle={{
                        paddingRight: scale(40),
                        gap: scale(7),
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }: any) => {
                        let data = {
                          Address: item?.Address,
                          City: item?.City,
                          Country: item?.Country,
                          Phone: item?.Phone,
                          PostCode: item?.PostCode,
                        };
                        return (
                          <View>
                            <AddressCard
                              isProfile={true}
                              data={data}
                              onEditAddress={() =>
                                navigation.navigate("AddAddressScreen", {
                                  isEdit: true,
                                  data: item,
                                })
                              }
                              onDeleteAddress={() => {
                                setIsDeleteAdddressModal(true);
                                setSelectedAddress(item);
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                  </>
                )}

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("AddAddressScreen")}
                  style={{
                    ...appStyles.row,
                    gap: scale(10),
                    marginHorizontal: scale(20),
                    marginTop: verticalScale(
                      userAddresses?.length > 0 ? 15 : 20
                    ),
                  }}
                >
                  <CustomText
                    text={"Add New Address"}
                    size={14}
                    color={colors.primary}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                  />
                  <Image
                    source={images.plus}
                    resizeMode="contain"
                    style={{
                      width: scale(15),
                      height: scale(15),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <CustomText
                  text={"Payment Methods"}
                  color={colors.black}
                  fontWeight="600"
                  style={{
                    marginLeft: scale(20),
                    marginBottom: verticalScale(5),
                    marginTop: verticalScale(5),
                  }}
                  fontFam={font.WorkSans_SemiBold}
                  size={18}
                />
                <FlatList
                  data={[1, 2, 3]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ paddingLeft: scale(20) }}
                  contentContainerStyle={{
                    paddingRight: scale(40),
                    gap: scale(15),
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }: any) => {
                    return (
                      <View>
                        <PaymentCard info={true} />
                      </View>
                    );
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    navigation.navigate("PaymentInfoScreen", {
                      disableSkip: true,
                    })
                  }
                  style={{
                    ...appStyles.row,
                    gap: scale(10),
                    marginHorizontal: scale(20),
                    marginTop: verticalScale(15),
                  }}
                >
                  <CustomText
                    text={"Add New Method"}
                    size={14}
                    color={colors.primary}
                    fontWeight="600"
                    fontFam={font.WorkSans_SemiBold}
                  />
                  <Image
                    source={images.plus}
                    resizeMode="contain"
                    style={{
                      width: scale(15),
                      height: scale(15),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </ScreenLayout>
      <DeleteAccountModal
        deletetText={deletetText}
        setDeleteText={setDeleteText}
        modalVisible={isConfirmDeleteModal}
        setModalVisible={setIsConfirmDeleteModal}
        onCancel={() => {
          setIsConfirmDeleteModal(false);
        }}
        onDelete={() => {
          setIsConfirmDeleteModal(false);

          onDeleteAccount();
        }}
      />

      <ActionModal
        modalVisible={isAccountDeleteModal}
        setModalVisible={setIsAccountDeleteModal}
        onCancel={() => {
          setIsAccountDeleteModal(false);
        }}
        onDelete={() => {
          setIsAccountDeleteModal(false);

          setTimeout(() => {
            setIsConfirmDeleteModal(true);
          }, 500);
          // onDeleteAccount();
        }}
      />

      <ActionModal
        modalVisible={isDeleteAdddressModal}
        title={"Delete Address"}
        des={"You Are About To Delete Your Address"}
        setModalVisible={setIsDeleteAdddressModal}
        onCancel={() => {
          setIsDeleteAdddressModal(false);
        }}
        onDelete={() => {
          setIsDeleteAdddressModal(false);

          deleteUserAddress();
          // onDeleteAccount();
        }}
      />

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  profileTextContainer: {
    width: "82%",
    textAlign: "right",
  },
});
