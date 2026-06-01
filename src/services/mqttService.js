import mqtt from "mqtt";

let client = null;

export const conectarMQTT = () => {
  client = mqtt.connect(
    "wss://0bfed911dcb94436a8405d68d43074ef.s1.eu.hivemq.cloud:8884/mqtt",
    {
      username: "aluno_etec",
      password: "Senha123",
      reconnectPeriod: 1000,
      connectTimeout: 30000,
    }
  );

  client.on("connect", () => {
    console.log("✅ Conectado ao HiveMQ");
  });

  client.on("error", (err) => {
    console.log("❌ MQTT:", err);
  });

  return client;
};

export const publicarMensagem = (mensagem) => {
  if (client && client.connected) {
    client.publish("casa/luz", mensagem);

    console.log(
      "📤 Publicado:",
      mensagem
    );
  }
};

export const desconectarMQTT = () => {
  if (client) {
    client.end();
  }
};