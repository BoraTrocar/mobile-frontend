import React from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

import globalStyles from "../styles/globalStyles";
import { Banner } from "../components/banner";
import { BarraDePesquisa } from "../components/barraDePesquisa";
import { Header } from "../components/header";
import { AnunciostListaVertical } from "../components/listaAnuncios";
import { LivrosDestaque } from "../components/livrosDestaque";
import { HorizontalMenu } from "../components/menu";
import { Section } from "../components/section";
import styles from "../styles/HomeScreenStyles";

export default function HomeScreen() {
  const { colors } = useTheme(); /* dps tem que começar a trabalhar com tema */

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Header />
          <BarraDePesquisa />
          <Banner />
        </View>

        <Section
          name="Livros em destaque"
          label="Veja mais"
          action={() => console.log("CLICOU NO VEJA MAIS DO DESTAQUE")}
          size="text-2xl"
        />
        <LivrosDestaque />

        <Section
          name="Anúncios"
          label="Veja todos"
          action={() => console.log("CLICOU NO ANÚNCIOS")}
          size="text-xl"
        />
        <AnunciostListaVertical />
      </ScrollView>

      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}