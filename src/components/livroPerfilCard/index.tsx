import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { LivroProps } from "../../models/LivroProps"; // Importar o tipo correto
import LivroService from "../../services/livro.service"; // Certifique-se de que o caminho está correto
import styles from "../../styles/PerfilScreenStyles"; // Certifique-se de que os estilos estão corretos

type LivroCardProps = {
  livro: LivroProps;
};

export const LivroPerfilCard: React.FC<LivroCardProps> = ({ livro }) => {
  const handleCardPress = () => {
    Alert.alert("Ação", "Escolha uma opção", [
      {
        text: "Editar Livro",
        onPress: () => console.log("Editar Livro"),
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
