import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import MessageCard from "../components/MessageCard";

import {
  conectarMQTT,
  publicarMensagem,
  desconectarMQTT,
} from "../services/mqttService";

import {
  salvarHistorico,
  carregarHistorico,
} from "../storage/storageService";

export default function HomeScreen() {
  const [historico, setHistorico] =
    useState([]);

  useEffect(() => {
    conectarMQTT();

    carregarHistorico().then(
      setHistorico
    );

    return () => {
      desconectarMQTT();
    };
  }, []);

  const registrarAcao = async (
    acao
  ) => {
    publicarMensagem(acao);

    const evento = {
      id: Date.now().toString(),
      acao,
      data:
        new Date().toLocaleString(),
    };

    const lista =
      await salvarHistorico(
        evento
      );

    setHistorico(lista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Smart Home
      </Text>

      <Text style={styles.icon}>
        💡
      </Text>

      <TouchableOpacity
        style={styles.btnOn}
        onPress={() =>
          registrarAcao(
            "Lâmpada Ligada"
          )
        }
      >
        <Text style={styles.textBtn}>
          LIGAR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnOff}
        onPress={() =>
          registrarAcao(
            "Lâmpada Desligada"
          )
        }
      >
        <Text style={styles.textBtn}>
          DESLIGAR
        </Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>
        Histórico
      </Text>

      <FlatList
        data={historico}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <MessageCard item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  icon: {
    fontSize: 80,
    textAlign: "center",
    marginVertical: 20,
  },

  btnOn: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  btnOff: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  textBtn: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  subtitulo: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
});