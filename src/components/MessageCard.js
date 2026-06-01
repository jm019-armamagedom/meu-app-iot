import { View, Text, StyleSheet } from "react-native";

export default function MessageCard({ item }) {
  const ligado = item.acao.includes("Ligada");

  return (
    <View style={styles.card}>
      <Text style={styles.acao}>
        {ligado ? "🟢" : "🔴"} {item.acao}
      </Text>

      <Text style={styles.data}>
        {item.data}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  acao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  data: {
    color: "#999",
    marginTop: 5,
  },
});