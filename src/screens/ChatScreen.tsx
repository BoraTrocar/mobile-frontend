import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, TextInput, Text, Card } from "react-native-paper";
import { HorizontalMenu } from "../components/menu";
import globalStyles from "../styles/globalStyles";
import styles from "../styles/ChatScreenStyles";

export function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      {/*   <Appbar.Header>
        <Appbar.Content title="Chat" />
      </Appbar.Header> */}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Card key={index} style={styles.messageCard}>
              <Card.Content>
                <Text>{msg}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noMessagesText}>Nenhuma mensagem ainda.</Text>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Digite sua mensagem..."
          value={message}
          onChangeText={setMessage}
          style={styles.textInput}
        />
        <Button
          mode="contained"
          icon={() => <Ionicons name="send" size={24} color="white" />}
          onPress={handleSend}
          style={styles.sendButton}
        >
          {null} {/* Acho que isso aqui é gambiarra */}
        </Button>
      </View>

      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}
