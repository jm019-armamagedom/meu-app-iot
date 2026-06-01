import { Buffer } from "buffer";

global.Buffer = Buffer;

import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}