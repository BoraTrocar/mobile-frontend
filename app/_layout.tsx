import { Slot } from "expo-router";
import { RaioProvider } from "@/RaioContext";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <RaioProvider>
      <PaperProvider>
        {/* REMOVE THIS: <NavigationContainer> */}
          <Slot />
        {/* REMOVE THIS: </NavigationContainer> */}
      </PaperProvider>
    </RaioProvider>
  );
}