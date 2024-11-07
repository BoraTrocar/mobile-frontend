import { RaioProvider } from "@/RaioContext";
import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigator } from "../src/navigation/AppNavigator";

export default function Index() {
  return (
    <RaioProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </RaioProvider>
  );
}
