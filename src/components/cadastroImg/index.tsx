import * as ImagePicker from "expo-image-picker";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CadastroImg {
  img: string | null;
  onImageSelect: (uri: string | null) => void;
}

export function CadastroImg({ img, onImageSelect }: CadastroImg) {
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageSelect(result.assets[0].uri || null);
    }
  };

  const handleOpenCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageSelect(result.assets[0].uri || null);
    }
  };

  const handleImagePress = () => {
    Alert.alert("Escolher Imagem", "Escolha uma opção", [
      {
        text: "Escolher Imagem",
        onPress: handlePickImage,
      },
      {
        text: "Abrir Câmera",
        onPress: handleOpenCamera,
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handleImagePress}>
      <Image
        source={img ? { uri: img } : require("@/assets/images/placeholder.jpg")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
    alignSelf: "center",
  },
});
