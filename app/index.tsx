import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigator } from "../navigation/AppNavigator";

export default function Index() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
