import React, { useEffect, useState } from "react";
import { View, FlatList, Keyboard, ActivityIndicator } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../../utils/colors";
import CustomSearch from "../../../components/CustomSearch";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import TopHeader from "../../../components/TopHeader";
import LikedCard from "../Liked/LikedCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthSearch,
  getAuthSelectCategory,
  getAuthSelectSubCategory,
  getIsHighDiscount,
  getToken,
  setAuthSearch,
  setSubCategories,
} from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../apis/ApiServices";
import { LikedBookLayout } from "../../../utils/Loyout/LikedBookLayout";
import { windowHeight } from "../../../utils/Dimensions";
import LottieView from "lottie-react-native";
import { getBooksAdvanceSearch } from "../../../redux/reducers/advanceSearchReducer";
import { useIsFocused } from "@react-navigation/native";
import DropDown from "../../../components/DropDown";
import { BookSortData, CountryData } from "../../../utils/Data";
import { useRoute, useNavigation } from "@react-navigation/native";
import CustomToast from "../../../components/CustomToast";
import BooksCard from "../../../components/BooksCard";
import { URLS } from "../../../apis/Urls";
import StationeryBookCard from "../../../components/StationeryBookCard";

const StationeryBooks = ({}: any) => {
  const navigation: any = useNavigation();
  const category = useSelector(getAuthSelectCategory);
  const subCategory = useSelector(getAuthSelectSubCategory);
  const [categoryBooks, setCategoryBooks] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("In Stock");
  const [selectedSort, setSelectedSort] = useState("instock");
  const route:any = useRoute();
  const highDiscountParam = route.params?.highDiscountParam
  const isStationery=route?.params?.isStationery

  const search = useSelector(getAuthSearch);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // Flag to indicate if more data is available
  const booksAdvanceSearchData = useSelector(getBooksAdvanceSearch);
  const isHighDiscount = useSelector(getIsHighDiscount);
  const token = useSelector(getToken);

  const dispatch = useDispatch();
  const focused = useIsFocused();
  useEffect(() => {
    if (isHighDiscount != true) {
      getCategortBooks("instock");
    }
  }, []);
  useEffect(() => {
    setSelectedSort("instock");
    setSortBy("In Stock");
    if (subCategory?.id) {
      getSubCategoryBooks("instock");

      return;
    }
    if (isHighDiscount == true) {
      console.log("Highdiscount");

      getHighDiscountBooks("instock");
      return;
    } else {
      console.log("BookCstge");
    }
  }, [isHighDiscount, subCategory]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getCategortBooks = (sort?: any) => {
    let params = {
      id: category?.id,
      page: 1,
      subCategory: subCategory,
      sort: sort ? sort : selectedSort,
      token: token,
      isStationery:isStationery

    };

    setLoading(true);
    setHasMoreData(true);
    ApiServices.BookByCategory(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.books) {
          setCategoryBooks(result?.books);
          dispatch(setSubCategories(result?.sidebarCategories));
          setLoading(false);
          setPage(2);
        } else {
          setLoading(false);
          setMessage(result?.error);
          setIsMessage(true);
        }
      } else {
        setLoading(false);
        setMessage("Something went wrong");
        setIsMessage(true);
      }
    });
  };

  const getHighDiscountBooks = (sort: any) => {
    let params = {
      id: category?.id,
      page: 1,
      sort: sort ? sort : selectedSort,
      token: token,
    };

    setLoading(true);
    setHasMoreData(true);
    ApiServices.HighDiscountBooks(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.books) {
            console.log("resultHIsh", result);
            setCategoryBooks(result?.books);
            dispatch(setSubCategories(result?.sidebarCategories));
            setLoading(false);
            setPage(2);
          } else {
            setLoading(false);
            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setLoading(false);
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };

  const getSubCategoryBooks = (sort: any) => {
    let params = {
      id: subCategory?.id,
      page: 1,
      sort: sort ? sort : selectedSort,
      token: token,
      highDiscountParam:highDiscountParam,
      isStationery:isStationery

    };

    setLoading(true);
    setHasMoreData(true);

    ApiServices.BookBySubCategory(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.books) {
            console.log("Subcaregpries",result)
            setCategoryBooks(result?.books);
            setLoading(false);
            setPage(2);
          } else {
            setLoading(false);
            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setLoading(false);
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };

  const getSearchData = () => {
    let params = {
      search: search,
      page: 1,
      token: token,
    };

    setLoading(true);
    setHasMoreData(true);

    ApiServices.BookCategorySearch(
      params,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          let result = JSON.parse(response);
          if (result?.books) {
            setCategoryBooks(result?.books);
            setLoading(false);
            setPage(2);
          } else {
            setLoading(false);
            setMessage(result?.error);
            setIsMessage(true);
          }
        } else {
          setLoading(false);
          setMessage("Something went wrong");
          setIsMessage(true);
        }
      }
    );
  };

  
  const renderOrdersItem = ({ item, index }: any) => {
    return (
      <LikedCard
      setIsMessage={setIsMessage}
      setMessage={setMessage}
        onPress={() =>
          navigation.navigate("BookDetailScreen", { Book_id: item?.Book_Id })
        }
        data={item}
      />
    );
  };

  const onEndReached = () => {
    setIsRefreshing(true);
    if (search.length > 0) {
      let params = {
        search: search,
        page: page,
        token: token,
      };
      ApiServices.BookCategorySearch(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.books) {
              if (result?.books.length == 0) {
                setHasMoreData(false);
              }
              setCategoryBooks((prevData) => {
                return [...prevData, ...result?.books];
              });

              setPage(page + 1);

              setIsRefreshing(false);
            } else {
              setIsRefreshing(false);

              setMessage(result?.error);
              setIsMessage(true);
            }
          } else {
            setIsRefreshing(false);
            setMessage("Something went wrong");
            setIsMessage(true);
          }
        }
      );

      return;
    }
    if (subCategory?.id) {
      let params = {
        id: subCategory?.id,
        page: page,
        sort: selectedSort,
        token: token,
        highDiscountParam:highDiscountParam,
        isStationery:isStationery


      };
      ApiServices.BookBySubCategory(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.books) {
              if (result?.books.length == 0) {
                setHasMoreData(false);
              }
              setCategoryBooks((prevData) => {
                return [...prevData, ...result?.books];
              });
              setPage(page + 1);
              setIsRefreshing(false);
            } else {
              setIsRefreshing(false);

              setMessage(result?.error);
              setIsMessage(true);
            }
          } else {
            setIsRefreshing(false);

            setMessage("Something went wrong");
            setIsMessage(true);
          }
        }
      );

      return;
    }

    if (isHighDiscount == true) {
      let params = {
        id: category?.id,
        page: page,
        sort: selectedSort,
        token: token,
      };
      ApiServices.HighDiscountBooks(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.books) {
              setPage(page + 1);
              if (result?.books.length == 0) {
                setHasMoreData(false);
              }
              setCategoryBooks((prevData:any) => {
                return [...prevData, ...result?.books];
              });


              setIsRefreshing(false);
            } else {
              setIsRefreshing(false);

              setMessage(result?.error);
              setIsMessage(true);
            }
          } else {
            setIsRefreshing(false);

            setMessage("Something went wrong");
            setIsMessage(true);
          }
        }
      );

      return;
    }

    if (category?.id) {
      let params = {
        id: category?.id,
        page: page,
        sort: selectedSort,
        token: token,
        isStationery:isStationery
      };
      console.log("isStationeryparams",params)
      ApiServices.BookByCategory(
        params,
        async ({ isSuccess, response }: any) => {
          if (isSuccess) {
            let result = JSON.parse(response);
            if (result?.books) {
              setPage(page + 1);

              if (result?.books.length == 0) {
                setHasMoreData(false);
              }
              setCategoryBooks((prevData:any) => {
                return [...prevData, ...result?.books];
              });

              setIsRefreshing(false);
            } else {
              setIsRefreshing(false);

              setMessage(result?.error);
              setIsMessage(true);
            }
          } else {
            setIsRefreshing(false);

            setMessage("Something went wrong");
            setIsMessage(true);
          }
        }
      );

      return;
    }
  };

  const renderFooter = () => {
    if (!isRefreshing) return null;
    return (
      <View style={{ marginVertical: verticalScale(10), alignItems: "center" }}>
        <LottieView
          style={{ width: scale(50), height: scale(50) }}
          source={require("../../../assets/json/loading_primary.json")}
          renderMode="HARDWARE"
          speed={1.2}
          autoPlay
        />
      </View>
    );
  };

  return (
    <>
     <ScreenLayout
      style={{
        paddingHorizontal: scale(20),
      }}
    >
      <View style={{ paddingBottom: verticalScale(10) }}>
        <TopHeader
          title={category?.title}
        //   onRightPress={() => navigation.navigate("AllSubCategoriesScreen")}
        //   rightTitle={highDiscountParam?false: "All Sub-categories"}
        />
      </View>

      <View style={{ gap: verticalScale(8), flex: 1 }}>
        <View style={{ gap: verticalScale(15) }}>
          {/* {
            !highDiscountParam&&(
              <View style={appStyles.rowjustify}>
              <CustomSearch
                onFilter={() => navigation.navigate("FilterScreen")}
                value={search}
                filter={false}
                onChangeText={(value: any) => {
                  dispatch(setAuthSearch(value));
  
                  if (value.length == 0) {
                    Keyboard.dismiss();
                    getCategortBooks();
                  }
                }}
                onSubmitEditing={() => {
                  if (search.length > 0) {
                    Keyboard.dismiss();
  
                    getSearchData();
                  }
                }}
                onSearch={() => {
                  if (search.length > 0) {
                    Keyboard.dismiss();
  
                    getSearchData();
                  }
                }}
                // width={"80%"}
                placeholder="Search"
              />
            </View>
            )
          } */}
         
          {!loading && (
            <View style={{ ...appStyles.rowjustify, width: "100%" }}>
              <CustomText
                textTransform={"capitalize"}
                text={`Showing ${ isHighDiscount?category?.count: categoryBooks?.length} items in ${
                  subCategory?.sub ? subCategory?.sub : category?.title
                }`}
                style={{ width: "60%" }}
                fontWeight="600"
                numberOfLines={1}
                color={colors.grey100}
              />
              <DropDown
                placeholder={"Sort By"}
                dropWidth={scale(140)}
                // dropMaxWidth={scale(120)}
                dropLeftMargin={scale(-50)}
                placeholderColor={colors.black}
                mainStyles={{
                  minWidth: scale(80),
                  maxWidth: scale(120),
                  backgroundColor: "transparent",
                  height: verticalScale(10),
                  paddingHorizontal: scale(0),
                  borderRadius: 0,
                }}
                label="Download"
                setValue={setSortBy}
                value={sortBy}
                onSelect={(it: any) => {
                  setSelectedSort(it?.value);
                  setSortBy(it?.label);

                  setTimeout(() => {
                    if (subCategory?.id) {
                      getSubCategoryBooks(it?.value);

                      return;
                    }
                    if (isHighDiscount == true) {
                      console.log("Highdiscount");

                      getHighDiscountBooks(it?.value);
                      return;
                    } else {
                      console.log("BookCstge");
                      getCategortBooks(it?.value);
                    }
                  }, 400);
                }}
                data={BookSortData.map((item, _index) => {
                  return {
                    id: item?.id,
                    label: item?.label,
                    value: item?.value,
                  };
                })}
              />

              {/* <CustomText text={"Sort By"} color={colors.primary} /> */}
            </View>
          )}
        </View>
        {loading ? (
          <View style={{ marginTop: verticalScale(10) }}>
            <LikedBookLayout />
          </View>
        ) : (

            <FlatList
            data={categoryBooks}
            numColumns={2}
            // style={{ paddingLeft: scale(20) }}
            contentContainerStyle={{
            //   paddingRight: scale(40),
            paddingBottom:verticalScale(40),
              gap: scale(10),
            }}
            columnWrapperStyle={{
                justifyContent: 'space-between', // creates gap between columns
                // backgroundColor:"red"
                // marginBottom: 10, // optional: vertical gap between rows

            }}

            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              let book_data = {
                title: item?.BOOK_TITLE,
                auther: item?.authorName,
                listPrice:
                  item?.currency == "Rs"
                    ? `${item?.currency} ${item?.PRICE}`
                    : `${item?.currency} ${item?.PRICE} = ${item?.PAK_PRICE}`,
                appPrice:
                  Number(item?.Discount) > 0
                    ? Math.floor(
                        Number(item?.PAK_PRICE) -
                          Number(item?.PAK_PRICE) *
                            (Number(item?.Discount) / 100)
                      )
                    : item?.PAK_PRICE,
                book: `${URLS.IMAGE_URL}/images/${item?.picname}.webp`,
                discount: Number(item?.Discount),
                quantity: Number(item?.QUANTITY),
                inStock: item?.availabilityStatus,
                isInWishlist: item?.isInWishlist,
                book_Id: item?.Book_Id,
              };
              console.log('item?.Book_Id,',item?.Book_Id,)
              return (
                <View>
                  <StationeryBookCard
                    setIsMessage={setIsMessage}
                    setMessage={setMessage}
                    onPress={() =>
                      navigation.navigate("BookDetailScreen", { Book_id: item?.Book_Id,isStationery:isStationery })
                    }
                    // onPress={() =>
                    //   navigation.navigate("BookDetailScreen", {
                    //     Book_id: item?.Book_Id,
                    //   })
                    // }
                    data={book_data}
                  />
                </View>
              );
            }}
          />
        //   <FlatList
        //     data={categoryBooks}
        //     ListFooterComponent={renderFooter}
        //     onEndReachedThreshold={0.5} // Adjust threshold for better UX

        //     initialNumToRender={15} // Render 10 items initially
        //     maxToRenderPerBatch={17} // Render in batches of 10
        //     windowSize={5} // Load 5 windows of data (visible and off-screen)
        //     removeClippedSubviews={true} // Improve performance by removing items outside view
        //     style={{ paddingTop: verticalScale(5) }}
        //     contentContainerStyle={{
        //       gap: verticalScale(15),
        //       paddingBottom: verticalScale(isKeyboardVisible ? 280 : 30),
        //     }}
        //     renderItem={renderOrdersItem}
        //     onEndReached={() => {
        //       if (!isRefreshing && categoryBooks?.length > 0 && hasMoreData) {
        //         // Only load more data if not refreshing
        //         onEndReached();
        //       }
        //     }}
        //     showsVerticalScrollIndicator={false}
        //     ListEmptyComponent={
        //       <View
        //         style={{
        //           height: windowHeight / 1.5,
        //           alignItems: "center",
        //           justifyContent: "center",
        //         }}
        //       >
        //         <CustomText
        //           text={"No result found."}
        //           size={14}
        //           fontWeight="500"
        //           color={colors.primary}
        //         />
        //       </View>
        //     }
        //     keyExtractor={(item, index) => index.toString()}
        //   />
        )}
      </View>
    </ScreenLayout>

<CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
      />
    </>
   
  );
};

export default StationeryBooks;
