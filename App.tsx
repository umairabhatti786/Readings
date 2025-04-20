import React from "react";
import RootNavigator from "./src/routes/RootNavigator";
import { View } from "react-native";

const App = ({ children, edges }: any) => {
  return <RootNavigator />;
};

export default App;
