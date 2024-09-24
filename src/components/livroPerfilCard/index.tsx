import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { LivroProps } from "../../models/LivroProps";
import LivroService from "../../services/livro.service";
import styles from "../../styles/PerfilScreenStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type LivroCardProps = {
  livro: LivroProps;
};

export const LivroPerfilCard: React.FC<LivroCardProps> = ({ livro }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleCardPress = () => {
    Alert.alert("Ação", "Escolha uma opção", [
      {
        text: "Editar Livro",
        onPress: () => {
          navigation.navigate("AlteraLivro", { livro });
        },
      },
      {
        text: "Excluir Livro",
        onPress: async () => {
          // Confirmar a exclusão com o usuário
          Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza de que deseja excluir este livro?",
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              {
                text: "Excluir",
                onPress: async () => {
                  try {
                    await LivroService.deletarLivro(livro.idLivro);
                    Alert.alert("Sucesso", "Livro excluído com sucesso");
                    // mano tem que fazer algo para atualizar sózinho o componente dps q excluir o livro
                  } catch (error) {
                    Alert.alert("Erro", "Ocorreu um erro ao excluir o livro");
                    console.error("Erro ao excluir livro:", error);
                  }
                },
              },
            ]
          );
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <Card style={styles.livroCard}>
        <Card.Content>
          <Text style={styles.livroTitulo}>{livro.nomeLivro}</Text>
          <Text style={styles.livroTitulo}>ISBN: {livro.isbn}</Text>
          <Text style={styles.livroTitulo}>Descrição: {livro.descricao}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
