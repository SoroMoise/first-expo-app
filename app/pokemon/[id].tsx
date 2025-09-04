import { Card } from '@/components/Card'
import { PokemonSpec } from '@/components/pokemon/PokemonSpec'
import { PokemonType } from '@/components/pokemon/PokemonType'
import { PokemonStat } from '@/components/pokemon/PpokemonStat'
import { RootView } from '@/components/RootView'
import { Row } from '@/components/Row'
import { ThemedText } from '@/components/themedText'
import { Colors } from '@/constants/Colors'
import { formatHeight, formatWeight, getPokemonArtwork } from '@/functions/pokemons'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'

export default function Pokemon() {
  const colors = useThemeColors()
  const params = useLocalSearchParams() as { id: string }
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', { id: params.id })
  const { data: spacies } = useFetchQuery('/pokemon-species/[id]', { id: params.id })
  const mainType = pokemon?.types[0].type.name
  const colorType = mainType ? Colors.type[mainType] : colors.tint

  const types = pokemon?.types ?? []
  const bio = spacies?.flavor_text_entries
    .find(({ language }) => language.name === 'fr')
    ?.flavor_text.replaceAll('\n', '. ')

  return (
    <RootView style={{ backgroundColor: colorType }}>
      <View>
        <Image source={require('@/assets/images/icons/pokeball-big.png')} style={styles.pokeballBig} />
        <Row style={styles.header}>
          <Row gap={8}>
            <Pressable onPress={() => router.back()}>
              <Image source={require('@/assets/images/icons/back.png')} style={styles.backIcon} />
            </Pressable>
            <ThemedText color="grayWhite" variant="headline1">
              {pokemon?.name}
            </ThemedText>
          </Row>
          <ThemedText color="grayWhite" variant="subtitle2">
            #{params.id.padStart(3, '0')}
          </ThemedText>
        </Row>
        <View style={styles.body}>
          <Image source={{ uri: getPokemonArtwork(params.id) }} style={styles.artwork} />
          <Card style={styles.card}>
            <Row gap={16}>
              {types.map((type) => (
                <PokemonType name={type.type.name} key={type.type.name} />
              ))}
            </Row>
            <ThemedText variant="subtitle1" style={[{ color: colorType, paddingTop: 15, paddingBottom: 10 }]}>
              About
            </ThemedText>
            <Row>
              <PokemonSpec
                style={{ borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight }}
                title={formatWeight(pokemon?.weight)}
                description="Weight"
                image={require('@/assets/images/icons/weight.png')}
              />
              <PokemonSpec
                style={{ borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight }}
                title={formatHeight(pokemon?.height)}
                description="Height"
                image={require('@/assets/images/icons/height.png')}
              />
              <PokemonSpec
                title={pokemon?.moves
                  .slice(0, 2)
                  .map((move) => move.move.name)
                  .join('\n')}
                description="Moves"
              />
            </Row>
            <ThemedText>{bio}</ThemedText>
            <ThemedText variant="subtitle1" style={[{ color: colorType, paddingTop: 15, paddingBottom: 10 }]}>
              Base stats
            </ThemedText>
            <View style={{ alignSelf: 'stretch' }}>
              {pokemon?.stats.map((stat) => (
                <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType} />
              ))}
            </View>
          </Card>
        </View>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  pokeballBig: {
    width: 208,
    height: 208,
    position: 'absolute',
    top: 8,
    right: 8,
    opacity: 0.1,
  },
  header: {
    margin: 20,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  artwork: {
    position: 'absolute',
    alignSelf: 'center',
    top: -144,
    width: 200,
    height: 200,
    zIndex: 2,
  },
  body: {
    marginTop: 144,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
})
