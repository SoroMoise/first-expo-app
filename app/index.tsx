import { FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { ThemedText } from '@/components/themedText'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Card } from '@/components/Card'
import { PokemonCard } from '@/components/pokemon/PokemonCard'
import { useInfiniteFetchQuery } from '@/hooks/useFetchQuery'
import { getPokemonId } from '@/functions/pokemons'
import { SearchBar } from '@/components/SearchBar'
import { Row } from '@/components/Row'
import { useMemo, useState } from 'react'
import { SortButton } from '@/components/SortButton'
import { RootView } from '@/components/RootView'

export default function Index() {
  const theme = useThemeColors()

  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'id' | 'name'>('id')
  const pokemons =
    data?.pages.flatMap((page) =>
      page.results.map((pokemon) => ({ name: pokemon.name, id: getPokemonId(pokemon.url) }))
    ) ?? []
  const filteredPokemons = useMemo(searchPokemons, [pokemons, search, sortKey])

  function searchPokemons() {
    return [
      ...(search
        ? pokemons.filter(
            (pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase()) || pokemon.id.toString().includes(search)
          )
        : pokemons),
    ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1))
  }

  function sortPokemons(sortKey: 'id' | 'name') {
    setSortKey(sortKey)
  }

  return (
    <RootView>
      <Row style={styles.header} gap={16}>
        <Image source={require('@/assets/images/icons/pokeball.png')} width={24} height={24} />
        <ThemedText variant="headline1" color="grayLight">
          Pokédex
        </ThemedText>
      </Row>
      <Row style={[styles.search]} gap={10}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={sortPokemons} />
      </Row>

      <Card style={styles.boby}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={[styles.gridGap]}
          contentContainerStyle={[styles.gridGap, styles.list]}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={isFetching ? <ActivityIndicator color={theme.tint} /> : null}
          renderItem={({ item }) => <PokemonCard style={{ flex: 1 / 3 }} id={item.id} name={item.name} />}
        ></FlatList>
      </Card>
    </RootView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  search: {
    paddingBottom: 10,
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
