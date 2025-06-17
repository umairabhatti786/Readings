import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
  Pressable,
  Keyboard,
  Platform,
  UIManager,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { images } from "../../../assets/images";
import { font } from "../../../utils/font";
import { appStyles } from "../../../utils/AppStyles";
import PaymentCard from "../../../components/PaymentCard";
import * as Animatable from "react-native-animatable";
import LocalPaymentCard from "../Checkout/LocalPaymentCard";
import BankTransferCard from "../Checkout/BankTransferCard";
import CustomButton from "../../../components/CustomButton";
import { PAYMENT_METHOD, StorageServices } from "../../../utils/StorageService";
import CustomToast from "../../../components/CustomToast";
import {
  XPayProvider,
  PaymentElement,
} from "@xstak/xpay-element-react-native-stage";
import { URLS } from "../../../apis/Urls";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  getAuthAddress,
  getAuthData,
  getAuthLatestAddress,
  getToken,
} from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../apis/ApiServices";

const AddPaymentMethod = ({ navigation, route }: any) => {
  const isBillingAddress = route?.params?.isBillingAddress;
  const authLatestAddress: any = useSelector(getAuthLatestAddress);
  // const authLatestAddress=useSelector(getAuthLatestAddress)
  console.log("isBillingAddress", authLatestAddress);

  if (Platform.OS === "ios") {
    const viewManager = UIManager.getViewManagerConfig("RNCWebView");
    console.log("RNCWebView config:", viewManager);
  }

  const [laoding, setlaoding] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("");
  const [selectedMethod, setSelectedMethod] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const authData = useSelector(getAuthData);
  const token = useSelector(getToken);
  const [enabled, setEnabled] = React.useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<any>({});

  console.log("activePaymentMethod", activePaymentMethod);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getActivePaymentMethod();
    });

    return unsubscribe; // Cleanup the listener
  }, []);

  const getActivePaymentMethod = async () => {
    const dispatchPayment = await StorageServices.getItem(PAYMENT_METHOD);
    console.log("dispatchPayment", dispatchPayment);
    setActivePaymentMethod(
      dispatchPayment != null
        ? dispatchPayment
        : { title: "Cash on Delivery", label: "cash", id: 4 }
    );
  };
  const getpaymentMethod = async () => {
    const dispatchPayment = await StorageServices.getItem(PAYMENT_METHOD);
    // setSelectedMethod(selectedAddress);
    if (dispatchPayment == null) {
      setSelectedMethod({ title: "Card", label: "card", id: 1 });
      setSelectedPaymentMethod("online payment");
      setSelectedOnlinePayment("card");
    } else {
      setSelectedPaymentMethod(
        dispatchPayment?.id == 4 ? "cash" : "online payment"
      );
      setSelectedMethod(dispatchPayment);
      setSelectedOnlinePayment(dispatchPayment?.label);
    }

    // setSelectedOnlinePayment(dispatchPayment);
    // setSelectedAddress(dispatchAddress);
  };

  const onAddPaymentMethod = async () => {
    setlaoding(true);
    const raw = JSON.stringify({
      paymentMethod: "card",
      customer: {
        email: authData?.email,
        name: `${authData?.first_name} ${authData?.last_name}`,
      },
    });
    let param = {
      raw: raw,
      token: token,
    };

    ApiServices.CreatePaymentIntent(
      param,
      async ({ isSuccess, response }: any) => {
        console.log("jcbdcbdkc", response);

        if (isSuccess) {
          let intentResult = JSON.parse(response);
          let customer = {
            name: `${authData?.first_name} ${authData?.last_name}`,
          };

          if (intentResult?.clientSecret) {
            try {
              const { message, error } = await PaymentElement.confirmPayment(
                intentResult?.clientSecret,
                customer,
               
              );
              setlaoding(false)

              console.log("PaymentElement Response", message);
            } catch (err) {
              console.error("❌ Payment failed or no message received:", err);
            }

            console.log("MessageResponse", message);
            setlaoding(false);
          } else {
            setlaoding(false);
            // setMessage(result?.error);
            setIsMessage(true);
            // Alert.alert("", result?.errors);
          }
        } else {
          setlaoding(false);
          setMessage("Something went wrong");
          setIsMessage(true);

          console.log("Response", response);
        }
      }
    );

    // try {
    //   const clientSecret = await axios.get(
    //     `${URLS.BASE_URL2}/api/payments/create-payment-intent`,
    //   );
    //   console.log("data",clientSecret?.data.clientSecret)
    //   const {message} = await PaymentElement.confirmPayment(
    //     clientSecret.data.clientSecret,
    //     data,
    //   );
    //   console.log("message",message)
    //   Alert.alert('Payment Sucsess', message);
    // //   setLoading(false);
    // //  setIsPlceOrder(false);

    // } catch (error: any) {
    //   console.log("errorMessge",error);
    //   Alert.alert('Payment Failed', error?.message);
    // //   setLoading(false);
    // //  setIsPlceOrder(false);
    // //   setLoading(false);
    // }
  };
  const PaymentMetodContainer = ({ icon, title, isNext, isCard }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (isNext) {
            navigation.navigate("AddPaymentMethod");
          }
        }}
        style={{ ...appStyles.rowjustify, gap: scale(7) }}
      >
        <View style={{ ...appStyles.row, gap: scale(10) }}>
          <Image
            source={icon || images.cash}
            resizeMode="contain"
            style={{
              width: scale(18),
              height: scale(18),
            }}
          />
          <View>
            <CustomText
              text={title}
              size={15}
              color={colors.dark_black}
              fontWeight="600"
              fontFam={font.WorkSans_Medium}
            />
            {isCard && (
              <Image
                source={images.visa}
                resizeMode="contain"
                style={{
                  width: scale(30),
                  height: scale(30),
                }}
              />
            )}
          </View>
        </View>
        {isNext ? (
          <Image
            source={images.right_arrow}
            resizeMode="contain"
            style={{
              width: scale(18),
              height: scale(18),
            }}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={() => {
            //   setSelectedMethod(item);
            //   setSelectedPaymentMethod(item.label);
            // }}
            style={{
              ...styles.radioButtonConainer,
              borderWidth: 1.2,
              borderColor: colors.orange,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              // onPress={() => setSelectedPaymentMethod(item.label)}
              style={styles.radioButtonInner}
            ></TouchableOpacity>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <>
      <ScreenLayout>
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(10),
            gap: verticalScale(20),
            flex: 1,
          }}
        >
          <TopHeader title="Add a Credit or debit card" />
          <View style={{ flex: 1 }}>
            <XPayProvider
              xpay={{
                publishableKey:
                  "xpay_pk_test_95c6197c399f6cb65919e5a992267e12a56f4e428d0c62e514048b54e9852ae7",
                hmacSecret:
                  "87772484ac5b2e2daf751d5be8dbfe8f58b39c622f97ce2ed9929343999d18b4",
                accountId: "81b7c9fa30726c4e",
              }}
            >
              <PaymentElement
                showModal={false} // or
                useCustomModal={false}
                onReady={(data: {
                  complete: boolean | ((prevState: boolean) => boolean);
                }) => {
                  setEnabled(data.complete);
                  console.log("Comepletev", data.complete);
                }}
              />
            </XPayProvider>
          </View>
          <View style={styles.continueBtnContainer}>
            <CustomButton
              onPress={onAddPaymentMethod}
              text="Done"
              disable={!enabled}
              isLoading={laoding}
              bgColor={!enabled ? colors.grey100 : colors.primary}
              style={{ marginTop: verticalScale(20) }}
            />
          </View>

          {/* {paymentMethods.map((item, index) => {
            return (
              <PaymentMetodContainer
                key={index.toString()}
                icon={item?.icon}
                isCard={item?.isCard}
                isNext={item?.isNext}
                title={item?.title}
              />
            );
          })} */}
        </Pressable>

        {/* <View
            style={{
              marginTop: verticalScale(5),
              gap: verticalScale(15),
              paddingHorizontal: scale(20),
            }}
          >
            <CustomText
              text={"Payment Method"}
              size={18}
              color={colors.black}
              fontWeight="600"
              fontFam={font.WorkSans_SemiBold}
            />
            {paymentMethods.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    setSelectedMethod(item);
                    setSelectedPaymentMethod(item.label);
                  }}
                  key={index.toString()}
                  style={{ ...appStyles.row, gap: scale(7) }}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setSelectedMethod(item);
                      setSelectedPaymentMethod(item.label);
                    }}
                    style={{
                      ...styles.radioButtonConainer,
                      borderWidth: 1.2,
                      borderColor:
                        selectedPaymentMethod == item.label
                          ? colors.orange
                          : colors.dull_half_white,
                    }}
                  >
                    {selectedPaymentMethod == item.label && (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setSelectedPaymentMethod(item.label)}
                        style={styles.radioButtonInner}
                      ></TouchableOpacity>
                    )}
                  </TouchableOpacity>

                  <CustomText
                    text={item.title}
                    size={12}
                    color={colors.dark_black}
                    fontWeight="500"
                    fontFam={font.WorkSans_Regular}
                  />
                </TouchableOpacity>
              );
            })}

            {selectedPaymentMethod == "online payment" && (
              <Animatable.View
                duration={1000}
                animation={"fadeIn"}
                delay={100}
                style={{ gap: verticalScale(10) }}
              >
                <CustomText
                  text={"Please choose an online payment method."}
                  size={14}
                  style={{ marginBottom: verticalScale(5) }}
                  fontFam={font.WorkSans_Regular}
                />
                {onlinePaymentMethods.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        setSelectedMethod(item);

                        setSelectedOnlinePayment(item.label);
                      }}
                      key={index.toString()}
                      style={{ ...appStyles.row, gap: scale(7) }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          setSelectedMethod(item);
                          setSelectedOnlinePayment(item.label);
                        }}
                        style={{
                          ...styles.radioButtonConainer,
                          borderWidth: 1.2,
                          borderColor:
                            selectedOnlinePayment == item.label
                              ? colors.orange
                              : colors.dull_half_white,
                        }}
                      >
                        {selectedOnlinePayment == item.label && (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setSelectedOnlinePayment(item.label)}
                            style={styles.radioButtonInner}
                          ></TouchableOpacity>
                        )}
                      </TouchableOpacity>

                      <CustomText
                        text={item.title}
                        size={12}
                        color={colors.dark_black}
                        fontWeight="500"
                        fontFam={font.WorkSans_Regular}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}
          </View>

          {selectedPaymentMethod == "online payment" && (
            <View>
              {selectedOnlinePayment == "card" && (
                <FlatList
                  data={[1, 2, 3]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ paddingLeft: scale(20) }}
                  contentContainerStyle={{
                    paddingRight: scale(40),
                    gap: scale(15),
                  }}
                  keyExtractor={(item: any, index: any) => index.toString()}
                  renderItem={({ item, index }: any) => {
                    return (
                      <Animatable.View
                        duration={1000}
                        animation={"fadeIn"}
                        delay={100}
                      >
                        <PaymentCard />
                      </Animatable.View>
                    );
                  }}
                />
              )}

              {selectedOnlinePayment == "bank" && (
                <Animatable.View
                  duration={1000}
                  animation={"fadeIn"}
                  delay={100}
                  style={{
                    paddingHorizontal: scale(20),
                    gap: verticalScale(15),
                  }}
                >
                  <CustomText
                    text={
                      "To make an online payment, please choose a convenient bank option from below. Click to copy Account No. / IBAN."
                    }
                    color={colors.grey}
                    style={{ marginRight: scale(10) }}
                    size={12}
                  />
                  <BankTransferCard />
                </Animatable.View>
              )}
              {selectedOnlinePayment == "local" && (
                <Animatable.View
                  duration={1000}
                  animation={"fadeIn"}
                  delay={100}
                  style={{
                    paddingHorizontal: scale(20),
                    gap: verticalScale(15),
                  }}
                >
                  <CustomText
                    text={"Enter your Jazzcash/easypaisa account below."}
                    color={colors.grey}
                    style={{
                      marginRight: scale(10),
                      marginBottom: verticalScale(15),
                    }}
                    size={12}
                  />
                  <LocalPaymentCard />
                </Animatable.View>
              )}
            </View>
          )}

          {selectedOnlinePayment == "card" && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("PaymentInfoScreen", { disableSkip: true })
              }
              style={{
                ...appStyles.row,
                gap: scale(10),
                marginHorizontal: scale(20),
              }}
            >
              <CustomText
                text={"Add New Card"}
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
          )} */}
      </ScreenLayout>
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
    </>
  );
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
  radioButtonConainer: {
    width: scale(16),
    height: scale(16),
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: scale(8),
    height: scale(8),
    borderRadius: 999,
    backgroundColor: colors.orange,
  },
  continueBtnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
  },
});

// if (intentResult?.clientSecret) {
//   const payload = {
//     amount: 1,
//     currency: "PKR",

//     customer: {
//       email: authData?.email,
//       name: `${authData?.first_name} ${authData?.last_name}`,
//       phone: authLatestAddress?.Phone,
//     },
//     shipping: {
//       address1: authLatestAddress?.Address, //required
//       city: authLatestAddress?.City, //required
//       country: authLatestAddress?.Country, //required
//       province: authLatestAddress?.Province, //required
//       zip: authLatestAddress?.PostCode, //required
//     },
//     metadata: {
//       order_reference: "", // order id optional
//     },
//   };
//   console.log("payload",payload)
//   const signature = crypto
//     .createHmac(
//       "SHA256",
//       "87772484ac5b2e2daf751d5be8dbfe8f58b39c622f97ce2ed9929343999d18b4"
//     )
//     .update(JSON.stringify(payload))
//     .digest("hex");
//   console.log("signature", signature);
//   const raw = JSON.stringify({
//     amount: 1,
//     payment_method_types: "card",
//   });
//   let da = {
//     raw: raw,
//     pi_client_secret: intentResult?.clientSecret,
//   };
//   console.log("signature", signature);
//   ApiServices.CaptureAuthorizedAmount(
//     da,
//     async ({ isSuccess, response }: any) => {
//       console.log("Authorized", response);

//       if (isSuccess) {
//         let result = JSON.parse(response);
//         if (result?.success) {
//           setlaoding(false);

//           console.log("CaptureAuthorizedAmount", result);
//         } else {
//           setlaoding(false);
//           setMessage(result?.message);
//           setIsMessage(true);
//           // Alert.alert("", result?.errors);
//         }

//         // if (result?.clientSecret) {
//         //   console.log("Method Added",result)
//         //   // setlaoding(false);
//         //   // setIsSuccessModal(true);
//         //   // navigation.goBack();
//         // } else {
//         //   setlaoding(false);
//         //   setMessage(result?.error);
//         //   setIsMessage(true);
//         //   // Alert.alert("", result?.errors);
//         // }
//       } else {
//         setlaoding(false);
//         setMessage("Something went wrong");
//         setIsMessage(true);

//         console.log("Response", response);
//       }
//     }
//   );
// }
