import { Card } from '@/components/Card'
import { ThemedText } from '@/components/themedText'
import { getPokemonArtwork } from '@/functions/pokemons'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Link } from 'expo-router'
import { Image, Pressable, StyleSheet, View, type ViewStyle } from 'react-native'

type Props = {
  id: number
  name: string
  style?: ViewStyle
}

export function PokemonCard({ id, name, style }: Props) {
  const colors = useThemeColors()

  return (
    <Link href={{ pathname: '/pokemon/[id]', params: { id } }} asChild>
      <Pressable android_ripple={{ color: colors.tint, foreground: true }} style={style}>
        <Card style={[style, styles.card]}>
          <ThemedText variant="caption" color="grayMedium" style={styles.id}>
            #{id.toString().padStart(3, '0')}
          </ThemedText>
          <Image
            source={{
              uri: getPokemonArtwork(id),
            }}
            width={72}
            height={72}
            style={styles.image}
          />
          <ThemedText style={styles.name}>{name}</ThemedText>
          <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
        </Card>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    alignItems: 'center',
    padding: 4,
  },
  id: {
    alignSelf: 'flex-end',
  },
  image: {},
  name: {},
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
    zIndex: -1,
  },
})
