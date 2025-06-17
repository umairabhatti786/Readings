import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { checkoutBooksData } from "../../../utils/Data";
import TopHeader from "../../../components/TopHeader";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import CheckBookCard from "../Checkout/CheckBookCard";
import { colors } from "../../../utils/colors";
import { appStyles } from "../../../utils/AppStyles";
import CustomButton from "../../../components/CustomButton";
import OrderTrackingCard from "./OrderTrackingCard";
import OrderDetailCard from "./OrderDetailCard";
import CustomToast from "../../../components/CustomToast";
import { ApiServices } from "../../../apis/ApiServices";
import { useSelector } from "react-redux";
import { getGuestToken, getToken } from "../../../redux/reducers/authReducer";
import ScreenLoader from "../../../components/Screenloader";

const OrderDetailScreen = ({ route, navigation }: any) => {
  const item = route?.params?.item;

  const [orderContent, setOrderContent] = useState([]);
  const [inStockBooks, setInStockBooks] = useState(item?.inStockBooks);
  const [outOfStockBooks, setOutOfStockBooks] = useState(item?.outOfStockBooks);
  const [preOrderBooks, setPreOrderBooks] = useState(item?.preOrderBooks);
  const [onDemandBooks, setOnDemandBooks] = useState(item?.onDemandBooks);

  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);
  const [loading, setLoading] = useState(false);
  const guestToken = useSelector(getGuestToken);
  useEffect(() => {
    getFormatData();
  }, []);

  const bookCategories = [
    { books: inStockBooks, label: "In Stock - Ready for Dispatch" },
    { books: outOfStockBooks, label: "Out of Stock" },
    { books: preOrderBooks, label: "Pre Orders" },
    { books: onDemandBooks, label: "On Demand" },
  ];

  const availableCategories = bookCategories.filter(
    (category) => category.books.length > 0
  );

  console.log("item", item);
  const OrderContentContainer = ({ title, books }: any) => {
    return (
      <View style={{ gap: verticalScale(8), flex: 1 }}>
        <View style={{ marginBottom: verticalScale(15) }}>
          <CustomText
            text={title}
            color={colors.black}
            textTransform={"capitalize"}
            fontWeight="600"
            style={{
              marginBottom: verticalScale(7),
              marginTop: verticalScale(5),
            }}
            fontFam={font.WorkSans_SemiBold}
            size={14}
          />
          <View>
            <FlatList
              data={books}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                gap: verticalScale(5),
              }}
              renderItem={({ item, index }: any) => {
                return <OrderDetailCard key={index.toString()} data={item} />;
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const onCancelOrder = () => {
    setLoading(true);
    let params = {
      page: 1,
      token: token != null ? token : guestToken,
      id: item?.n_order_id,
    };
    // setHasMoreData(true);
    ApiServices.CancelOrder(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        // setProcessingOrders(result?.data?.processingOrders);
        // setOrdersHistory(result?.data?.lastSixMonthsOrders)
        setLoading(false);
        console.log("OrderResult", result);
        navigation.goBack();

        // if (
        //   result?.data?.availableBooks ||
        //   result?.data?.outOfStockBooks ||
        //   result?.data?.outOfStockBooks ||
        //   result?.data?.preOrderBooks
        // ) {
        //   setData([
        //     ...(result?.data?.availableBooks || []), // Spread availableBooks if exists, otherwise empty array
        //     ...(result?.data?.outOfStockBooks || []), // Spread outOfStockBooks if exists, otherwise empty array
        //     ...(result?.data?.preOrderBooks || []), // Spread preOrderBooks if exists, otherwise empty array
        //   ]);
        //   setLoading(false);
        // } else {
        //   setLoading(false);
        //   if (token) {
        //     setMessage(result?.error);
        //     setIsMessage(true);
        //   }
        // }
      } else {
        setLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const getFormatData = () => {};
  return (
    <>
      <ScreenLayout
        style={{
          paddingHorizontal: scale(20),
        }}
      >
        <View
          style={{
            paddingBottom: verticalScale(10),
          }}
        >
          <TopHeader title="Order Details" />
        </View>
        <ScrollView
          style={{ ...appStyles.main, paddingTop: verticalScale(10) }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: verticalScale(20),
            gap: verticalScale(20),
          }}
        >
          <OrderTrackingCard />

          <View
            style={{
              gap: verticalScale(8),
            }}
          >
            {availableCategories.map((category, index) => (
              <OrderContentContainer
                key={index}
                title={`Part ${index + 1} of ${availableCategories.length} (${
                  category.label
                })`}
                books={category.books}
              />
            ))}

            {/* {inStockBooks.length > 0 && (
              <OrderContentContainer
              title={`Part 1 of ${outOfStockBooks.length > 0?"2":"1"} (In Stock - ready for dispatch)`}
              books={inStockBooks}
              />
            )}

          
            {outOfStockBooks.length > 0 && (
              <OrderContentContainer
                title="Part 2 of 2 (Out of Stock)"
                books={outOfStockBooks}
              />
            )}
            {preOrderBooks.length > 0 && (
              <OrderContentContainer
                title="Part 3 of 3 (Pre Orders)"
                books={preOrderBooks}
              />
            )}
             {onDemandBooks.length > 0 && (
              <OrderContentContainer
                title="Part 3 of 3 (Pre Orders)"
                books={onDemandBooks}
              />
            )} */}

            <View style={styles.subtotalContainer}>
              <View style={{ ...appStyles.rowjustify }}>
                <CustomText text={"Subtotal"} color={colors.black} size={14} />
                <CustomText
                  text={`Rs. ${
                    Number(item?.total_amount) - Number(item?.deliveryFee)
                  }`}
                  color={colors.black}
                  size={14}
                />
              </View>
              <View style={{ ...appStyles.rowjustify }}>
                <CustomText text={"Discounts"} color={colors.black} size={14} />
                <CustomText text={"Rs.00"} color={colors.black} size={14} />
              </View>
              <View style={{ ...appStyles.rowjustify }}>
                <CustomText
                  text={"Shipping (Standard)"}
                  color={colors.black}
                  size={14}
                />
                <CustomText
                  text={`Rs.${Number(item?.deliveryFee)}`}
                  color={colors.black}
                  size={14}
                />
              </View>

              <View style={{ ...appStyles.rowjustify }}>
                <CustomText
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  text={"Total"}
                  color={colors.black}
                  size={20}
                />
                <CustomText
                  fontWeight="600"
                  fontFam={font.WorkSans_SemiBold}
                  text={`Rs.${item?.total_amount}`}
                  color={colors.black}
                  size={20}
                />
              </View>
            </View>
          </View>
          {item?.status == 5 && (
            <CustomButton
              text="Apply"
              // style={{ marginBottom: verticalScale(30) }}
            />
          )}

          {item?.status != 5 && (
            <View style={appStyles.rowjustify}>
              <CustomButton
                text="Track"
                width={"48%"}
                // style={{ marginBottom: verticalScale(30) }}
              />
              <CustomButton
                bgColor={colors.red}
                onPress={() => {
                  Alert.alert(
                    "Confirmation",
                    "Are You Sure You Want To Cancel This Order?",
                    [
                      {
                        text: "No",
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        onPress: async () => {
                          onCancelOrder();
                        },
                      },
                    ]
                  );
                }}
                text="Cancel Order"
                width={"48%"}
                // style={{ marginBottom: verticalScale(30) }}
              />
            </View>
            // <TouchableOpacity
            // activeOpacity={0.3}
            // onPress={()=>{
            //   Alert.alert(
            //     "Confirmation",
            //     "Are You Sure You Want To Cancel This Order?",
            //     [
            //       {
            //         text: "No",
            //         style: "cancel",
            //       },
            //       {
            //         text: "Yes",
            //         onPress: async () => {
            //           onCancelOrder();
            //         },
            //       },
            //     ]
            //   )

            // }}
            // style={{width:"40%",height:verticalScale(40),alignSelf:"center",}}
            // >
            //    <CustomText
            //         fontWeight="600"
            //         fontFam={font.WorkSans_Medium}
            //         text={"Cancel Order"}
            //         style={{textAlign:"center"}}
            //         textDecorationLine="underline"
            //         color={colors.red}
            //         size={18}
            //       />

            // </TouchableOpacity>
          )}
        </ScrollView>
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        color={colors.white}
      />
      {loading && <ScreenLoader />}
    </>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  subtotalContainer: {
    backgroundColor: colors.white,
    padding: scale(15),
    borderRadius: scale(10),
    gap: verticalScale(12),
  },
});
