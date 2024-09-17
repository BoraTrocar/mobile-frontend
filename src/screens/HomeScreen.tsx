import React from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

import globalStyles from "../styles/globalStyles";
import { Banner } from "../components/banner";
import { BarraDePesquisa } from "../components/barraDePesquisa";
import { Header } from "../components/header";
import { AnunciostListaVertical } from "../components/listaAnuncios";
import { LivrosSugeridos } from "../components/livrosSugeridos";
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
        {/* mudar para sugestoes  */}
        <Section
          name="Livros sugeridos"
          label="Veja mais"
          action={() => console.log("CLICOU NO VEJA MAIS DO Sugeridos")}
          size="text-2xl"
        />
        <LivrosSugeridos />

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
