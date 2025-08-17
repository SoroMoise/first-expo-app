import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";

export default function Index() {
  const theme = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.tint }]}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/icons/Pokeball.png")}
          width={24}
          height={24}
        />
        <ThemedText variant="headline1" color="grayLight">
          Pokédex
        </ThemedText>
      </View>
      <Card style={styles.boby}></Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12,
  },
  boby: {
    flex: 1,
  },
});
