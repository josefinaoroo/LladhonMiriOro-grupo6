import { View, Text, Pressable } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Hola Mundo</Text>
      <Pressable onPress={() => console.log("me clickearon")}>
        <Text>clickeame</Text>
      </Pressable>
    </View>
  );
}
