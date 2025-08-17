import { FlatList, Image, StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/themedText'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Card } from '@/components/Card'
import { PokemonCard } from '@/components/pokemon/PokemonCard'

export default function Index() {
  const theme = useThemeColors()

  const pokemons = Array.from({ length: 35 }, (_, k) => ({
    name: 'pokemon name',
    id: k + 1,
  }))

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.tint }]}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/icons/Pokeball.png')} width={24} height={24} />
        <ThemedText variant="headline1" color="grayLight">
          Pokédex
        </ThemedText>
      </View>

      <Card style={styles.boby}>
        <FlatList
          data={pokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={[styles.gridGap]}
          renderItem={({ item }) => <PokemonCard style={{ flex: 1 / 3 }} id={item.id} name={item.name} />}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      </Card>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
  },
  boby: {
    flex: 1,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
})
