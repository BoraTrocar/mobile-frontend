import React from "react";
import { View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

interface PerfilMenuProps {
  visible: boolean;
  onDismiss: () => void;
  onLogout: () => Promise<void>;
  onNotificationPress: () => void;
  onConfigLocationPress: () => void;
}

export const PerfilMenu: React.FC<PerfilMenuProps> = ({
  visible,
  onDismiss,
  onLogout,
  onNotificationPress,
  onConfigLocationPress,
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        anchor={<IconButton icon="cog" size={24} onPress={onDismiss} />}
      >
        <Menu.Item
          onPress={() => {
            onDismiss();
            onLogout();
          }}
          title="Deslogar"
          leadingIcon="logout"
        />
        <Menu.Item
          onPress={() => {
            onDismiss();
            onNotificationPress();
          }}
          title="Notificações"
          leadingIcon="bell"
        />
        <Menu.Item
          onPress={() => {
            onDismiss();
            onConfigLocationPress();
          }}
          title="Localização"
          leadingIcon="map-marker"
        />
      </Menu>
    </View>
  );
};
