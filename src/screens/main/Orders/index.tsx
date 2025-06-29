import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Platform,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { scale, verticalScale } from "react-native-size-matters";
import CustomHeader from "../../../components/CustomHeader";
import { colors } from "../../../utils/colors";
import OrderCard from "./OrderCard";
import { ordersHistoryData } from "../../../utils/Data";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { images } from "../../../assets/images";
import { ApiServices } from "../../../apis/ApiServices";
import { useSelector } from "react-redux";
import { getGuestToken, getToken } from "../../../redux/reducers/authReducer";
import CustomToast from "../../../components/CustomToast";
import { appStyles } from "../../../utils/AppStyles";
import { font } from "../../../utils/font";
import { LikedLayout } from "../../../utils/Loyout/LikedLayout";
import { useIsFocused } from "@react-navigation/native";
import { OrdersLayout } from "../../../utils/Loyout/OrdersLayout";

const OrdersScreen = ({ navigation }: any) => {
  const [data, setData] = useState([]);
  const token = useSelector(getToken);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const guestToken = useSelector(getGuestToken);

  const [processingOrders, setProcessingOrders] = useState([]);
  const focused = useIsFocused();
  const [ordersHistory, setOrdersHistory] = useState();
  const scrollRef = useRef();
  const [activeTab, setActiveTab] = useState<any>("Active");

  useEffect(() => {
    if (focused) {
      getCartBooks();
    }
  }, [focused]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const isFocused = navigation.isFocused();
      if (isFocused) {
        scrollRef.current?.scrollToOffset({ offset: 0, animated: true });

        // Scroll to the top if the tab is pressed again
      }
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("state", () => {
  //     getCartBooks(); // Run this function on the first visit
  //     console.log("subtotal");
  //   });

  //   return unsubscribe; // Clean up the listener when the screen is unmounted
  // }, []);

  const getCartBooks = () => {
    let params = {
      page: 1,
      token: token != null ? token : guestToken,
    };
    ApiServices.GetOrder(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        const processingOrders = result?.data?.orders.filter(
          (order: any) => order.status === 1
        );
        const orderHistory = result?.data?.orders.filter(
          (order: Order) => order.status !== 0 && order.status !== 1
        );

        setProcessingOrders(processingOrders);
        setOrdersHistory(orderHistory);
        setLoading(false);
      } else {
        setLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const Tabs = () => {
    return (
      <View style={{ ...styles.tabContainer }}>
        <TouchableOpacity
          onPress={() => setActiveTab("Active")}
          activeOpacity={0.5}
          style={{
            ...styles.tabBox,
            backgroundColor:
              activeTab == "Active" ? colors.primary : "transparent",
          }}
        >
          <CustomText
            text={"Active"}
            color={activeTab == "Active" ? colors.white : colors.grey}
            size={13}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setActiveTab("History")}
          style={{
            ...styles.tabBox,
            backgroundColor:
              activeTab == "History" ? colors.primary : "transparent",
          }}
        >
          <CustomText
            text={"History"}
            size={13}
            color={activeTab == "History" ? colors.white : colors.grey}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderOrdersItem = ({ item }: any) => {
    console.log("Camncenocj", item);
    return (
      <View>
        <OrderCard
          onPress={() => {
            navigation.navigate("OrderDetailScreen", { item: item });
          }}
          data={item}
        />
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          gap: verticalScale(15),
          flex: 1,
          backgroundColor: colors.dull_white,
        }}
      >
        {loading ? (
          <View
            style={{
              paddingTop: verticalScale(Platform.OS == "ios" ? 40 : 0),
            }}
          >
            <OrdersLayout />
          </View>
        ) : (
          <>
            {/* <Tabs /> */}

            <FlatList
              data={activeTab == "Active" ? processingOrders : ordersHistory}
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              scrollEnabled={processingOrders?.length > 0 ? true : false}
              contentContainerStyle={{
                gap: verticalScale(15),
                paddingBottom: verticalScale(93),
                paddingTop: verticalScale(Platform.OS == "ios" ? 135 : 45),
                paddingHorizontal: scale(20),
              }}
              renderItem={renderOrdersItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <View
                  style={{
                    height: windowWidth,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: windowWidth / 1.1,
                      height: windowHeight / 2.2,
                      marginTop: verticalScale(20),
                    }}
                    resizeMode="contain"
                    source={images.empty_order}
                  />
                  <CustomText
                    text={"You don’t have any active orders at this moment."}
                    size={14}
                    style={{ width: windowWidth / 1.5, textAlign: "center" }}
                    fontWeight="500"
                    color={colors.black}
                  />
                </View>
              }
            />
          </>
        )}
      </View>
      {!loading && (
        <View
          style={{
            backgroundColor: "rgba(243, 245, 247, 0.9)", // Semi-transparent background,
            display: "flex",
            // height: verticalScale(Platform.OS == "ios" ? 70 : 40),
            width: "100%",
            position: "absolute",
            top: 0,
            paddingHorizontal: scale(20),
            paddingTop: verticalScale(Platform.OS == "ios" ? 40 : 0),
            gap: verticalScale(7),
            paddingBottom:verticalScale(4)
          }}
        >
          <CustomHeader />

          <Tabs/>
        </View>
      )}

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  tabBox: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  tabContainer: {
    height: verticalScale(40),
    width: "100%",
    borderRadius: scale(10),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
});
