import { RootView } from '@/components/RootView'
import { Row } from '@/components/Row'
import { ThemedText } from '@/components/themedText'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'

export default function Pokemon() {
  const params = useLocalSearchParams() as { id: string }
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', { id: params.id })

  return (
    <RootView>
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
    </RootView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 32,
    height: 32,
  },
})
