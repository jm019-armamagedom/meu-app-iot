import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "historico_lampada";

export const salvarHistorico = async (evento) => {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);

    const historico = dados
      ? JSON.parse(dados)
      : [];

    historico.unshift(evento);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(historico)
    );

    return historico;
  } catch (error) {
    console.log(error);
  }
};

export const carregarHistorico = async () => {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);

    return dados
      ? JSON.parse(dados)
      : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};