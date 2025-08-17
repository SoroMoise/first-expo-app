import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pokemon() {
  const params = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Current pokemon is {params.id} </Text>
    </SafeAreaView>
  );
}
