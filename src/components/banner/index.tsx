import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { Card } from "react-native-paper";

export function Banner() {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} pageMargin={14}>
        <Pressable key="1" onPress={() => console.log("CLICOU NO BANNER 1")}>
          <Card.Cover
            source={require("../../../assets/images/bienal.jpg")}
            style={styles.image}
          />
        </Pressable>

        <Pressable key="2" onPress={() => console.log("CLICOU NO BANNER 2")}>
          <Card.Cover
            source={require("../../../assets/images/bienal-livro2.png")}
            style={styles.image}
          />
        </Pressable>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    marginVertical: 16,
    overflow: "hidden",
  },
  pagerView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
