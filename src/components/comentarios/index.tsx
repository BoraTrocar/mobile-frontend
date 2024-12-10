import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, Text, TextInput } from "react-native-paper";
import ComentarioService from "../../services/comentario.service";

interface Comentario {
  id: string;
  comentario: string;
  usuario: string;
}

interface ComentariosLivroProps {
  idLivro: string;
}

const ComentariosLivro: React.FC<ComentariosLivroProps> = ({ idLivro }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");

  useEffect(() => {
    carregarComentarios();
  }, []);

  const carregarComentarios = async () => {
    try {
      const response = await ComentarioService.obterComentarios(idLivro);
      setComentarios(response);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    }
  };

  const adicionarComentario = async () => {
    if (novoComentario.trim() === "") return;

    try {
      await ComentarioService.adicionarComentario(idLivro, novoComentario);
      setNovoComentario("");
      carregarComentarios();
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentários</Text>
      {comentarios.map((item) => (
        <View key={item.id} style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <Avatar.Text size={32} label={item.usuario[0]} />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.usuario}</Text>
            </View>
          </View>
          <Text style={styles.commentText}>{item.comentario}</Text>
          <Divider style={styles.commentDivider} />
        </View>
      ))}
      {comentarios.length === 0 && (
        <Text style={styles.noComments}>Nenhum comentário ainda.</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          value={novoComentario}
          onChangeText={setNovoComentario}
          placeholder="Adicione um comentário..."
          multiline
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={adicionarComentario}
          style={styles.button}
        >
          Comentar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  commentContainer: {
    marginBottom: 15,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
    color: "black",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  commentText: {
    marginTop: 5,
    color: "black",
  },
  commentDivider: {
    marginTop: 10,
  },
  noComments: {
    fontStyle: "italic",
    color: "gray",
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#808090",
  },
  button: {
    alignSelf: "flex-end",
  },
});

export default ComentariosLivro;
