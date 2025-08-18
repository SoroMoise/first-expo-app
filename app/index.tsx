import { FlatList, Image, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/themedText'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Card } from '@/components/Card'
import { PokemonCard } from '@/components/pokemon/PokemonCard'
import { useInfiniteFetchQuery } from '@/hooks/useFetchQuery'
import { getPokemonId } from '@/functions/pokemons'

export default function Index() {
  const theme = useThemeColors()

  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21')

  const pokemons = data?.pages.flatMap((page) => page.results) ?? []

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
          keyExtractor={(item) => item.url}
          columnWrapperStyle={[styles.gridGap]}
          contentContainerStyle={[styles.gridGap, styles.list]}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={isFetching ? <ActivityIndicator color={theme.tint} /> : null}
          renderItem={({ item }) => (
            <PokemonCard style={{ flex: 1 / 3 }} id={getPokemonId(item.url)} name={item.name} />
          )}
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
