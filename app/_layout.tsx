import { Slot } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { RaioProvider } from "@/RaioContext";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <RaioProvider>
      <PaperProvider>
        <NavigationContainer>
          <Slot />
        </NavigationContainer>
      </PaperProvider>
    </RaioProvider>
  );
}