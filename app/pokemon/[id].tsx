import { Card } from '@/components/Card'
import { PokemonSpec } from '@/components/pokemon/PokemonSpec'
import { PokemonType } from '@/components/pokemon/PokemonType'
import { PokemonStat } from '@/components/pokemon/PpokemonStat'
import { RootView } from '@/components/RootView'
import { Row } from '@/components/Row'
import { ThemedText } from '@/components/themedText'
import { Colors, basePokemonStats } from '@/constants/Colors'
import { formatHeight, formatWeight, getPokemonArtwork } from '@/functions/pokemons'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Audio } from 'expo-av'
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
  const stats = pokemon?.stats ?? basePokemonStats

  const currentPokemonId = parseInt(params.id, 10)

  const bio = spacies?.flavor_text_entries
    .find(({ language }) => language.name === 'fr')
    ?.flavor_text.replaceAll('\n', '. ')

  const onImagePress = async () => {
    const cry = pokemon?.cries.latest

    if (!cry) return

    const { sound } = await Audio.Sound.createAsync({ uri: cry }, { shouldPlay: true })
    sound.playAsync()
  }

  const onPrevious = () => {
    router.replace({ pathname: '/pokemon/[id]', params: { id: Math.max(currentPokemonId - 1, 1) } })
  }

  const onNext = () => {
    router.replace({ pathname: '/pokemon/[id]', params: { id: currentPokemonId + 1 } })
  }

  const isFirst = currentPokemonId === 1
  const isLast = currentPokemonId === 10277

  return (
    <RootView backgroundColor={colorType}>
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
          <Row style={styles.artworkRow}>
            {isFirst ? (
              <View style={styles.chevron}></View>
            ) : (
              <Pressable onPress={onPrevious}>
                <Image source={require('@/assets/images/icons/chevron-left.png')} style={[styles.chevron]} />
              </Pressable>
            )}
            <Pressable onPress={onImagePress}>
              <Image source={{ uri: getPokemonArtwork(currentPokemonId) }} style={styles.artwork} />
            </Pressable>
            {isLast ? (
              <View style={styles.chevron}></View>
            ) : (
              <Pressable onPress={onNext}>
                <Image source={require('@/assets/images/icons/chevron-right.png')} style={[styles.chevron]} />
              </Pressable>
            )}
          </Row>
          <Card style={styles.card}>
            <Row gap={16} style={{ height: 18 }}>
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
            <ThemedText style={{ minHeight: 25 }}>{bio}</ThemedText>
            <ThemedText variant="subtitle1" style={[{ color: colorType, paddingTop: 15, paddingBottom: 10 }]}>
              Base stats
            </ThemedText>
            <View style={{ alignSelf: 'stretch' }}>
              {stats.map((stat) => (
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
  chevron: {
    width: 25,
    height: 25,
  },
  artworkRow: {
    position: 'absolute',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    marginHorizontal: 20,
    top: -144,
    zIndex: 2,
  },
  artwork: { width: 200, height: 200 },
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
